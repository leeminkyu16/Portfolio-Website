import { prefersReducedMotion } from "../../galaxy/util/device";

// Turns pointer movement and device tilt into a smoothed parallax offset in
// [-1, 1] on each axis. The renderer multiplies this by each layer's depth so
// nearer planes slide further than the deep sky. Reduced-motion users get a
// permanently centered (zero) offset — the sky stays still.
export class ParallaxController {
	private targetX = 0;
	private targetY = 0;
	private currentX = 0;
	private currentY = 0;
	private readonly reducedMotion = prefersReducedMotion();

	private boundPointerMove: (e: PointerEvent) => void;
	private boundOrientation: (e: DeviceOrientationEvent) => void;

	constructor() {
		this.boundPointerMove = this.onPointerMove.bind(this);
		this.boundOrientation = this.onOrientation.bind(this);
	}

	attach(): void {
		if (this.reducedMotion) return;
		window.addEventListener("pointermove", this.boundPointerMove, {
			passive: true,
		});
		window.addEventListener("deviceorientation", this.boundOrientation);
	}

	detach(): void {
		window.removeEventListener("pointermove", this.boundPointerMove);
		window.removeEventListener("deviceorientation", this.boundOrientation);
	}

	private onPointerMove(e: PointerEvent): void {
		this.targetX = (e.clientX / window.innerWidth) * 2 - 1;
		this.targetY = (e.clientY / window.innerHeight) * 2 - 1;
	}

	private onOrientation(e: DeviceOrientationEvent): void {
		// gamma: left/right tilt [-90,90]; beta: front/back [-180,180].
		if (e.gamma == null || e.beta == null) return;
		this.targetX = Math.max(-1, Math.min(1, e.gamma / 35));
		this.targetY = Math.max(-1, Math.min(1, (e.beta - 45) / 35));
	}

	// Eased follow toward the target; call once per frame. `delta` is ms.
	update(delta: number): void {
		if (this.reducedMotion) {
			this.currentX = 0;
			this.currentY = 0;
			return;
		}
		// Frame-rate independent smoothing (~0.12 per 16ms).
		const k = 1 - Math.pow(0.88, delta / 16);
		this.currentX += (this.targetX - this.currentX) * k;
		this.currentY += (this.targetY - this.currentY) * k;
	}

	get x(): number {
		return this.currentX;
	}

	get y(): number {
		return this.currentY;
	}
}
