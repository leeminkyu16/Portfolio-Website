import {
	getCardDescription,
	getCardLabel,
	getCardMeta,
	getClusterColor,
	getClusterPositions,
} from "../data/cluster-layout";

describe("getClusterColor", () => {
	it("returns violet for index 0", () => {
		expect(getClusterColor(0)).toBe("#6366f1");
	});
	it("returns emerald for index 1", () => {
		expect(getClusterColor(1)).toBe("#10b981");
	});
	it("returns amber for index 2", () => {
		expect(getClusterColor(2)).toBe("#f59e0b");
	});
	it("returns rose for index 3", () => {
		expect(getClusterColor(3)).toBe("#f43f5e");
	});
	it("wraps around for index 4", () => {
		expect(getClusterColor(4)).toBe("#6366f1");
	});
});

describe("getClusterPositions", () => {
	it("returns the requested number of positions", () => {
		expect(getClusterPositions(4, 1200)).toHaveLength(4);
	});
	it("each position lies on a sphere of the given radius (±5%)", () => {
		getClusterPositions(4, 1200).forEach((p) => {
			const dist = Math.sqrt(p.x ** 2 + p.y ** 2 + p.z ** 2);
			expect(dist).toBeGreaterThan(1200 * 0.95);
			expect(dist).toBeLessThan(1200 * 1.05);
		});
	});
	it("all positions are distinct (>500 units apart)", () => {
		const positions = getClusterPositions(4, 1200);
		for (let i = 0; i < positions.length; i++) {
			for (let j = i + 1; j < positions.length; j++) {
				const dx = positions[i].x - positions[j].x;
				const dy = positions[i].y - positions[j].y;
				const dz = positions[i].z - positions[j].z;
				expect(Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2)).toBeGreaterThan(
					500,
				);
			}
		}
	});
});

describe("getCardLabel", () => {
	it("extracts Heading1 text at language index 0", () => {
		const template = [[0, "Heading1"]] as any;
		const data = [["iOS Developer", ""]] as any;
		expect(getCardLabel(data, template)).toBe("iOS Developer");
	});
	it("extracts Heading1WithLink text at language index 0", () => {
		const template = [[0, "Heading1WithLink"]] as any;
		const data = [[["My Project", ""], "https://example.com"]] as any;
		expect(getCardLabel(data, template)).toBe("My Project");
	});
	it("skips non-heading items to find Heading1", () => {
		const template = [
			[0, "Text"],
			[1, "Heading1"],
		] as any;
		const data = [
			["desc", ""],
			["Engineer", ""],
		] as any;
		expect(getCardLabel(data, template)).toBe("Engineer");
	});
	it('falls back to "Card" when no Heading1 exists', () => {
		const template = [[0, "Text"]] as any;
		const data = [["desc", ""]] as any;
		expect(getCardLabel(data, template)).toBe("Card");
	});
});

describe("getCardMeta", () => {
	it("combines Heading2 and StartEndDate with a middot", () => {
		const template = [
			[0, "Heading1"],
			[1, "Heading2"],
			[2, "StartEndDate"],
		] as any;
		const data = [
			["iOS Developer", ""],
			["Faire Wholesale", ""],
			[
				["September 2023", ""],
				["December 2023", ""],
			],
		] as any;
		expect(getCardMeta(data, template)).toBe(
			"Faire Wholesale · September 2023 – December 2023",
		);
	});

	it("renders TextTitlePair as 'Title value'", () => {
		const template = [
			[0, "Heading1"],
			[1, "TextTitlePair", ["Organization:", ""]],
		] as any;
		const data = [
			["Dean's List", ""],
			["University of Toronto", ""],
		] as any;
		expect(getCardMeta(data, template)).toBe(
			"Organization: University of Toronto",
		);
	});

	it("returns an empty string when no meta fields exist", () => {
		const template = [
			[0, "Heading1"],
			[1, "List", ["Tools:", ""]],
		] as any;
		const data = [["Python", ""], []] as any;
		expect(getCardMeta(data, template)).toBe("");
	});
});

describe("getCardDescription", () => {
	it("prefers a non-empty Text field", () => {
		const template = [
			[0, "Heading1"],
			[1, "Text"],
		] as any;
		const data = [
			["Title", ""],
			["A short summary.", ""],
		] as any;
		expect(getCardDescription(data, template)).toBe("A short summary.");
	});

	it("falls through an empty Text field to HTMLList", () => {
		const template = [
			[0, "Heading1"],
			[1, "Text"],
			[2, "HTMLList"],
		] as any;
		const data = [
			["Title", ""],
			["", ""],
			[[0, ["Implemented <b>5 features</b>.", ""]]],
		] as any;
		expect(getCardDescription(data, template)).toBe(
			"Implemented 5 features.",
		);
	});

	it("strips HTML tags from HTMLText", () => {
		const template = [[0, "HTMLText"]] as any;
		const data = [["Won <b>first place</b>.", ""]] as any;
		expect(getCardDescription(data, template)).toBe("Won first place.");
	});

	it("truncates long text with an ellipsis", () => {
		const template = [[0, "Text"]] as any;
		const longText = "a".repeat(150);
		const data = [[longText, ""]] as any;
		const result = getCardDescription(data, template, 100);
		expect(result.length).toBe(101);
		expect(result.endsWith("…")).toBe(true);
	});

	it("returns an empty string when no description field exists", () => {
		const template = [[0, "Heading1"]] as any;
		const data = [["Title", ""]] as any;
		expect(getCardDescription(data, template)).toBe("");
	});
});
