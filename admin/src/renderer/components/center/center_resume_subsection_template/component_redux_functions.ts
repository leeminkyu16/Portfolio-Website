import { Dispatch } from "redux";
import { ObjectResumeSubsectionTemplate } from "portfolio-website-shared";
import { RootState } from "../../../store/RootState";
import { RootActions } from "../../../store/actions";
import { SetCenterViewSubsectionTemplateIndexAction } from "../../../store/components/center_view/center_view_actions_types";
import { setCenterViewSubsectionTemplateIndexAction } from "../../../store/components/center_view/center_view_actions";
import {
	setResumeSubsectionTemplateAction,
	setSyncResumeAction,
} from "../../../store/components/resume/resume_actions";
import {
	SetResumeSubsectionTemplateAction,
	SetSyncResumeAction,
} from "../../../store/components/resume/resume_actions_types";

export const mapStateToProps = (state: RootState) => ({
	resumeSubsection:
		state.resume.value[state.centerViewState.sectionIndex].data[
			state.centerViewState.subsectionTemplateIndex
		],
	resumeSectionIndex: state.centerViewState.sectionIndex,
	resumeSubsectionIndex: state.centerViewState.subsectionTemplateIndex,
});

export const mapDispatchToProps = (dispatch: Dispatch<RootActions>) => ({
	setCenterViewSubsectionTemplateIndexAction: (
		subsectionTemplateIndexParam: number,
	): SetCenterViewSubsectionTemplateIndexAction =>
		dispatch(setCenterViewSubsectionTemplateIndexAction(subsectionTemplateIndexParam)),
	setResumeSubsectionTemplateAction: (
		resumeSectionIndexParam: number,
		resumeSubsectionIndexParam: number,
		resumeSubsectionTemplateParam: ObjectResumeSubsectionTemplate,
	): SetResumeSubsectionTemplateAction =>
		dispatch(
			setResumeSubsectionTemplateAction(
				resumeSectionIndexParam,
				resumeSubsectionIndexParam,
				resumeSubsectionTemplateParam,
			),
		),
	setSyncResumeAction: (syncResumeParam: (() => void) | null): SetSyncResumeAction =>
		dispatch(setSyncResumeAction(syncResumeParam)),
});
