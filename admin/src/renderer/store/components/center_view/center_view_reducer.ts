import { Reducer } from "redux";
import {
	SET_CENTER_VIEW_STATE,
	SET_CENTER_VIEW_SUBSECTION_INDEX,
	SET_CENTER_VIEW_SECTION_INDEX,
	SET_CENTER_VIEW_SUBSECTION_TEMPLATE_INDEX,
	SET_BEFORE_CENTER_VIEW_UPDATE,
} from "./center_view_actions";
import { CenterViewActions } from "./center_view_actions_types";
import { CenterViewState } from "./center_view_types";

const defaultState: CenterViewState = {
	sectionIndex: -1,
	subsectionIndex: -1,
	subsectionTemplateIndex: -1,
};

export const centerViewReducer: Reducer<CenterViewState, CenterViewActions> = (
	// eslint-disable-next-line default-param-last
	state: CenterViewState | undefined = defaultState,
	action: CenterViewActions,
): CenterViewState => {
	switch (action.type) {
		case SET_CENTER_VIEW_STATE:
			return action.centerViewStateParam;
		case SET_CENTER_VIEW_SECTION_INDEX:
			return {
				...state,
				sectionIndex: action.sectionIndexParam,
			};
		case SET_CENTER_VIEW_SUBSECTION_INDEX:
			return {
				...state,
				subsectionIndex: action.subsectionIndexParam,
			};
		case SET_CENTER_VIEW_SUBSECTION_TEMPLATE_INDEX:
			return {
				...state,
				subsectionTemplateIndex: action.subsectionTemplateIndexParam,
			};
		default:
			return state;
	}
};
