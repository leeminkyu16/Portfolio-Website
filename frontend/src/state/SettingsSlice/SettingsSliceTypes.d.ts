import { BackgroundShape } from "../../enums/background-shape";
import { Language } from "../../enums/language";

export interface SettingsSliceState {
	backgroundShape: BackgroundShape;
	showSettingsModal: boolean;
	backgroundAutoRotate: boolean;
	sectionsFade: boolean;
	language: Language;
}
