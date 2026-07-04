import { ListResume } from "portfolio-website-shared";
import {
	getCardLabel,
	getCardMeta,
	getClusterColor,
} from "../../galaxy/data/cluster-layout";

// A single resume card, rendered as a star in the mid-field parallax plane.
// Positions live in normalized sky space (x, y each in [-1, 1]); the renderer
// maps them to screen pixels. Keeping the layout in normalized space makes it
// resolution-independent and deterministic (no Math.random), so it is unit
// testable and identical across reloads.
export interface StarPoint {
	sectionArrayIndex: number;
	subsectionArrayIndex: number;
	cardIndex: number;
	// Flat position of the owning section within the resume array — drives the
	// constellation grouping and accent color.
	sectionIndexInList: number;
	// Order of this card among all cards in its section (0 = most significant).
	indexInSection: number;
	label: string;
	meta: string;
	color: string;
	baseX: number;
	baseY: number;
	// Parallax depth factor: how strongly this star shifts with pointer/tilt.
	// Brighter (more significant) stars sit slightly closer, so they move a hair
	// more than the faint ones behind them.
	depth: number;
	// Visible star radius in px before twinkle/hover scaling.
	size: number;
	// 0..1 — feeds opacity and glow. Significance = brightness.
	brightness: number;
	twinklePhase: number;
}

// A section's stars, wired into a named constellation. `starIndices` are offsets
// into the flat StarPoint[] returned by buildStarField, ordered so the drawn
// lines form a single non-branching path with minimal crossing.
export interface Constellation {
	sectionArrayIndex: number;
	sectionIndexInList: number;
	color: string;
	title: string;
	starIndices: number[];
}

export interface StarField {
	stars: StarPoint[];
	constellations: Constellation[];
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
// Sections are seated on a ring at this normalized radius from center, leaving
// the very middle free for the identity signature and the deep-field haze.
const SECTION_RING_RADIUS = 0.62;
const CARD_SPREAD_BASE = 0.09;
const CARD_SPREAD_PER_ITEM = 0.035;
const MID_DEPTH = 0.12;

// Deterministic hash → [0, 1). Small integer avalanche; enough jitter to keep
// constellations from looking mechanical without pulling in Math.random (which
// would break determinism and the tests).
function hash01(seed: number): number {
	let h = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
	h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
	h ^= h >>> 16;
	return (h >>> 0) / 4294967296;
}

interface CardEntry {
	subsectionArrayIndex: number;
	cardIndex: number;
	label: string;
	meta: string;
}

function collectCards(section: ListResume[number]): CardEntry[] {
	const entries: CardEntry[] = [];
	section[2].forEach((subsection, ssi) => {
		const template = subsection[3] as Array<[number, string, ...unknown[]]>;
		subsection[4].forEach((cardBundle, ci) => {
			entries.push({
				subsectionArrayIndex: ssi,
				cardIndex: ci,
				label: getCardLabel(cardBundle as unknown[], template),
				meta: getCardMeta(cardBundle as unknown[], template),
			});
		});
	});
	return entries;
}

// Orders points into a single path by greedy nearest-neighbour starting from the
// brightest (index 0). A constellation drawn along this order has far fewer line
// crossings than connecting cards in raw array order.
function nearestNeighbourOrder(
	points: Array<{ x: number; y: number }>,
): number[] {
	if (points.length <= 2) return points.map((_, i) => i);
	const remaining = new Set(points.map((_, i) => i));
	const order: number[] = [0];
	remaining.delete(0);
	let current = 0;
	while (remaining.size > 0) {
		let best = -1;
		let bestDist = Infinity;
		remaining.forEach((i) => {
			const dx = points[i].x - points[current].x;
			const dy = points[i].y - points[current].y;
			const d = dx * dx + dy * dy;
			if (d < bestDist) {
				bestDist = d;
				best = i;
			}
		});
		order.push(best);
		remaining.delete(best);
		current = best;
	}
	return order;
}

// Builds the full star field from resume data: one star per card, grouped into
// one constellation per section. Pure and deterministic — same input, same
// output, no side effects.
export function buildStarField(resumeData: ListResume): StarField {
	const stars: StarPoint[] = [];
	const constellations: Constellation[] = [];

	const sectionCount = resumeData.length;

	resumeData.forEach((section, si) => {
		const color = getClusterColor(si);
		const title = (section[1] as string[])[0] ?? "";
		const cards = collectCards(section);
		if (cards.length === 0) return;

		// Seat this section's center on the ring. Golden-angle spacing keeps
		// sections from clumping even as their count changes.
		const ringAngle = si * GOLDEN_ANGLE + hash01(si) * 0.4;
		// Alternate radius slightly so an even section count doesn't land two
		// centers on opposite sides at the exact same distance.
		const ringRadius =
			SECTION_RING_RADIUS * (0.82 + 0.18 * hash01(si * 7 + 1));
		const centerX = Math.cos(ringAngle) * ringRadius;
		const centerY = Math.sin(ringAngle) * ringRadius * 0.72; // sky is wider than tall

		const spread =
			CARD_SPREAD_BASE + CARD_SPREAD_PER_ITEM * Math.sqrt(cards.length);

		const localPoints: Array<{ x: number; y: number }> = [];
		const firstStarIndex = stars.length;

		cards.forEach((card, j) => {
			// Spiral the cards out from the section center with hashed jitter.
			const a = j * GOLDEN_ANGLE + hash01(si * 101 + j) * Math.PI * 2;
			const r =
				spread * (0.35 + Math.sqrt(j) * (0.55 + hash01(j) * 0.25));
			const x = centerX + Math.cos(a) * r;
			const y = centerY + Math.sin(a) * r;
			localPoints.push({ x, y });

			// Significance falls off with index; first card is the anchor star.
			const brightness = Math.max(
				0.45,
				1 - (0.5 * j) / Math.max(1, cards.length - 1),
			);

			stars.push({
				sectionArrayIndex: si,
				subsectionArrayIndex: card.subsectionArrayIndex,
				cardIndex: card.cardIndex,
				sectionIndexInList: si,
				indexInSection: j,
				label: card.label,
				meta: card.meta,
				color,
				baseX: x,
				baseY: y,
				depth: MID_DEPTH * (0.85 + brightness * 0.4),
				size: 2.1 + brightness * 2.6,
				brightness,
				twinklePhase: hash01(si * 997 + j * 13) * Math.PI * 2,
			});
		});

		const order = nearestNeighbourOrder(localPoints);
		constellations.push({
			sectionArrayIndex: si,
			sectionIndexInList: si,
			color,
			title,
			starIndices: order.map((local) => firstStarIndex + local),
		});
	});

	// Guard against a degenerate single-section field collapsing onto the ring.
	if (sectionCount === 1 && stars.length > 0) {
		stars.forEach((s) => {
			s.baseX *= 1.1;
			s.baseY *= 1.1;
		});
	}

	return { stars, constellations };
}
