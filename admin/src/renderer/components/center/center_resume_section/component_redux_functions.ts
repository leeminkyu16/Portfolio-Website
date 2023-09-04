import { Dispatch } from "redux";
import { ObjectResumeSectionData } from "portfolio-website-shared";
import { RootState } from "../../../store/RootState";
import {
	setCenterViewSectionIndexAction,
	setCenterViewSubsectionIndexAction,
	setCenterViewSubsectionTemplateIndexAction,
} from "../../../store/components/center_view/center_view_actions";
import {
	SetCenterViewSectionIndexAction,
	SetCenterViewSubsectionIndexAction,
	SetCenterViewSubsectionTemplateIndexAction,
} from "../../../store/components/center_view/center_view_actions_types";
import { RootActions } from "../../../store/actions";
import {
	SetResumeSectionDataAction,
	SetSyncResumeAction,
} from "../../../store/components/resume/resume_actions_types";
import {
	setResumeSectionDataAction,
	setSyncResumeAction,
} from "../../../store/components/resume/resume_actions";

export const mapStateToProps = (state: RootState) => ({
	resumeSection: state.resume.value[state.centerViewState.sectionIndex],
	resumeSectionIndex: state.centerViewState.sectionIndex,
});

export const mapDispatchToProps = (dispatch: Dispatch<RootActions>) => ({
	setCenterViewSectionIndexAction: (sectionIndexParam: number): SetCenterViewSectionIndexAction =>
		dispatch(setCenterViewSectionIndexAction(sectionIndexParam)),
	setCenterViewSubsectionIndexAction: (
		subsectionIndexParam: number,
	): SetCenterViewSubsectionIndexAction =>
		dispatch(setCenterViewSubsectionIndexAction(subsectionIndexParam)),
	setCenterViewSubsectionTemplateIndexAction: (
		subsectionTemplateIndexParam: number,
	): SetCenterViewSubsectionTemplateIndexAction =>
		dispatch(setCenterViewSubsectionTemplateIndexAction(subsectionTemplateIndexParam)),
	setResumeSectionDataAction: (
		resumeSectionIndexParam: number,
		resumeSectionDataParam: ObjectResumeSectionData,
	): SetResumeSectionDataAction =>
		dispatch(setResumeSectionDataAction(resumeSectionIndexParam, resumeSectionDataParam)),
	setSyncResumeAction: (syncResumeParam: (() => void) | null): SetSyncResumeAction =>
		dispatch(setSyncResumeAction(syncResumeParam)),
});
