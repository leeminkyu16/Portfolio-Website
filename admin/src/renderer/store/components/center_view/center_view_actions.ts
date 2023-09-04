import { ActionCreator } from "redux";
import {
	SetCenterViewSectionIndexAction,
	SetCenterViewStateAction,
	SetCenterViewSubsectionIndexAction,
	SetCenterViewSubsectionTemplateIndexAction,
} from "./center_view_actions_types";
import { CenterViewState } from "./center_view_types";

export const SET_CENTER_VIEW_STATE = "SET_CENTER_VIEW_STATE";
export const SET_CENTER_VIEW_SECTION_INDEX = "SET_CENTER_VIEW_SECTION_INDEX";
export const SET_CENTER_VIEW_SUBSECTION_INDEX = "SET_CENTER_VIEW_SUBSECTION_INDEX";
export const SET_CENTER_VIEW_SUBSECTION_TEMPLATE_INDEX =
	"SET_CENTER_VIEW_SUBSECTION_TEMPLATE_INDEX";
export const SET_BEFORE_CENTER_VIEW_UPDATE = "SET_BEFORE_CENTER_VIEW_UPDATE";

export const setCenterViewStateAction: ActionCreator<SetCenterViewStateAction> = (
	centerViewStateParam: CenterViewState,
): SetCenterViewStateAction => ({
	type: SET_CENTER_VIEW_STATE,
	centerViewStateParam,
});

export const setCenterViewSectionIndexAction: ActionCreator<SetCenterViewSectionIndexAction> = (
	sectionIndexParam: number,
): SetCenterViewSectionIndexAction => ({
	type: SET_CENTER_VIEW_SECTION_INDEX,
	sectionIndexParam,
});

export const setCenterViewSubsectionIndexAction: ActionCreator<SetCenterViewSubsectionIndexAction> = (
	subsectionIndexParam: number,
): SetCenterViewSubsectionIndexAction => ({
	type: SET_CENTER_VIEW_SUBSECTION_INDEX,
	subsectionIndexParam,
});

export const setCenterViewSubsectionTemplateIndexAction: ActionCreator<SetCenterViewSubsectionTemplateIndexAction> = (
	subsectionTemplateIndexParam: number,
): SetCenterViewSubsectionTemplateIndexAction => ({
	type: SET_CENTER_VIEW_SUBSECTION_TEMPLATE_INDEX,
	subsectionTemplateIndexParam,
});
