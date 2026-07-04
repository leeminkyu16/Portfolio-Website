import { BackSide, Mesh, ShaderMaterial, SphereGeometry, Vector3 } from "three";
import { GalaxyScene } from "./GalaxyScene";

// A large inward-facing sphere painted with a procedural deep-space gradient
// plus a few very soft coloured nebula clouds and a faint galactic band. This
// is what turns the flat near-black void into something with depth and colour.
// It is drawn behind everything (huge radius, depthWrite off) and kept dim so
// it never competes with the stars or over-drives the bloom pass.

const SKY_RADIUS = 9000;

// Direction + colour + tightness of each soft nebula cloud painted onto the
// dome. Kept low-saturation and low-intensity so they read as atmosphere.
// Peak intensities are kept below the bloom threshold (~0.16) on purpose so
// the backdrop reads as coloured atmosphere and never blooms into a spotlight.
const CLOUDS: Array<{ dir: Vector3; color: Vector3; sharp: number }> = [
	{
		dir: new Vector3(0.6, 0.25, 0.7),
		color: new Vector3(0.035, 0.025, 0.075),
		sharp: 3.2,
	},
	{
		dir: new Vector3(-0.7, -0.1, 0.6),
		color: new Vector3(0.015, 0.035, 0.06),
		sharp: 3.6,
	},
	{
		dir: new Vector3(-0.2, 0.7, -0.6),
		color: new Vector3(0.05, 0.02, 0.05),
		sharp: 4.0,
	},
	{
		dir: new Vector3(0.4, -0.6, -0.5),
		color: new Vector3(0.015, 0.03, 0.045),
		sharp: 3.4,
	},
];

const vertexShader = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec3 vDir;

  uniform vec3 uBase;
  uniform vec3 uHorizon;
  uniform vec3 uCloudDir[4];
  uniform vec3 uCloudColor[4];
  uniform float uCloudSharp[4];

  void main() {
    vec3 dir = normalize(vDir);

    // Vertical gradient: a touch of colour low, deep space up high.
    float t = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 col = mix(uHorizon, uBase, smoothstep(0.0, 1.0, t));

    // Soft coloured clouds by angular proximity to each cloud direction.
    for (int i = 0; i < 4; i++) {
      float d = max(dot(dir, normalize(uCloudDir[i])), 0.0);
      col += uCloudColor[i] * pow(d, uCloudSharp[i]);
    }

    // Faint galactic band across a tilted plane.
    float band = 1.0 - abs(dot(dir, normalize(vec3(0.35, 1.0, -0.2))));
    col += vec3(0.018, 0.02, 0.032) * pow(clamp(band, 0.0, 1.0), 8.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export class Skybox {
	private galaxyScene: GalaxyScene;
	private mesh: Mesh | null = null;

	constructor(galaxyScene: GalaxyScene) {
		this.galaxyScene = galaxyScene;
	}

	build(): void {
		const material = new ShaderMaterial({
			vertexShader,
			fragmentShader,
			side: BackSide,
			depthWrite: false,
			uniforms: {
				uBase: { value: new Vector3(0.012, 0.012, 0.03) },
				uHorizon: { value: new Vector3(0.022, 0.022, 0.052) },
				uCloudDir: {
					value: CLOUDS.map((c) => c.dir.clone().normalize()),
				},
				uCloudColor: { value: CLOUDS.map((c) => c.color.clone()) },
				uCloudSharp: { value: CLOUDS.map((c) => c.sharp) },
			},
		});

		const mesh = new Mesh(new SphereGeometry(SKY_RADIUS, 32, 24), material);
		mesh.renderOrder = -1;
		this.mesh = mesh;
		this.galaxyScene.scene.add(mesh);

		// Imperceptibly slow drift so the backdrop is never dead-still.
		this.galaxyScene.addUpdateCallback((delta) => {
			mesh.rotation.y += delta * 0.000004;
		});
	}
}
