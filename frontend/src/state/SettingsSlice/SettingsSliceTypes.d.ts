import { BackgroundShape } from "../../enums/background-shape";

export interface SettingsSliceState {
	backgroundShape: BackgroundShape;
	showSettingsModal: boolean;
	backgroundAutoRotate: boolean;
	sectionsFade: boolean;
}
