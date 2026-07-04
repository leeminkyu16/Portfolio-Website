import TWEEN from "@tweenjs/tween.js";
import { ListResume } from "portfolio-website-shared";
import { CameraController } from "./scene/CameraController";
import { ClusterManager } from "./scene/ClusterManager";
import { GalaxyScene } from "./scene/GalaxyScene";
import { InteractionManager } from "./scene/InteractionManager";
import { Skybox } from "./scene/Skybox";
import { StarField } from "./scene/StarField";
import { StarManager } from "./scene/StarManager";
import { tweenGroup } from "./scene/tweens";
import { HudController } from "./ui/HudController";
import { PanelController } from "./ui/PanelController";
import { SidebarController } from "./ui/SidebarController";

function runEntryAnimation(
	galaxyScene: GalaxyScene,
	starField: StarField,
	clusterManager: ClusterManager,
): number[] {
	// Camera drifts from z=4000 to resting z=3000
	galaxyScene.camera.position.z = 4000;
	new TWEEN.Tween(galaxyScene.camera.position, tweenGroup)
		.to({ z: 3000 }, 2200)
		.easing(TWEEN.Easing.Cubic.Out)
		.start();

	// Stars fade in over 2s
	starField.setOpacity(0);
	const starProxy = { opacity: 0 };
	new TWEEN.Tween(starProxy, tweenGroup)
		.to({ opacity: 1 }, 2000)
		.onUpdate(() => starField.setOpacity(starProxy.opacity))
		.start();

	// Clusters bloom with 200ms stagger
	const handles: number[] = [];
	clusterManager.getClusters().forEach((cluster, i) => {
		cluster.nebulaMesh.visible = false;
		handles.push(
			window.setTimeout(() => {
				cluster.nebulaMesh.visible = true;
			}, i * 200),
		);
	});
	return handles;
}

export function init(): () => void {
	const mountEl = document.getElementById("galaxy-canvas-wrapper");
	const dataEl = document.getElementById("galaxy-resume-data");

	if (!mountEl || !dataEl) {
		console.error("[galaxy] Missing mount or data element");
		return (): void => undefined;
	}

	let resumeData: ListResume;
	try {
		resumeData = JSON.parse(dataEl.textContent ?? "[]") as ListResume;
	} catch {
		console.error("[galaxy] Failed to parse resume JSON");
		return (): void => undefined;
	}

	const galaxyScene = new GalaxyScene(mountEl);
	const skybox = new Skybox(galaxyScene);
	const starField = new StarField(galaxyScene);
	const clusterManager = new ClusterManager(galaxyScene, resumeData);
	const starManager = new StarManager(
		galaxyScene,
		clusterManager,
		resumeData,
	);
	const cameraController = new CameraController(galaxyScene.camera);
	const panelController = new PanelController();
	const hudController = new HudController();
	const sidebarController = new SidebarController();
	const interaction = new InteractionManager(
		galaxyScene,
		clusterManager,
		starManager,
		cameraController,
		panelController,
		hudController,
		sidebarController,
	);

	skybox.build();
	starField.build();
	clusterManager.build();
	starManager.build();
	interaction.attach();

	document.getElementById("galaxy-loading")?.remove();
	hudController.showHint("Click or tap a cluster to explore");
	sidebarController.showClusterList();
	galaxyScene.start();
	const entryTimers = runEntryAnimation(
		galaxyScene,
		starField,
		clusterManager,
	);

	return () => {
		tweenGroup.removeAll();
		entryTimers.forEach((id) => window.clearTimeout(id));
		interaction.detach();
		galaxyScene.stop();
	};
}
