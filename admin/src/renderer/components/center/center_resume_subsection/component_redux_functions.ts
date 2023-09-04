import { Dispatch } from "redux";
import { ObjectResumeSubsectionData } from "portfolio-website-shared";
import { setCenterViewSubsectionIndexAction } from "../../../store/components/center_view/center_view_actions";
import { RootState } from "../../../store/RootState";
import { SetCenterViewSubsectionIndexAction } from "../../../store/components/center_view/center_view_actions_types";
import {
	SetResumeSubsectionDataAction,
	SetSyncResumeAction,
} from "../../../store/components/resume/resume_actions_types";
import {
	setResumeSubsectionDataAction,
	setSyncResumeAction,
} from "../../../store/components/resume/resume_actions";
import { RootActions } from "../../../store/actions";

export const mapStateToProps = (state: RootState) => ({
	resumeSubsection:
		state.resume.value[state.centerViewState.sectionIndex].data[
			state.centerViewState.subsectionIndex
		],
	resumeSectionIndex: state.centerViewState.sectionIndex,
	resumeSubsectionIndex: state.centerViewState.subsectionIndex,
});

export const mapDispatchToProps = (dispatch: Dispatch<RootActions>) => ({
	setCenterViewSubsectionIndexAction: (
		subsectionIndexParam: number,
	): SetCenterViewSubsectionIndexAction =>
		dispatch(setCenterViewSubsectionIndexAction(subsectionIndexParam)),
	setResumeSubsectionDataAction: (
		resumeSectionIndexParam: number,
		resumeSubsectionIndexParam: number,
		resumeSubsectionDataParam: ObjectResumeSubsectionData,
	): SetResumeSubsectionDataAction =>
		dispatch(
			setResumeSubsectionDataAction(
				resumeSectionIndexParam,
				resumeSubsectionIndexParam,
				resumeSubsectionDataParam,
			),
		),
	setSyncResumeAction: (syncResumeParam: (() => void) | null): SetSyncResumeAction =>
		dispatch(setSyncResumeAction(syncResumeParam)),
});
