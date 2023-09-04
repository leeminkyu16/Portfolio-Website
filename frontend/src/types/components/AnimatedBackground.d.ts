import { BackgroundShape } from "../../enums/background-shape";

const { SPHERE, HELIX, GRID } = BackgroundShape;

export type AnimatedBackgroundTargets = {
	[SPHERE]: CSS3DObject[];
	[HELIX]: CSS3DObject[];
	[GRID]: CSS3DObject[];
};
