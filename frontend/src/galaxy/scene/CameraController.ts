import TWEEN from "@tweenjs/tween.js";
import { PerspectiveCamera, Vector3 } from "three";
import { prefersReducedMotion } from "../util/device";
import { tweenGroup } from "./tweens";

export enum CameraState {
	Overview = "overview",
	Cluster = "cluster",
	Reading = "reading",
}

const OVERVIEW_Z = 3000;
// How far in front of a cluster the camera settles when diving in. Measured
// along the origin→cluster ray so every cluster is approached from the same
// side you were viewing it — a clean dolly-in, never a pan across the galaxy.
const CLUSTER_APPROACH_OFFSET = 760;

export class CameraController {
	state: CameraState = CameraState.Overview;
	activeSectionArrayIndex: number | null = null;

	private camera: PerspectiveCamera;
	private time = 0;
	private reducedMotion = prefersReducedMotion();

	constructor(camera: PerspectiveCamera) {
		this.camera = camera;
		this.camera.position.set(0, 0, OVERVIEW_Z);
	}

	goToCluster(
		clusterPosition: Vector3,
		sectionArrayIndex: number,
		onComplete: () => void,
	): void {
		this.state = CameraState.Cluster;
		this.activeSectionArrayIndex = sectionArrayIndex;

		// Sit on the far side of the cluster along its radial direction (from
		// the galaxy centre outward) so the camera pulls straight in toward it.
		const radial =
			clusterPosition.lengthSq() > 0
				? clusterPosition.clone().normalize()
				: new Vector3(0, 0, 1);
		const target = clusterPosition
			.clone()
			.add(radial.multiplyScalar(CLUSTER_APPROACH_OFFSET));

		new TWEEN.Tween(this.camera.position, tweenGroup)
			.to({ x: target.x, y: target.y, z: target.z }, 1600)
			.easing(TWEEN.Easing.Cubic.InOut)
			.onUpdate(() => {
				this.camera.lookAt(clusterPosition);
			})
			.onComplete(() => {
				this.camera.lookAt(clusterPosition);
				onComplete();
			})
			.start();
	}

	returnToOverview(onComplete: () => void): void {
		this.state = CameraState.Overview;
		this.activeSectionArrayIndex = null;
		this.time = 0;

		new TWEEN.Tween(this.camera.position, tweenGroup)
			.to({ x: 0, y: 0, z: OVERVIEW_Z }, 1500)
			.easing(TWEEN.Easing.Cubic.InOut)
			.onUpdate(() => {
				this.camera.lookAt(0, 0, 0);
			})
			.onComplete(() => {
				this.camera.lookAt(0, 0, 0);
				onComplete();
			})
			.start();
	}

	setReadingMode(): void {
		this.state = CameraState.Reading;
	}

	exitReadingMode(): void {
		this.state = CameraState.Cluster;
	}

	updateParallax(ndcX: number, ndcY: number): void {
		if (this.state !== CameraState.Overview) return;
		this.camera.position.x = ndcX * 50;
		this.camera.position.y = ndcY * 50;
	}

	updateAutoOrbit(delta: number): void {
		if (this.reducedMotion) return;
		if (this.state !== CameraState.Overview) return;
		this.time += delta * 0.0003;
		this.camera.position.x +=
			(Math.sin(this.time) * 15 - this.camera.position.x) * 0.01;
		this.camera.position.y +=
			(Math.sin(this.time * 0.7) * 30 - this.camera.position.y) * 0.01;
		this.camera.lookAt(0, 0, 0);
	}
}
