import { KYU_EDGES, KYU_STARS } from "../data/kyu-constellation";
import { StarField } from "../data/star-layout";
import { ParallaxController } from "./ParallaxController";

interface StarSkyOptions {
	compact: boolean;
	reducedMotion: boolean;
	parallax: ParallaxController;
}

interface BgStar {
	x: number; // normalized [-1,1]
	y: number;
	r: number;
	a: number;
	depth: number;
}

interface Bokeh {
	x: number;
	y: number;
	r: number;
	hue: string;
}

interface Shooting {
	active: boolean;
	x: number;
	y: number;
	vx: number;
	vy: number;
	life: number;
}

// One Manhattan-silhouette building (normalized x in [0,1], height as a
// fraction of the horizon band). `lit` window rows give the skyline life.
interface Building {
	x: number;
	w: number;
	h: number;
	lit: number[];
}

const PARALLAX_PX = 60; // max screen shift at depth 1
const DRIFT_SPEED = 0.0000135; // radians/ms — sidereal-slow whole-sky rotation
const INTRO_MS = 3600;
const CONSTELLATION_DRAW_MS = 2200;

// Diaspora layer — "one sky, three homes" (Seoul → Canada → New York). The same
// northern night sky follows the whole path; these anchors render that story.
const AURORA_TOP = 0.5; // aurora band top, as a fraction of viewport height
const AURORA_BOTTOM = 0.78;
const SKYLINE_TOP = 0.86; // where the NYC horizon silhouette begins

function hash01(seed: number): number {
	let h = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
	h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
	h ^= h >>> 16;
	return (h >>> 0) / 4294967296;
}

function hexToRgb(hex: string): [number, number, number] {
	const m = hex.replace("#", "");
	const n = parseInt(
		m.length === 3
			? m
					.split("")
					.map((c) => c + c)
					.join("")
			: m,
		16,
	);
	return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// Renders the layered parallax night sky to a single 2D canvas: a pre-baked
// deep-sky backdrop (Milky Way, nebula haze, micro-stars) blitted with slight
// parallax, then live constellation lines, resume-card stars, foreground bokeh,
// an occasional shooting star, and the one-time 奎 signature on entry.
export class StarSky {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private field: StarField;
	private opts: StarSkyOptions;

	private deep: HTMLCanvasElement | null = null;
	private bgStars: BgStar[] = [];
	private bokeh: Bokeh[] = [];
	private skyline: Building[] = [];
	private shooting: Shooting = {
		active: false,
		x: 0,
		y: 0,
		vx: 0,
		vy: 0,
		life: 0,
	};
	private nextShootingAt = 6000;

	private rafId: number | null = null;
	private lastTime = 0;
	private elapsed = 0;
	private dpr = 1;
	private w = 0;
	private h = 0;

	// Live screen positions of card stars, index-aligned with field.stars.
	private screenX: Float32Array;
	private screenY: Float32Array;

	private hoveredIndex: number | null = null;
	private selectedIndex: number | null = null;

	// Eased view transform.
	private zoom = 1;
	private zoomTarget = 1;
	private focusX = 0;
	private focusTargetX = 0;
	private focusY = 0;
	private focusTargetY = 0;
	private dim = 0;
	private dimTarget = 0;

	constructor(
		canvas: HTMLCanvasElement,
		field: StarField,
		opts: StarSkyOptions,
	) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
		this.field = field;
		this.opts = opts;
		this.screenX = new Float32Array(field.stars.length);
		this.screenY = new Float32Array(field.stars.length);
	}

	build(): void {
		this.resize();
		this.generateBackground();
	}

	private generateBackground(): void {
		const count = this.opts.compact ? 420 : 950;
		this.bgStars = Array.from({ length: count }, (_, i) => ({
			x: hash01(i * 3 + 1) * 2 - 1,
			y: hash01(i * 3 + 2) * 2 - 1,
			r: 0.3 + hash01(i * 3 + 3) * 1.1,
			a: 0.25 + hash01(i * 7 + 5) * 0.6,
			depth: 0.03 + hash01(i * 11 + 9) * 0.05,
		}));

		const bokehCount = this.opts.compact ? 6 : 11;
		const hues = ["#6366f1", "#8b5cf6", "#3b82f6", "#f59e0b"];
		this.bokeh = Array.from({ length: bokehCount }, (_, i) => ({
			x: hash01(i * 5 + 21) * 2 - 1,
			y: hash01(i * 5 + 22) * 2 - 1,
			r: 40 + hash01(i * 5 + 23) * 90,
			hue: hues[Math.floor(hash01(i * 5 + 24) * hues.length)],
		}));

		this.generateSkyline();
		this.bakeDeepSky();
	}

	// A procedural Manhattan silhouette: buildings tallest near the center
	// (midtown) and tapering to the edges, each with a few lit window rows.
	private generateSkyline(): void {
		const buildings: Building[] = [];
		let x = 0;
		let i = 0;
		while (x < 1) {
			const w = 0.018 + hash01(i * 13 + 101) * 0.04;
			// Taller toward center; a squared falloff reads as a skyline profile.
			const center = 1 - Math.abs(x + w / 2 - 0.5) * 2;
			const h =
				(0.28 + hash01(i * 17 + 7) * 0.5) *
				(0.45 + center * center * 0.9);
			const windowCount = Math.floor(hash01(i * 19 + 3) * 4);
			const lit = Array.from({ length: windowCount }, (_, k) =>
				hash01(i * 23 + k * 5 + 2),
			);
			buildings.push({ x, w, h: Math.min(1, h), lit });
			x += w + hash01(i * 29 + 11) * 0.01;
			i++;
		}
		this.skyline = buildings;
	}

	// Pre-render the near-static deep sky once so the per-frame cost is a single
	// drawImage rather than hundreds of gradients and dots.
	private bakeDeepSky(): void {
		const deep = document.createElement("canvas");
		deep.width = Math.ceil(this.w * this.dpr);
		deep.height = Math.ceil(this.h * this.dpr);
		const dctx = deep.getContext("2d") as CanvasRenderingContext2D;
		dctx.scale(this.dpr, this.dpr);
		const w = this.w;
		const h = this.h;

		// Nebula haze — a few big indigo/violet radial blooms.
		const blooms: Array<[number, number, number, string]> = [
			[w * 0.2, h * 0.3, Math.max(w, h) * 0.5, "rgba(76,60,160,0.16)"],
			[w * 0.8, h * 0.65, Math.max(w, h) * 0.45, "rgba(50,60,150,0.14)"],
			[w * 0.55, h * 0.15, Math.max(w, h) * 0.4, "rgba(120,70,150,0.1)"],
		];
		blooms.forEach(([x, y, r, color]) => {
			const g = dctx.createRadialGradient(x, y, 0, x, y, r);
			g.addColorStop(0, color);
			g.addColorStop(1, "rgba(0,0,0,0)");
			dctx.fillStyle = g;
			dctx.fillRect(0, 0, w, h);
		});

		// Milky Way band — a soft diagonal stripe of brightened haze + dust.
		dctx.save();
		dctx.translate(w / 2, h / 2);
		dctx.rotate(-0.5);
		const band = dctx.createLinearGradient(0, -h * 0.28, 0, h * 0.28);
		band.addColorStop(0, "rgba(0,0,0,0)");
		band.addColorStop(0.5, "rgba(150,160,220,0.09)");
		band.addColorStop(1, "rgba(0,0,0,0)");
		dctx.fillStyle = band;
		dctx.fillRect(-w, -h * 0.28, w * 2, h * 0.56);
		// Dust motes concentrated in the band.
		for (let i = 0; i < (this.opts.compact ? 300 : 700); i++) {
			const bx = (hash01(i * 2 + 31) * 2 - 1) * w;
			const by = (hash01(i * 2 + 32) * 2 - 1) * h * 0.26;
			const r = hash01(i + 51) * 0.9;
			dctx.fillStyle = `rgba(220,225,255,${0.15 + hash01(i + 60) * 0.4})`;
			dctx.beginPath();
			dctx.arc(bx, by, r, 0, Math.PI * 2);
			dctx.fill();
		}
		dctx.restore();

		this.deep = deep;
	}

	resize(): void {
		this.dpr = Math.min(window.devicePixelRatio || 1, 2);
		this.w = window.innerWidth;
		this.h = window.innerHeight;
		this.canvas.width = Math.ceil(this.w * this.dpr);
		this.canvas.height = Math.ceil(this.h * this.dpr);
		this.canvas.style.width = `${this.w}px`;
		this.canvas.style.height = `${this.h}px`;
		this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
		if (this.deep) this.bakeDeepSky();
	}

	start(): void {
		const loop = (time: number): void => {
			this.rafId = requestAnimationFrame(loop);
			const delta = this.lastTime ? time - this.lastTime : 16;
			this.lastTime = time;
			this.elapsed += delta;
			this.update(delta);
			this.draw();
		};
		this.rafId = requestAnimationFrame(loop);
	}

	stop(): void {
		if (this.rafId !== null) cancelAnimationFrame(this.rafId);
		this.rafId = null;
	}

	private update(delta: number): void {
		this.opts.parallax.update(delta);
		const ease = 1 - Math.pow(0.86, delta / 16);
		this.zoom += (this.zoomTarget - this.zoom) * ease;
		this.focusX += (this.focusTargetX - this.focusX) * ease;
		this.focusY += (this.focusTargetY - this.focusY) * ease;
		this.dim += (this.dimTarget - this.dim) * ease;

		// Shooting star scheduling — idle-only garnish, skipped for reduced motion.
		if (!this.opts.reducedMotion) {
			if (!this.shooting.active && this.elapsed > this.nextShootingAt) {
				this.spawnShooting();
			}
			if (this.shooting.active) {
				this.shooting.x += this.shooting.vx * delta;
				this.shooting.y += this.shooting.vy * delta;
				this.shooting.life -= delta;
				if (this.shooting.life <= 0) {
					this.shooting.active = false;
					this.nextShootingAt =
						this.elapsed + 7000 + hash01(this.elapsed | 0) * 12000;
				}
			}
		}
	}

	private spawnShooting(): void {
		const fromLeft = hash01(this.elapsed | 0) > 0.5;
		this.shooting = {
			active: true,
			x: fromLeft ? -0.1 * this.w : 1.1 * this.w,
			y: this.h * (0.1 + hash01((this.elapsed | 0) + 3) * 0.4),
			vx: (fromLeft ? 1 : -1) * (0.6 + Math.random() * 0.3),
			vy: 0.18 + Math.random() * 0.12,
			life: 900,
		};
	}

	// Rotation applied to the whole field for idle sidereal drift.
	private driftAngle(): number {
		return this.opts.reducedMotion ? 0 : this.elapsed * DRIFT_SPEED;
	}

	private worldToScreen(
		nx: number,
		ny: number,
		depth: number,
		drift: number,
	): [number, number] {
		// Rotate around center for sidereal drift.
		const cos = Math.cos(drift);
		const sin = Math.sin(drift);
		const rx = nx * cos - ny * sin;
		const ry = nx * sin + ny * cos;

		const spanX = this.w * 0.44 * this.zoom;
		const spanY = this.h * 0.44 * this.zoom;
		const px = this.opts.parallax.x * PARALLAX_PX * depth * 6;
		const py = this.opts.parallax.y * PARALLAX_PX * depth * 6;
		// When zoomed onto a star, bias the center left so the sliding panel
		// (which covers the right on desktop) doesn't hide the focused star.
		const panelBias = this.compactPanel()
			? 0
			: (this.zoom - 1) * this.w * 0.14;
		const cx = this.w / 2 - panelBias;
		const cy = this.h / 2;
		const sx = cx + (rx - this.focusX) * spanX + px;
		const sy = cy + (ry - this.focusY) * spanY + py;
		return [sx, sy];
	}

	private compactPanel(): boolean {
		return window.matchMedia("(max-width: 767px)").matches;
	}

	private draw(): void {
		const ctx = this.ctx;
		ctx.clearRect(0, 0, this.w, this.h);
		const drift = this.driftAngle();

		// Deep sky, blitted with a touch of parallax.
		if (this.deep) {
			const dx = this.opts.parallax.x * PARALLAX_PX * 0.12;
			const dy = this.opts.parallax.y * PARALLAX_PX * 0.12;
			ctx.globalAlpha = 1;
			ctx.drawImage(this.deep, dx, dy, this.w, this.h);
		}

		// Micro-stars (parallax layer just above the deep sky).
		const twinkle = this.opts.reducedMotion ? 0 : this.elapsed * 0.002;
		for (const s of this.bgStars) {
			const px = this.opts.parallax.x * PARALLAX_PX * s.depth * 6;
			const py = this.opts.parallax.y * PARALLAX_PX * s.depth * 6;
			const sx = this.w / 2 + s.x * this.w * 0.55 + px;
			const sy = this.h / 2 + s.y * this.h * 0.55 + py;
			const tw = 0.7 + 0.3 * Math.sin(twinkle + s.x * 40);
			ctx.globalAlpha = s.a * tw * (1 - this.dim * 0.5);
			ctx.fillStyle = "#eef2ff";
			ctx.beginPath();
			ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
			ctx.fill();
		}

		// Diaspora: Seoul pole star + Canadian aurora sit behind the card stars.
		this.drawPoleStar();
		this.drawAurora();

		this.drawConstellations(drift);
		this.drawCardStars(drift, twinkle);

		// Diaspora: the migration arc, then the NYC horizon the stars rise over.
		this.drawMigrationArc();
		this.drawHorizon();

		this.drawForeground();
		this.drawShooting();
		if (this.elapsed < INTRO_MS) this.drawSignature();
		ctx.globalAlpha = 1;
	}

	// Seoul — the 合川 pole star, pivot of the idle sidereal drift and origin of
	// the lineage. A faint warm "home star" high in the northern sky.
	private drawPoleStar(): void {
		const ctx = this.ctx;
		const px = this.opts.parallax.x * PARALLAX_PX * 0.08;
		const py = this.opts.parallax.y * PARALLAX_PX * 0.08;
		const x = this.w / 2 + px;
		const y = this.h * 0.15 + py;
		const pulse = this.opts.reducedMotion
			? 1
			: 0.85 + 0.15 * Math.sin(this.elapsed * 0.0016);
		const fade = Math.min(1, Math.max(0, (this.elapsed - INTRO_MS) / 1200));
		const alpha = fade * (1 - this.dim * 0.6);

		const glow = ctx.createRadialGradient(x, y, 0, x, y, 26 * pulse);
		glow.addColorStop(0, `rgba(255,225,180,${0.32 * alpha})`);
		glow.addColorStop(1, "rgba(255,225,180,0)");
		ctx.fillStyle = glow;
		ctx.beginPath();
		ctx.arc(x, y, 26 * pulse, 0, Math.PI * 2);
		ctx.fill();

		ctx.globalAlpha = alpha;
		ctx.fillStyle = "#fff2dc";
		ctx.beginPath();
		ctx.arc(x, y, 2.4 * pulse, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = 1;
	}

	// Canada — the roots between. A faint aurora borealis band (green → violet)
	// undulating low on the horizon.
	private drawAurora(): void {
		const ctx = this.ctx;
		const fade = Math.min(1, Math.max(0, (this.elapsed - INTRO_MS) / 1500));
		if (fade <= 0) return;
		const top = this.h * AURORA_TOP;
		const bottom = this.h * AURORA_BOTTOM;
		const t = this.opts.reducedMotion ? 0 : this.elapsed * 0.0004;
		const px = this.opts.parallax.x * PARALLAX_PX * 0.2;

		ctx.save();
		ctx.globalCompositeOperation = "screen";
		const ribbons = 3;
		for (let r = 0; r < ribbons; r++) {
			const phase = r * 1.7;
			const hueTop =
				r % 2 === 0 ? "rgba(70,220,150," : "rgba(140,110,240,";
			const bandH = (bottom - top) * (0.5 + r * 0.18);
			ctx.beginPath();
			ctx.moveTo(-40, bottom);
			const steps = 22;
			for (let s = 0; s <= steps; s++) {
				const fx = (s / steps) * (this.w + 80) - 40;
				const wave =
					Math.sin(s * 0.55 + t * 2 + phase) * 18 +
					Math.sin(s * 0.23 - t * 1.3 + phase) * 30;
				ctx.lineTo(fx + px, top + bandH * 0.2 + wave + r * 14);
			}
			ctx.lineTo(this.w + 40, bottom);
			ctx.closePath();
			const grad = ctx.createLinearGradient(0, top, 0, bottom);
			grad.addColorStop(0, `${hueTop}${0.16 * fade})`);
			grad.addColorStop(1, "rgba(20,40,60,0)");
			ctx.fillStyle = grad;
			ctx.fill();
		}
		ctx.restore();
	}

	// New York — the present sky. A thin Manhattan silhouette the stars rise
	// over, warmed by city glow, with a bright "you are here" beacon above it.
	private drawHorizon(): void {
		const ctx = this.ctx;
		const fade = Math.min(1, Math.max(0, (this.elapsed - INTRO_MS) / 1200));
		const base = this.h;
		const top = this.h * SKYLINE_TOP;
		const bandH = base - top;
		const px = this.opts.parallax.x * PARALLAX_PX * 0.5;

		// Warm city glow rising off the horizon.
		const glow = ctx.createLinearGradient(0, top - bandH * 1.2, 0, base);
		glow.addColorStop(0, "rgba(255,180,90,0)");
		glow.addColorStop(1, `rgba(255,170,90,${0.14 * fade})`);
		ctx.fillStyle = glow;
		ctx.fillRect(0, top - bandH * 1.2, this.w, base - top + bandH * 1.2);

		// The "you are here" beacon — the current city, brightest, above midtown.
		const beaconX = this.w * 0.5 + px;
		const beaconY = top - bandH * 0.55;
		const bpulse = this.opts.reducedMotion
			? 1
			: 0.8 + 0.2 * Math.sin(this.elapsed * 0.003);
		const bglow = ctx.createRadialGradient(
			beaconX,
			beaconY,
			0,
			beaconX,
			beaconY,
			22 * bpulse,
		);
		bglow.addColorStop(0, `rgba(255,240,210,${0.55 * fade})`);
		bglow.addColorStop(1, "rgba(255,240,210,0)");
		ctx.fillStyle = bglow;
		ctx.beginPath();
		ctx.arc(beaconX, beaconY, 22 * bpulse, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = fade;
		ctx.fillStyle = "#fffef8";
		ctx.beginPath();
		ctx.arc(beaconX, beaconY, 2.6 * bpulse, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = 1;

		// Skyline silhouette.
		ctx.fillStyle = "#05060f";
		for (const b of this.skyline) {
			const bx = b.x * this.w + px * 0.6;
			const bw = b.w * this.w;
			const bh = b.h * bandH;
			ctx.fillRect(bx, base - bh, bw, bh);
			// Lit windows.
			ctx.fillStyle = `rgba(255,200,120,${0.5 * fade})`;
			b.lit.forEach((wy) => {
				ctx.fillRect(
					bx + bw * 0.3,
					base - bh * (0.2 + wy * 0.7),
					1.5,
					2,
				);
			});
			ctx.fillStyle = "#05060f";
		}
	}

	// One thin line traces the path Seoul → aurora → New York: "the same 奎
	// stars, seen from Hapcheon, from Canada, and from here."
	private drawMigrationArc(): void {
		const fade = Math.min(1, Math.max(0, (this.elapsed - INTRO_MS) / 1800));
		if (fade <= 0) return;
		const ctx = this.ctx;
		const px = this.opts.parallax.x * PARALLAX_PX * 0.12;
		const seoul: [number, number] = [this.w / 2 + px * 0.08, this.h * 0.15];
		const aurora: [number, number] = [
			this.w * 0.38 + px * 0.2,
			this.h * 0.6,
		];
		const nyc: [number, number] = [
			this.w * 0.5 + px * 0.5,
			this.h * SKYLINE_TOP - this.h * (1 - SKYLINE_TOP) * 0.55,
		];

		ctx.save();
		ctx.setLineDash([2, 7]);
		ctx.lineWidth = 1;
		ctx.strokeStyle = `rgba(200,215,255,${0.28 * fade})`;
		ctx.beginPath();
		ctx.moveTo(seoul[0], seoul[1]);
		ctx.quadraticCurveTo(
			aurora[0] - this.w * 0.14,
			aurora[1] - this.h * 0.18,
			aurora[0],
			aurora[1],
		);
		ctx.quadraticCurveTo(
			nyc[0] - this.w * 0.02,
			nyc[1] + this.h * 0.12,
			nyc[0],
			nyc[1],
		);
		ctx.stroke();
		ctx.restore();
	}

	private drawConstellations(drift: number): void {
		const ctx = this.ctx;
		// Entry: lines draw in progressively over CONSTELLATION_DRAW_MS.
		const progress = this.opts.reducedMotion
			? 1
			: Math.min(1, this.elapsed / CONSTELLATION_DRAW_MS);
		ctx.lineWidth = 1;
		for (const c of this.field.constellations) {
			const [r, g, b] = hexToRgb(c.color);
			const isActive =
				this.hoveredIndex !== null &&
				this.field.stars[this.hoveredIndex]?.sectionArrayIndex ===
					c.sectionArrayIndex;
			const baseAlpha = (isActive ? 0.55 : 0.18) * (1 - this.dim * 0.7);
			const pts = c.starIndices;
			const shown = Math.max(2, Math.floor(pts.length * progress));
			ctx.strokeStyle = `rgba(${r},${g},${b},${baseAlpha})`;
			ctx.beginPath();
			for (let i = 0; i < shown; i++) {
				const star = this.field.stars[pts[i]];
				const [sx, sy] = this.worldToScreen(
					star.baseX,
					star.baseY,
					star.depth,
					drift,
				);
				if (i === 0) ctx.moveTo(sx, sy);
				else ctx.lineTo(sx, sy);
			}
			ctx.stroke();
		}
	}

	private drawCardStars(drift: number, twinkle: number): void {
		const ctx = this.ctx;
		this.field.stars.forEach((star, i) => {
			const [sx, sy] = this.worldToScreen(
				star.baseX,
				star.baseY,
				star.depth,
				drift,
			);
			this.screenX[i] = sx;
			this.screenY[i] = sy;

			const hovered = i === this.hoveredIndex;
			const selected = i === this.selectedIndex;
			const flare = hovered || selected ? 1 : 0;
			const tw = this.opts.reducedMotion
				? 1
				: 0.82 + 0.18 * Math.sin(twinkle * 1.5 + star.twinklePhase);
			const [r, g, b] = hexToRgb(star.color);
			const coreR = star.size * (1 + flare * 0.7) * tw;
			const glowR = coreR * (flare ? 6 : 4);
			const alpha =
				(0.5 + star.brightness * 0.5) *
				tw *
				(1 - this.dim * 0.65 * (selected ? 0 : 1));

			// Glow halo.
			const g1 = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
			g1.addColorStop(0, `rgba(${r},${g},${b},${0.5 * alpha})`);
			g1.addColorStop(1, `rgba(${r},${g},${b},0)`);
			ctx.globalAlpha = 1;
			ctx.fillStyle = g1;
			ctx.beginPath();
			ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
			ctx.fill();

			// Core — whitens on hover/select for a flare read.
			ctx.globalAlpha = alpha;
			ctx.fillStyle = flare
				? "#ffffff"
				: `rgb(${Math.min(255, r + 90)},${Math.min(
						255,
						g + 90,
					)},${Math.min(255, b + 90)})`;
			ctx.beginPath();
			ctx.arc(sx, sy, coreR, 0, Math.PI * 2);
			ctx.fill();
		});
		ctx.globalAlpha = 1;
	}

	private drawForeground(): void {
		const ctx = this.ctx;
		for (const b of this.bokeh) {
			const px = this.opts.parallax.x * PARALLAX_PX * 0.6;
			const py = this.opts.parallax.y * PARALLAX_PX * 0.6;
			const sx = this.w / 2 + b.x * this.w * 0.6 + px;
			const sy = this.h / 2 + b.y * this.h * 0.6 + py;
			const [r, g, bl] = hexToRgb(b.hue);
			const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, b.r);
			grad.addColorStop(0, `rgba(${r},${g},${bl},0.05)`);
			grad.addColorStop(1, `rgba(${r},${g},${bl},0)`);
			ctx.globalAlpha = 1 - this.dim * 0.8;
			ctx.fillStyle = grad;
			ctx.beginPath();
			ctx.arc(sx, sy, b.r, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.globalAlpha = 1;
	}

	private drawShooting(): void {
		if (!this.shooting.active) return;
		const ctx = this.ctx;
		const tailX = this.shooting.x - this.shooting.vx * 140;
		const tailY = this.shooting.y - this.shooting.vy * 140;
		const grad = ctx.createLinearGradient(
			this.shooting.x,
			this.shooting.y,
			tailX,
			tailY,
		);
		grad.addColorStop(0, "rgba(255,255,255,0.9)");
		grad.addColorStop(1, "rgba(255,255,255,0)");
		ctx.strokeStyle = grad;
		ctx.lineWidth = 2;
		ctx.globalAlpha = Math.min(1, this.shooting.life / 300);
		ctx.beginPath();
		ctx.moveTo(this.shooting.x, this.shooting.y);
		ctx.lineTo(tailX, tailY);
		ctx.stroke();
		ctx.globalAlpha = 1;
	}

	// One-time identity signature: the 奎 constellation strokes draw across the
	// center, hold, then dissolve — "this sky belongs to 旻奎."
	private drawSignature(): void {
		if (this.opts.reducedMotion) return;
		const ctx = this.ctx;
		const t = this.elapsed / INTRO_MS;
		// Fade in 0-0.15, hold, fade out 0.75-1.
		let alpha = 1;
		if (t < 0.15) alpha = t / 0.15;
		else if (t > 0.75) alpha = Math.max(0, (1 - t) / 0.25);
		const drawProg = Math.min(1, t / 0.6);

		const scale = Math.min(this.w, this.h) * 0.32;
		const cx = this.w / 2;
		const cy = this.h / 2;
		const px = (nx: number): number => cx + nx * scale;
		const py = (ny: number): number => cy + ny * scale;

		const totalEdges = KYU_EDGES.length;
		const shownEdges = drawProg * totalEdges;
		ctx.strokeStyle = `rgba(215,225,255,${0.7 * alpha})`;
		ctx.lineWidth = 1.4;
		ctx.beginPath();
		KYU_EDGES.forEach(([a, b], idx) => {
			if (idx >= shownEdges) return;
			const pa = KYU_STARS[a];
			const pb = KYU_STARS[b];
			const frac = Math.min(1, shownEdges - idx);
			ctx.moveTo(px(pa.x), py(pa.y));
			ctx.lineTo(
				px(pa.x + (pb.x - pa.x) * frac),
				py(pa.y + (pb.y - pa.y) * frac),
			);
		});
		ctx.stroke();

		// Signature stars.
		KYU_STARS.forEach((s, idx) => {
			const appear = idx / KYU_STARS.length;
			if (drawProg < appear) return;
			ctx.fillStyle = `rgba(255,255,255,${0.9 * alpha})`;
			ctx.beginPath();
			ctx.arc(px(s.x), py(s.y), 2.2, 0, Math.PI * 2);
			ctx.fill();
		});

		// Hanja seal fades in under the figure.
		if (t > 0.3) {
			ctx.globalAlpha = alpha;
			ctx.fillStyle = "rgba(220,228,255,0.85)";
			ctx.font = `${Math.round(
				scale * 0.34,
			)}px "Nanum Myeongjo", "Songti SC", serif`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("旻奎", cx, cy + scale * 0.02);
			ctx.globalAlpha = 1;
		}
	}

	// --- Interaction surface -------------------------------------------------

	hitTest(clientX: number, clientY: number): number | null {
		let best: number | null = null;
		let bestDist = Infinity;
		for (let i = 0; i < this.field.stars.length; i++) {
			const dx = clientX - this.screenX[i];
			const dy = clientY - this.screenY[i];
			const d = dx * dx + dy * dy;
			const radius = Math.max(20, this.field.stars[i].size * 5);
			if (d < radius * radius && d < bestDist) {
				bestDist = d;
				best = i;
			}
		}
		return best;
	}

	setHovered(index: number | null): void {
		this.hoveredIndex = index;
	}

	get hovered(): number | null {
		return this.hoveredIndex;
	}

	select(index: number | null): void {
		this.selectedIndex = index;
		if (index === null) {
			this.zoomTarget = 1;
			this.focusTargetX = 0;
			this.focusTargetY = 0;
			this.dimTarget = 0;
		} else {
			const star = this.field.stars[index];
			this.zoomTarget = this.opts.reducedMotion ? 1 : 1.7;
			this.focusTargetX = star.baseX;
			this.focusTargetY = star.baseY;
			this.dimTarget = 1;
		}
	}

	isIntroPlaying(): boolean {
		return this.elapsed < INTRO_MS;
	}
}
