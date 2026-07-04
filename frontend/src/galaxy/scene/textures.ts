import { CanvasTexture } from "three";

// Shared soft-glow sprite textures. A single high-resolution radial gradient
// reused everywhere (nebula points, cluster cores, card stars) keeps GPU
// memory low while giving every glow a smooth falloff that survives being
// blown up close to the camera — the old 64px dot pixelated on zoom-in.

let sharedGlowTexture: CanvasTexture | null = null;
let sharedStarTexture: CanvasTexture | null = null;

// Wide, soft halo — used for nebula particles and cluster core glows.
export function getGlowTexture(): CanvasTexture {
	if (sharedGlowTexture) return sharedGlowTexture;
	const size = 256;
	const canvas = document.createElement("canvas");
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
	const g = ctx.createRadialGradient(
		size / 2,
		size / 2,
		0,
		size / 2,
		size / 2,
		size / 2,
	);
	g.addColorStop(0, "rgba(255,255,255,1)");
	g.addColorStop(0.18, "rgba(255,255,255,0.75)");
	g.addColorStop(0.45, "rgba(255,255,255,0.28)");
	g.addColorStop(0.75, "rgba(255,255,255,0.06)");
	g.addColorStop(1, "rgba(255,255,255,0)");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, size, size);
	sharedGlowTexture = new CanvasTexture(canvas);
	return sharedGlowTexture;
}

// Tighter core + halo — reads as a point of light with a burst. Used for the
// individual card "stars" so they stay crisp and bloom into bright points.
export function getStarTexture(): CanvasTexture {
	if (sharedStarTexture) return sharedStarTexture;
	const size = 256;
	const canvas = document.createElement("canvas");
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

	// Soft outer halo
	const halo = ctx.createRadialGradient(
		size / 2,
		size / 2,
		0,
		size / 2,
		size / 2,
		size / 2,
	);
	halo.addColorStop(0, "rgba(255,255,255,0.9)");
	halo.addColorStop(0.25, "rgba(255,255,255,0.35)");
	halo.addColorStop(0.6, "rgba(255,255,255,0.08)");
	halo.addColorStop(1, "rgba(255,255,255,0)");
	ctx.fillStyle = halo;
	ctx.fillRect(0, 0, size, size);

	// Hot white core
	const core = ctx.createRadialGradient(
		size / 2,
		size / 2,
		0,
		size / 2,
		size / 2,
		size * 0.16,
	);
	core.addColorStop(0, "rgba(255,255,255,1)");
	core.addColorStop(1, "rgba(255,255,255,0)");
	ctx.fillStyle = core;
	ctx.fillRect(0, 0, size, size);

	sharedStarTexture = new CanvasTexture(canvas);
	return sharedStarTexture;
}
