import { ListResume } from "portfolio-website-shared";
import { PanelController } from "../galaxy/ui/PanelController";
import { isCompactViewport, prefersReducedMotion } from "../galaxy/util/device";
import { buildStarField } from "./data/star-layout";
import { ParallaxController } from "./scene/ParallaxController";
import { StarInteraction } from "./scene/StarInteraction";
import { StarSky } from "./scene/StarSky";

// Mirror of galaxy/index.ts: dynamically imported from the /stars page in a
// useEffect so this (and the canvas renderer) stay out of the SSR bundle.
// Returns a cleanup that tears everything down on unmount.
export function init(): () => void {
	const canvas = document.getElementById(
		"stars-canvas",
	) as HTMLCanvasElement | null;
	const dataEl = document.getElementById("stars-resume-data");

	if (!canvas || !dataEl) {
		console.error("[stars] Missing canvas or data element");
		return (): void => undefined;
	}

	let resumeData: ListResume;
	try {
		resumeData = JSON.parse(dataEl.textContent ?? "[]") as ListResume;
	} catch {
		console.error("[stars] Failed to parse resume JSON");
		return (): void => undefined;
	}

	const field = buildStarField(resumeData);
	const parallax = new ParallaxController();
	const sky = new StarSky(canvas, field, {
		compact: isCompactViewport(),
		reducedMotion: prefersReducedMotion(),
		parallax,
	});
	const panel = new PanelController();
	const interaction = new StarInteraction(canvas, sky, panel, field.stars);

	sky.build();
	parallax.attach();
	interaction.attach();
	sky.start();

	document.getElementById("stars-loading")?.remove();

	const onResize = (): void => sky.resize();
	window.addEventListener("resize", onResize);

	return () => {
		window.removeEventListener("resize", onResize);
		interaction.detach();
		parallax.detach();
		sky.stop();
	};
}
