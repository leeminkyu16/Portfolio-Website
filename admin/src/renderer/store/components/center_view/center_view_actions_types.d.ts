import { Action } from "redux";
import { CenterViewState } from "./center_view_types";

export interface SetCenterViewStateAction extends Action<string> {
	type: "SET_CENTER_VIEW_STATE";
	centerViewStateParam: CenterViewState;
}

export interface SetCenterViewSectionIndexAction extends Action<string> {
	type: "SET_CENTER_VIEW_SECTION_INDEX";
	sectionIndexParam: number;
}

export interface SetCenterViewSubsectionIndexAction extends Action<string> {
	type: "SET_CENTER_VIEW_SUBSECTION_INDEX";
	subsectionIndexParam: number;
}

export interface SetCenterViewSubsectionTemplateIndexAction extends Action<string> {
	type: "SET_CENTER_VIEW_SUBSECTION_TEMPLATE_INDEX";
	subsectionTemplateIndexParam: number;
}

export type CenterViewActions =
	| SetCenterViewStateAction
	| SetCenterViewSectionIndexAction
	| SetCenterViewSubsectionIndexAction
	| SetCenterViewSubsectionTemplateIndexAction;
