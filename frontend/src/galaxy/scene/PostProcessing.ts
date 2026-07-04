import { Camera, Scene, Vector2, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";

export interface BloomOptions {
	// Overall glow intensity added back to the frame.
	strength: number;
	// Blur spread of the glow — higher = softer, wider halos.
	radius: number;
	// Luminance cutoff; only pixels brighter than this bloom.
	threshold: number;
}

// UnrealBloomPass is the single biggest visual lever here: it takes the
// bright additive stars / nebula points and blooms them into soft glows,
// turning flat sprites into something that reads as light. The CSS3D label
// layer renders in a separate DOM renderer on top, so text stays crisp and
// is never blurred by the bloom.
//
// GammaCorrectionShader is the final pass because EffectComposer works in
// linear space; without it the whole scene reads muddy/dark on screen.
export class PostProcessing {
	private composer: EffectComposer;
	private bloomPass: UnrealBloomPass;

	constructor(
		renderer: WebGLRenderer,
		scene: Scene,
		camera: Camera,
		options: BloomOptions,
	) {
		const size = renderer.getSize(new Vector2());

		this.composer = new EffectComposer(renderer);
		this.composer.setPixelRatio(renderer.getPixelRatio());
		this.composer.addPass(new RenderPass(scene, camera));

		this.bloomPass = new UnrealBloomPass(
			size,
			options.strength,
			options.radius,
			options.threshold,
		);
		this.composer.addPass(this.bloomPass);

		this.composer.addPass(new ShaderPass(GammaCorrectionShader));
	}

	render(): void {
		this.composer.render();
	}

	setSize(width: number, height: number): void {
		this.composer.setSize(width, height);
	}

	setBloomStrength(strength: number): void {
		this.bloomPass.strength = strength;
	}

	dispose(): void {
		// EffectComposer.dispose() exists at runtime in this three version but
		// is missing from its bundled .d.ts, hence the cast.
		(this.composer as unknown as { dispose(): void }).dispose();
	}
}
