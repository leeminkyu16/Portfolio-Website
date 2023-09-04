import { Dispatch } from "redux";
import { ObjectResume } from "portfolio-website-shared";
import { setCenterViewSectionIndexAction } from "../../../store/components/center_view/center_view_actions";
import {
	setSyncResumeAction,
	setResumeAction,
} from "../../../store/components/resume/resume_actions";
import { RootState } from "../../../store/RootState";
import {
	SetResumeAction,
	SetSyncResumeAction,
} from "../../../store/components/resume/resume_actions_types";
import { SetCenterViewSectionIndexAction } from "../../../store/components/center_view/center_view_actions_types";
import { RootActions } from "../../../store/actions";

export const mapStateToProps = (state: RootState) => ({
	resume: state.resume.value,
});

export const mapDispatchToProps = (dispatch: Dispatch<RootActions>) => ({
	setResumeAction: (resumeParam: ObjectResume): SetResumeAction =>
		dispatch(setResumeAction(resumeParam)),
	setCenterViewSectionIndexAction: (sectionIndexParam: number): SetCenterViewSectionIndexAction =>
		dispatch(setCenterViewSectionIndexAction(sectionIndexParam)),
	setSyncResumeAction: (syncResumeParam: (() => void) | null): SetSyncResumeAction =>
		dispatch(setSyncResumeAction(syncResumeParam)),
});
