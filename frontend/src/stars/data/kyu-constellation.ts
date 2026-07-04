// 奎 (Kyu) — the "Bow-and-Stride" lunar mansion, straddling modern Andromeda
// and Pisces. Its classical figure is an elongated, canted loop of stars. These
// are a stylized tracing of that pattern in normalized signature space
// ([-1, 1], y-down), sized to sit in the empty center of the sky as the
// one-time identity signature that draws on first load, then dissolves.
//
// The name 李旻奎 reads "sky of the 奎 constellation" — drawing this shape from
// the brightest stars on entry is the theme's thesis rendered literally.
export interface SignatureStar {
	x: number;
	y: number;
}

export const KYU_STARS: SignatureStar[] = [
	{ x: -0.42, y: -0.28 },
	{ x: -0.18, y: -0.44 },
	{ x: 0.08, y: -0.38 },
	{ x: 0.3, y: -0.16 },
	{ x: 0.4, y: 0.12 },
	{ x: 0.22, y: 0.34 },
	{ x: -0.06, y: 0.42 },
	{ x: -0.3, y: 0.3 },
	{ x: -0.44, y: 0.04 },
	// Inner stride stars — the two that make it read as 奎 rather than a plain ring.
	{ x: -0.06, y: -0.04 },
	{ x: 0.12, y: 0.1 },
];

// Draw order for the connecting strokes: the outer loop closed, then the inner
// stride line across it.
export const KYU_EDGES: Array<[number, number]> = [
	[0, 1],
	[1, 2],
	[2, 3],
	[3, 4],
	[4, 5],
	[5, 6],
	[6, 7],
	[7, 8],
	[8, 0],
	[9, 10],
	[0, 9],
	[10, 4],
];
