import { ReactNode } from "react";
import { ObjectResumeSubsection, ObjectResumeSubsectionData } from "portfolio-website-shared";
import { SetCenterViewSubsectionIndexAction } from "../../../store/components/center_view/center_view_actions_types";
import {
	SetResumeSubsectionDataAction,
	SetSyncResumeAction,
} from "../../../store/components/resume/resume_actions_types";

export interface CenterResumeSubsectionProps {
	resumeSubsection: ObjectResumeSubsection;
	resumeSectionIndex: number;
	resumeSubsectionIndex: number;
	setCenterViewSubsectionIndexAction: (
		subsectionIndexParam: number,
	) => SetCenterViewSubsectionIndexAction;
	setResumeSubsectionDataAction: (
		resumeSectionIndexParam: number,
		resumeSubsectionIndexParam: number,
		resumeSubsectionDataParam: ObjectResumeSubsectionData,
	) => SetResumeSubsectionDataAction;
	setSyncResumeAction: (syncResumeParam: (() => void) | null) => SetSyncResumeAction;
	children?: ReactNode;
}
