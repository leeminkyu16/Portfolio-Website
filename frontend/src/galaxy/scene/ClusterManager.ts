import TWEEN from "@tweenjs/tween.js";
import { ListResume } from "portfolio-website-shared";
import {
	AdditiveBlending,
	BufferAttribute,
	BufferGeometry,
	Color,
	Mesh,
	MeshBasicMaterial,
	Points,
	PointsMaterial,
	Sprite,
	SpriteMaterial,
	SphereGeometry,
	Vector3,
} from "three";
import {
	CSS3DObject,
	CSS3DSprite,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { getClusterColor, getClusterPositions } from "../data/cluster-layout";
import { prefersReducedMotion } from "../util/device";
import { GalaxyScene } from "./GalaxyScene";
import { getGlowTexture } from "./textures";
import { tweenGroup } from "./tweens";

export interface ClusterData {
	sectionArrayIndex: number;
	sectionId: number;
	title: string;
	accentColor: string;
	position: Vector3;
	nebulaMesh: Points;
	coreSprite: Sprite;
	hitMesh: Mesh;
	label: CSS3DObject;
	originalPositions: Float32Array;
}

const NEBULA_PARTICLE_COUNT = 450;
const CLUSTER_RADIUS = 1200;
const NEBULA_SPREAD = 180;
const CLUSTER_HIT_RADIUS = NEBULA_SPREAD * 1.3;

// Nebula point sprite size at rest vs. when hovered. Swelling the sprites
// (rather than only changing the cursor) gives clear "this is clickable"
// feedback that also glows harder through the bloom pass.
const NEBULA_BASE_SIZE = 16;
const NEBULA_HOVER_SIZE = 24;

// Soft accent-coloured glow at the heart of each cluster — reads as a
// galactic core and is the brightest thing the bloom pass latches onto.
const CORE_BASE_SCALE = 460;
const CORE_HOVER_SCALE = 560;
const CORE_BASE_OPACITY = 0.42;

let sharedHitGeometry: SphereGeometry | null = null;

// A single generous invisible sphere per cluster used for click/raycast
// hit-testing. Raycasting the sparse nebula Points directly means a click
// can easily land in a gap between particles and silently do nothing.
function getHitGeometry(): SphereGeometry {
	if (sharedHitGeometry) return sharedHitGeometry;
	sharedHitGeometry = new SphereGeometry(CLUSTER_HIT_RADIUS, 12, 12);
	return sharedHitGeometry;
}

function gaussianOffset(spread: number): number {
	const u = 1 - Math.random();
	const v = Math.random();
	return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * spread;
}

export class ClusterManager {
	private galaxyScene: GalaxyScene;
	private resumeData: ListResume;
	private clusters: ClusterData[] = [];
	private reducedMotion = prefersReducedMotion();

	constructor(galaxyScene: GalaxyScene, resumeData: ListResume) {
		this.galaxyScene = galaxyScene;
		this.resumeData = resumeData;
	}

	build(): void {
		const positions = getClusterPositions(
			this.resumeData.length,
			CLUSTER_RADIUS,
		);

		this.resumeData.forEach((section, si) => {
			const accentColor = getClusterColor(si);
			const clusterPos = new Vector3(
				positions[si].x,
				positions[si].y,
				positions[si].z,
			);
			const color = new Color(accentColor);

			// Nebula particles are stored in LOCAL space (centered on origin)
			// with the mesh positioned at the cluster, so the nebula can spin
			// in place (see the rotation callback below) without dragging its
			// label or hit target along with it.
			const particlePositions = new Float32Array(
				NEBULA_PARTICLE_COUNT * 3,
			);
			// Per-particle colour: white-hot near the core fading to the accent
			// hue at the edges, so the nebula reads as a glowing volume with
			// depth rather than a flat single-colour cloud.
			const particleColors = new Float32Array(NEBULA_PARTICLE_COUNT * 3);
			const white = new Color(1, 1, 1);
			const tmp = new Color();
			for (let i = 0; i < NEBULA_PARTICLE_COUNT; i++) {
				const x = gaussianOffset(NEBULA_SPREAD);
				const y = gaussianOffset(NEBULA_SPREAD);
				const z = gaussianOffset(NEBULA_SPREAD);
				particlePositions[i * 3] = x;
				particlePositions[i * 3 + 1] = y;
				particlePositions[i * 3 + 2] = z;

				const dist = Math.sqrt(x * x + y * y + z * z);
				// 1 at the centre → 0 by ~1.4 spreads out.
				const coreT = Math.max(0, 1 - dist / (NEBULA_SPREAD * 1.4));
				tmp.copy(color).lerp(white, coreT * coreT * 0.85);
				particleColors[i * 3] = tmp.r;
				particleColors[i * 3 + 1] = tmp.g;
				particleColors[i * 3 + 2] = tmp.b;
			}

			const geometry = new BufferGeometry();
			geometry.setAttribute(
				"position",
				new BufferAttribute(particlePositions.slice(), 3),
			);
			geometry.setAttribute(
				"color",
				new BufferAttribute(particleColors, 3),
			);

			const material = new PointsMaterial({
				map: getGlowTexture(),
				size: NEBULA_BASE_SIZE,
				vertexColors: true,
				transparent: true,
				opacity: 0.55,
				blending: AdditiveBlending,
				depthWrite: false,
				sizeAttenuation: true,
			});

			const nebulaMesh = new Points(geometry, material);
			nebulaMesh.position.copy(clusterPos);
			this.galaxyScene.scene.add(nebulaMesh);

			// Central galactic-core glow.
			const coreSprite = new Sprite(
				new SpriteMaterial({
					map: getGlowTexture(),
					color: color.clone(),
					transparent: true,
					opacity: CORE_BASE_OPACITY,
					blending: AdditiveBlending,
					depthWrite: false,
				}),
			);
			coreSprite.position.copy(clusterPos);
			coreSprite.scale.setScalar(CORE_BASE_SCALE);
			this.galaxyScene.scene.add(coreSprite);

			// Invisible hit target — see getHitGeometry() for why
			const hitMesh = new Mesh(
				getHitGeometry(),
				new MeshBasicMaterial({
					transparent: true,
					opacity: 0,
					depthWrite: false,
				}),
			);
			hitMesh.position.copy(clusterPos);
			this.galaxyScene.scene.add(hitMesh);

			// CSS3D label
			const el = document.createElement("div");
			el.className = "galaxy-cluster-label";
			el.textContent = section[1][0];
			el.style.color = accentColor;
			el.dataset.sectionArrayIndex = String(si);

			// Billboard so the cluster title always faces the camera (see the
			// star-label note in StarManager for why a plain CSS3DObject flips).
			const label = new CSS3DSprite(el);
			label.position.copy(clusterPos);
			label.position.y += NEBULA_SPREAD + 60;
			this.galaxyScene.cssScene.add(label);

			this.clusters.push({
				sectionArrayIndex: si,
				sectionId: section[0],
				title: section[1][0],
				accentColor,
				position: clusterPos,
				nebulaMesh,
				coreSprite,
				hitMesh,
				label,
				originalPositions: particlePositions.slice(),
			});
		});

		// Each nebula drifts at a slightly different rate so the field never
		// looks like one rigid object rotating in lockstep.
		if (!this.reducedMotion) {
			this.galaxyScene.addUpdateCallback((delta) => {
				this.clusters.forEach((c, i) => {
					c.nebulaMesh.rotation.y += delta * (0.00004 + i * 0.000008);
				});
			});
		}
	}

	getClusters(): ClusterData[] {
		return this.clusters;
	}

	getHitMeshes(): Mesh[] {
		return this.clusters.map((c) => c.hitMesh);
	}

	setClusterOpacity(si: number, opacity: number): void {
		const cluster = this.clusters[si];
		if (!cluster) return;
		(cluster.nebulaMesh.material as PointsMaterial).opacity =
			opacity * 0.55;
		(cluster.coreSprite.material as SpriteMaterial).opacity =
			opacity * CORE_BASE_OPACITY;
		cluster.label.element.style.opacity = String(opacity);
	}

	dimAllExcept(sectionArrayIndex: number): void {
		this.clusters.forEach((c) => {
			this.setClusterOpacity(
				c.sectionArrayIndex,
				c.sectionArrayIndex === sectionArrayIndex ? 1 : 0.05,
			);
		});
	}

	resetOpacity(): void {
		this.clusters.forEach((c) =>
			this.setClusterOpacity(c.sectionArrayIndex, 1),
		);
	}

	setClusterHover(si: number, hovered: boolean): void {
		const cluster = this.clusters[si];
		if (!cluster) return;
		(cluster.nebulaMesh.material as PointsMaterial).size = hovered
			? NEBULA_HOVER_SIZE
			: NEBULA_BASE_SIZE;
		cluster.coreSprite.scale.setScalar(
			hovered ? CORE_HOVER_SCALE : CORE_BASE_SCALE,
		);
		cluster.label.element.classList.toggle(
			"galaxy-cluster-label--hover",
			hovered,
		);
	}

	scatterParticles(si: number): void {
		const cluster = this.clusters[si];
		if (!cluster) return;
		const geo = cluster.nebulaMesh.geometry;
		const positions = geo.attributes["position"] as BufferAttribute;
		for (let i = 0; i < NEBULA_PARTICLE_COUNT; i++) {
			const target = {
				x:
					cluster.originalPositions[i * 3] +
					(Math.random() - 0.5) * 400,
				y:
					cluster.originalPositions[i * 3 + 1] +
					(Math.random() - 0.5) * 400,
				z:
					cluster.originalPositions[i * 3 + 2] +
					(Math.random() - 0.5) * 400,
			};
			const proxy = {
				x: positions.getX(i),
				y: positions.getY(i),
				z: positions.getZ(i),
			};
			new TWEEN.Tween(proxy, tweenGroup)
				.to(target, 800 + Math.random() * 400)
				.easing(TWEEN.Easing.Quadratic.Out)
				.onUpdate(() => {
					positions.setXYZ(i, proxy.x, proxy.y, proxy.z);
					positions.needsUpdate = true;
				})
				.start();
		}
	}

	implodeParticles(si: number): void {
		const cluster = this.clusters[si];
		if (!cluster) return;
		const geo = cluster.nebulaMesh.geometry;
		const positions = geo.attributes["position"] as BufferAttribute;
		for (let i = 0; i < NEBULA_PARTICLE_COUNT; i++) {
			const target = {
				x: cluster.originalPositions[i * 3],
				y: cluster.originalPositions[i * 3 + 1],
				z: cluster.originalPositions[i * 3 + 2],
			};
			const proxy = {
				x: positions.getX(i),
				y: positions.getY(i),
				z: positions.getZ(i),
			};
			new TWEEN.Tween(proxy, tweenGroup)
				.to(target, 600 + Math.random() * 400)
				.easing(TWEEN.Easing.Quadratic.In)
				.onUpdate(() => {
					positions.setXYZ(i, proxy.x, proxy.y, proxy.z);
					positions.needsUpdate = true;
				})
				.start();
		}
	}
}
