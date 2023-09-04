import { Dispatch } from "redux";
import { setCenterViewStateAction } from "../../store/components/center_view/center_view_actions";
import { RootState } from "../../store/RootState";
import {
	CenterViewActions,
	SetCenterViewStateAction,
} from "../../store/components/center_view/center_view_actions_types";
import { CenterViewState } from "../../store/components/center_view/center_view_types";

export const mapStateToProps = (state: RootState) => ({
	objectResume: state.resume.value,
	syncResume: state.resume.syncResume,
});

export const mapDispatchToProps = (dispatch: Dispatch<CenterViewActions>) => ({
	setCenterViewStateAction: (centerViewStateParam: CenterViewState): SetCenterViewStateAction =>
		dispatch(setCenterViewStateAction(centerViewStateParam)),
});
