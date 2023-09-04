import { ReactNode } from "react";
import { ObjectResumeSubsection, ObjectResumeSubsectionTemplate } from "portfolio-website-shared";
import { SetCenterViewSubsectionTemplateIndexAction } from "../../../store/components/center_view/center_view_actions_types";
import {
	SetResumeSubsectionTemplateAction,
	SetSyncResumeAction,
} from "../../../store/components/resume/resume_actions_types";

export interface CenterResumeSubsectionTemplateProps {
	resumeSubsection: ObjectResumeSubsection;
	resumeSectionIndex: number;
	resumeSubsectionIndex: number;
	setCenterViewSubsectionTemplateIndexAction: (
		subsectionTemplateIndexParam: number,
	) => SetCenterViewSubsectionTemplateIndexAction;
	setResumeSubsectionTemplateAction: (
		resumeSectionIndexParam: number,
		resumeSubsectionIndexParam: number,
		resumeSubsectionTemplateParam: ObjectResumeSubsectionTemplate,
	) => SetResumeSubsectionTemplateAction;
	setSyncResumeAction: (syncResumeParam: (() => void) | null) => SetSyncResumeAction;
	children?: ReactNode;
}
