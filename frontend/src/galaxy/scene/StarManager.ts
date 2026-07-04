import { ListResume } from "portfolio-website-shared";
import {
	AdditiveBlending,
	Color,
	Mesh,
	MeshBasicMaterial,
	Sprite,
	SpriteMaterial,
	SphereGeometry,
	Vector3,
} from "three";
import {
	CSS3DObject,
	CSS3DSprite,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import {
	getCardDescription,
	getCardLabel,
	getCardMeta,
} from "../data/cluster-layout";
import { prefersReducedMotion } from "../util/device";
import { ClusterManager } from "./ClusterManager";
import { GalaxyScene } from "./GalaxyScene";
import { getStarTexture } from "./textures";

export interface StarData {
	sectionArrayIndex: number;
	subsectionArrayIndex: number;
	cardIndex: number;
	label: string;
	accentColor: string;
	sprite: Sprite;
	hitMesh: Mesh;
	labelObj: CSS3DObject;
	// Target scale the idle pulse oscillates around. Hover highlight moves
	// this between normal/highlight sizes rather than touching sprite.scale
	// directly, so the two effects don't fight each other.
	baseSize: number;
	pulsePhase: number;
}

// Sprite quad size in world units — large enough that each card reads as a
// glowing point of light that the bloom pass can grab, not a tiny matte dot.
const STAR_NORMAL_SIZE = 60;
const STAR_HIGHLIGHT_SIZE = 96;
const STAR_HIT_RADIUS = 34;

// Layout radius grows with card count so dense sections (e.g. a Skills
// cluster with 15-20 individual cards) get proportionally more room
// instead of packing into the same fixed-size shell as a 3-card section.
// Sized so the stars spread across the framed view once the camera dives in
// rather than huddling in a tight knot at the centre.
const STAR_LAYOUT_BASE_RADIUS = 120;
const STAR_LAYOUT_RADIUS_PER_ITEM = 30;

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

// Lay the cards out on a flat sunflower (phyllotaxis) disc that faces the
// camera's approach direction, rather than on a sphere. The camera always
// dives toward a cluster along its radial line, so a disc perpendicular to
// that line spreads every card across the screen at roughly equal depth —
// no more front/back stars projecting on top of each other and stacking
// their labels. A little depth jitter keeps it from looking dead-flat.
function facingDiscOffsets(
	center: Vector3,
	radius: number,
	count: number,
): Vector3[] {
	const normal =
		center.lengthSq() > 0
			? center.clone().normalize()
			: new Vector3(0, 0, 1);
	const seed =
		Math.abs(normal.y) < 0.9 ? new Vector3(0, 1, 0) : new Vector3(1, 0, 0);
	const right = new Vector3().crossVectors(seed, normal).normalize();
	const up = new Vector3().crossVectors(normal, right).normalize();

	return Array.from({ length: count }, (_, i) => {
		const r = radius * Math.sqrt((i + 0.5) / count);
		const theta = i * GOLDEN_ANGLE;
		const jitter = ((i % 3) - 1) * 22; // small in/out offset for depth
		return new Vector3()
			.addScaledVector(right, r * Math.cos(theta))
			.addScaledVector(up, r * Math.sin(theta))
			.addScaledVector(normal, jitter);
	});
}

interface CardEntry {
	subsectionArrayIndex: number;
	cardIndex: number;
	cardBundle: unknown;
	template: Array<[number, string, ...unknown[]]>;
}

export class StarManager {
	private galaxyScene: GalaxyScene;
	private clusterManager: ClusterManager;
	private resumeData: ListResume;
	private starsBySection: Map<number, StarData[]> = new Map();
	private starHitGeometry = new SphereGeometry(1, 8, 8);
	private reducedMotion = prefersReducedMotion();
	private time = 0;

	constructor(
		galaxyScene: GalaxyScene,
		clusterManager: ClusterManager,
		resumeData: ListResume,
	) {
		this.galaxyScene = galaxyScene;
		this.clusterManager = clusterManager;
		this.resumeData = resumeData;
	}

	build(): void {
		const clusters = this.clusterManager.getClusters();

		this.resumeData.forEach((section, si) => {
			const cluster = clusters[si];
			const stars: StarData[] = [];

			const cardEntries: CardEntry[] = [];
			section[2].forEach((subsection, ssi) => {
				const template = subsection[3] as Array<
					[number, string, ...unknown[]]
				>;
				subsection[4].forEach((cardBundle, ci) => {
					cardEntries.push({
						subsectionArrayIndex: ssi,
						cardIndex: ci,
						cardBundle,
						template,
					});
				});
			});

			const layoutRadius =
				STAR_LAYOUT_BASE_RADIUS +
				STAR_LAYOUT_RADIUS_PER_ITEM * Math.sqrt(cardEntries.length);
			const layoutOffsets = facingDiscOffsets(
				cluster.position,
				layoutRadius,
				cardEntries.length,
			);

			cardEntries.forEach((entry, index) => {
				const {
					subsectionArrayIndex,
					cardIndex,
					cardBundle,
					template,
				} = entry;
				const label = getCardLabel(cardBundle as unknown[], template);
				const meta = getCardMeta(cardBundle as unknown[], template);
				const description = getCardDescription(
					cardBundle as unknown[],
					template,
				);
				const offset = layoutOffsets[index];
				const position = new Vector3(
					cluster.position.x + offset.x,
					cluster.position.y + offset.y,
					cluster.position.z + offset.z,
				);

				const sprite = new Sprite(
					new SpriteMaterial({
						map: getStarTexture(),
						color: new Color(cluster.accentColor),
						transparent: true,
						blending: AdditiveBlending,
						depthWrite: false,
					}),
				);
				sprite.position.copy(position);
				sprite.scale.setScalar(STAR_NORMAL_SIZE);
				sprite.visible = false;
				this.galaxyScene.scene.add(sprite);

				// Invisible, generously-sized hit target — clicking/hovering the
				// small visible sphere directly is too fiddly to be reliable.
				const hitMesh = new Mesh(
					this.starHitGeometry,
					new MeshBasicMaterial({
						transparent: true,
						opacity: 0,
						depthWrite: false,
					}),
				);
				hitMesh.position.copy(position);
				hitMesh.scale.setScalar(STAR_HIT_RADIUS);
				hitMesh.visible = false;
				this.galaxyScene.scene.add(hitMesh);

				// Label: title always visible, meta (company/date/org) always
				// visible, description snippet revealed on hover via --expanded
				const el = document.createElement("div");
				el.className = "galaxy-star-label";

				const titleEl = document.createElement("div");
				titleEl.className = "galaxy-star-label__title";
				titleEl.textContent = label;
				titleEl.style.color = cluster.accentColor;
				el.appendChild(titleEl);

				if (meta) {
					const metaEl = document.createElement("div");
					metaEl.className = "galaxy-star-label__meta";
					metaEl.textContent = meta;
					el.appendChild(metaEl);
				}

				if (description) {
					const descEl = document.createElement("div");
					descEl.className = "galaxy-star-label__desc";
					descEl.textContent = description;
					el.appendChild(descEl);
				}

				// CSS3DSprite (not CSS3DObject) so the label always billboards to
				// face the camera. A plain CSS3DObject keeps a fixed world
				// orientation, so once the camera dives in from the side/behind
				// the text renders rotated or mirrored ("backwards") and unreadable.
				const labelObj = new CSS3DSprite(el);
				labelObj.position.copy(position);
				labelObj.position.y += 34;
				this.galaxyScene.cssScene.add(labelObj);

				stars.push({
					sectionArrayIndex: si,
					subsectionArrayIndex,
					cardIndex,
					label,
					accentColor: cluster.accentColor,
					sprite,
					hitMesh,
					labelObj,
					baseSize: STAR_NORMAL_SIZE,
					pulsePhase: Math.random() * Math.PI * 2,
				});
			});

			this.starsBySection.set(si, stars);
		});

		if (!this.reducedMotion) {
			this.galaxyScene.addUpdateCallback((delta) => this.pulse(delta));
		}
	}

	// Gentle breathing on the stars currently on screen. Skipped for hidden
	// stars so we don't touch every card's transform each frame.
	private pulse(delta: number): void {
		this.time += delta * 0.002;
		this.starsBySection.forEach((stars) => {
			stars.forEach((star) => {
				if (!star.sprite.visible) return;
				const scale =
					star.baseSize *
					(1 + 0.08 * Math.sin(this.time + star.pulsePhase));
				star.sprite.scale.setScalar(scale);
			});
		});
	}

	getStarsForSection(sectionArrayIndex: number): StarData[] {
		return this.starsBySection.get(sectionArrayIndex) ?? [];
	}

	setStarHighlight(star: StarData, highlighted: boolean): void {
		star.baseSize = highlighted ? STAR_HIGHLIGHT_SIZE : STAR_NORMAL_SIZE;
		// The pulse loop applies baseSize each frame; when motion is disabled
		// there is no pulse, so set the final scale here directly.
		if (this.reducedMotion) {
			star.sprite.scale.setScalar(star.baseSize);
		}
		(star.sprite.material as SpriteMaterial).color = highlighted
			? new Color(1, 1, 1)
			: new Color(star.accentColor);
		star.labelObj.element.classList.toggle(
			"galaxy-star-label--expanded",
			highlighted,
		);
	}

	showLabelsForSection(sectionArrayIndex: number): void {
		const stars = this.starsBySection.get(sectionArrayIndex) ?? [];
		stars.forEach((s) => {
			s.sprite.visible = true;
			s.hitMesh.visible = true;
			s.labelObj.element.classList.add("galaxy-star-label--visible");
		});
	}

	hideAllLabels(): void {
		this.starsBySection.forEach((stars) => {
			stars.forEach((s) => {
				s.sprite.visible = false;
				s.hitMesh.visible = false;
				s.labelObj.element.classList.remove(
					"galaxy-star-label--visible",
				);
			});
		});
	}
}
