import { BufferAttribute, BufferGeometry, Points, ShaderMaterial } from "three";
import { starFragmentShader, starVertexShader } from "../shaders/stars";
import { isCompactViewport, prefersReducedMotion } from "../util/device";
import { GalaxyScene } from "./GalaxyScene";

// Fewer stars on small screens: the backdrop is fill-rate bound there and
// the density difference is barely perceptible on a phone.
const STAR_COUNT = 15000;
const STAR_COUNT_COMPACT = 8000;

// Whole-sky drift. Tiny, but enough that the field never feels frozen.
const SKY_ROTATION_SPEED = 0.000012;

const STAR_PALETTE: [number, number, number][] = [
	[1.0, 1.0, 1.0], // white
	[0.85, 0.9, 1.0], // blue-white
	[0.7, 0.82, 1.0], // light blue
	[1.0, 0.95, 0.75], // warm yellow
	[1.0, 0.88, 0.6], // golden
];

export class StarField {
	private galaxyScene: GalaxyScene;
	private material: ShaderMaterial | null = null;
	private points: Points | null = null;
	private reducedMotion = prefersReducedMotion();

	constructor(galaxyScene: GalaxyScene) {
		this.galaxyScene = galaxyScene;
	}

	build(): void {
		const starCount = isCompactViewport() ? STAR_COUNT_COMPACT : STAR_COUNT;
		const positions = new Float32Array(starCount * 3);
		const sizes = new Float32Array(starCount);
		const phases = new Float32Array(starCount);
		const colors = new Float32Array(starCount * 3);

		for (let i = 0; i < starCount; i++) {
			const r = 3000 + Math.random() * 4000;
			const theta = Math.acos(2 * Math.random() - 1);
			const phi = 2 * Math.PI * Math.random();
			positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
			positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
			positions[i * 3 + 2] = r * Math.cos(theta);

			sizes[i] = 0.5 + Math.random() * 2.5;
			phases[i] = Math.random() * Math.PI * 2;

			const palette =
				STAR_PALETTE[Math.floor(Math.random() * STAR_PALETTE.length)];
			colors[i * 3] = palette[0];
			colors[i * 3 + 1] = palette[1];
			colors[i * 3 + 2] = palette[2];
		}

		const geometry = new BufferGeometry();
		geometry.setAttribute("position", new BufferAttribute(positions, 3));
		geometry.setAttribute("size", new BufferAttribute(sizes, 1));
		geometry.setAttribute("phase", new BufferAttribute(phases, 1));
		geometry.setAttribute("color", new BufferAttribute(colors, 3));

		this.material = new ShaderMaterial({
			vertexShader: starVertexShader,
			fragmentShader: starFragmentShader,
			uniforms: { time: { value: 0 }, opacity: { value: 0.0 } },
			transparent: true,
			depthWrite: false,
		});

		const stars = new Points(geometry, this.material);
		this.points = stars;
		this.galaxyScene.scene.add(stars);

		this.galaxyScene.addUpdateCallback((delta) => {
			// Reduced-motion users get a still, non-twinkling sky.
			if (this.reducedMotion) return;
			if (this.material) {
				this.material.uniforms.time.value += delta * 0.001;
			}
			if (this.points) {
				this.points.rotation.y += delta * SKY_ROTATION_SPEED;
				this.points.rotation.x += delta * SKY_ROTATION_SPEED * 0.4;
			}
		});
	}

	setOpacity(v: number): void {
		if (this.material) {
			this.material.uniforms.opacity.value = v;
		}
	}
}
