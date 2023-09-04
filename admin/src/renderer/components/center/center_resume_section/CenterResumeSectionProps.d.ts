import { ReactNode } from "react";
import { ObjectResumeSection, ObjectResumeSectionData } from "portfolio-website-shared";
import {
	SetCenterViewSectionIndexAction,
	SetCenterViewSubsectionIndexAction,
	SetCenterViewSubsectionTemplateIndexAction,
} from "../../../store/components/center_view/center_view_actions_types";
import {
	SetResumeSectionDataAction,
	SetSyncResumeAction,
} from "../../../store/components/resume/resume_actions_types";

export interface CenterResumeSectionProps {
	resumeSection: ObjectResumeSection;
	resumeSectionIndex: number;
	setCenterViewSectionIndexAction: (sectionIndexParam: number) => SetCenterViewSectionIndexAction;
	setCenterViewSubsectionIndexAction: (
		subsectionIndexParam: number,
	) => SetCenterViewSubsectionIndexAction;
	setCenterViewSubsectionTemplateIndexAction: (
		subsectionTemplateIndexParam: number,
	) => SetCenterViewSubsectionTemplateIndexAction;
	setResumeSectionDataAction: (
		resumeSectionIndexParam: number,
		resumeSectionDataParam: ObjectResumeSectionData,
	) => SetResumeSectionDataAction;
	setSyncResumeAction: (syncResumeParam: (() => void) | null) => SetSyncResumeAction;
	children?: ReactNode;
}
