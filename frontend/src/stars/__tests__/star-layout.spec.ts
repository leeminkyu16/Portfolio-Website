import { ListResume } from "portfolio-website-shared";
import { buildStarField } from "../data/star-layout";

// Minimal ListResume fixture: [sectionIndex, [title, lang], subsections[]].
// Each subsection is [ssi, [title, lang], someField, template, cardBundles[]].
function section(
	title: string,
	cardsPerSubsection: number[],
): ListResume[number] {
	const template = [[0, "Heading1"]] as unknown;
	const subsections = cardsPerSubsection.map((count, ssi) => {
		const cards = Array.from({ length: count }, (_, ci) => [
			[`${title} card ${ssi}-${ci}`, ""],
		]);
		return [ssi, ["", ""], [], template, cards];
	});
	return [0, [title, ""], subsections] as unknown as ListResume[number];
}

const RESUME: ListResume = [
	section("Experience", [2, 3]),
	section("Projects", [4]),
	section("Skills", [1]),
] as unknown as ListResume;

describe("buildStarField", () => {
	it("creates exactly one star per resume card", () => {
		const { stars } = buildStarField(RESUME);
		expect(stars.length).toBe(2 + 3 + 4 + 1);
	});

	it("creates one constellation per non-empty section", () => {
		const { constellations } = buildStarField(RESUME);
		expect(constellations.length).toBe(3);
		expect(constellations.map((c) => c.title)).toEqual([
			"Experience",
			"Projects",
			"Skills",
		]);
	});

	it("is deterministic across calls", () => {
		expect(buildStarField(RESUME)).toEqual(buildStarField(RESUME));
	});

	it("keeps every star inside normalized sky space (|x|,|y| <= 1)", () => {
		buildStarField(RESUME).stars.forEach((s) => {
			expect(Math.abs(s.baseX)).toBeLessThanOrEqual(1);
			expect(Math.abs(s.baseY)).toBeLessThanOrEqual(1);
		});
	});

	it("references valid, complete star indices from each constellation", () => {
		const { stars, constellations } = buildStarField(RESUME);
		constellations.forEach((c) => {
			const sectionStars = stars.filter(
				(s) => s.sectionArrayIndex === c.sectionArrayIndex,
			);
			// Path visits each star in the section exactly once.
			expect([...c.starIndices].sort()).toEqual(
				[...c.starIndices].sort(),
			);
			expect(new Set(c.starIndices).size).toBe(sectionStars.length);
			c.starIndices.forEach((i) => {
				expect(stars[i]).toBeDefined();
				expect(stars[i].sectionArrayIndex).toBe(c.sectionArrayIndex);
			});
		});
	});

	it("makes the first card of a section the brightest anchor", () => {
		const { stars } = buildStarField(RESUME);
		const first = stars.find(
			(s) => s.sectionArrayIndex === 0 && s.indexInSection === 0,
		);
		const later = stars.find(
			(s) => s.sectionArrayIndex === 0 && s.indexInSection === 4,
		);
		expect(first!.brightness).toBeGreaterThan(later!.brightness);
	});

	it("colors all stars in a section with its accent color", () => {
		const { stars, constellations } = buildStarField(RESUME);
		constellations.forEach((c) => {
			stars
				.filter((s) => s.sectionArrayIndex === c.sectionArrayIndex)
				.forEach((s) => expect(s.color).toBe(c.color));
		});
	});

	it("skips empty sections without emitting a constellation", () => {
		const withEmpty: ListResume = [
			section("Experience", [1]),
			section("Empty", [0]),
		] as unknown as ListResume;
		const { stars, constellations } = buildStarField(withEmpty);
		expect(stars.length).toBe(1);
		expect(constellations.length).toBe(1);
		expect(constellations[0].title).toBe("Experience");
	});
});
