import { Color, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { isCompactViewport } from "../util/device";
import { BloomOptions, PostProcessing } from "./PostProcessing";
import { tweenGroup } from "./tweens";

// Same near-black as the page body. Rendering it as an opaque WebGL
// background (rather than a transparent canvas over the CSS body) is what
// lets UnrealBloomPass composite correctly — bloom over a transparent clear
// is a known source of black fringing.
const BACKGROUND_COLOR = 0x050510;

const BLOOM_DESKTOP: BloomOptions = {
	strength: 1.05,
	radius: 0.6,
	threshold: 0.16,
};
// Softer + cheaper on small devices where fill-rate is the constraint.
const BLOOM_COMPACT: BloomOptions = {
	strength: 0.7,
	radius: 0.4,
	threshold: 0.22,
};

export class GalaxyScene {
	readonly webglRenderer: WebGLRenderer;
	readonly css3dRenderer: CSS3DRenderer;
	readonly camera: PerspectiveCamera;
	readonly scene: Scene;
	readonly cssScene: Scene;
	readonly mountEl: HTMLElement;

	private postProcessing: PostProcessing;
	private rafId: number | null = null;
	private lastTime = 0;
	private updateCallbacks: Array<(delta: number) => void> = [];

	constructor(mountEl: HTMLElement) {
		this.mountEl = mountEl;
		this.scene = new Scene();
		this.scene.background = new Color(BACKGROUND_COLOR);
		this.cssScene = new Scene();

		this.camera = new PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			1,
			10000,
		);
		this.camera.position.set(0, 0, 3000);

		this.webglRenderer = new WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		this.webglRenderer.setSize(window.innerWidth, window.innerHeight);
		this.webglRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.webglRenderer.domElement.style.position = "absolute";
		this.webglRenderer.domElement.style.top = "0";
		this.webglRenderer.domElement.style.left = "0";
		mountEl.appendChild(this.webglRenderer.domElement);

		this.css3dRenderer = new CSS3DRenderer();
		this.css3dRenderer.setSize(window.innerWidth, window.innerHeight);
		this.css3dRenderer.domElement.style.position = "absolute";
		this.css3dRenderer.domElement.style.top = "0";
		this.css3dRenderer.domElement.style.left = "0";
		this.css3dRenderer.domElement.style.pointerEvents = "none";
		mountEl.appendChild(this.css3dRenderer.domElement);

		this.postProcessing = new PostProcessing(
			this.webglRenderer,
			this.scene,
			this.camera,
			isCompactViewport() ? BLOOM_COMPACT : BLOOM_DESKTOP,
		);

		window.addEventListener("resize", this.onResize);
	}

	addUpdateCallback(cb: (delta: number) => void): void {
		this.updateCallbacks.push(cb);
	}

	start(): void {
		const loop = (time: number): void => {
			this.rafId = requestAnimationFrame(loop);
			const delta = time - this.lastTime;
			this.lastTime = time;
			this.updateCallbacks.forEach((cb) => cb(delta));
			tweenGroup.update(time);
			this.postProcessing.render();
			this.css3dRenderer.render(this.cssScene, this.camera);
		};
		this.rafId = requestAnimationFrame(loop);
	}

	stop(): void {
		if (this.rafId !== null) {
			cancelAnimationFrame(this.rafId);
			this.rafId = null;
		}
		window.removeEventListener("resize", this.onResize);
		this.postProcessing.dispose();
		this.webglRenderer.dispose();
		this.webglRenderer.domElement.remove();
		this.css3dRenderer.domElement.remove();
	}

	private onResize = (): void => {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.webglRenderer.setSize(window.innerWidth, window.innerHeight);
		this.postProcessing.setSize(window.innerWidth, window.innerHeight);
		this.css3dRenderer.setSize(window.innerWidth, window.innerHeight);
	};
}
