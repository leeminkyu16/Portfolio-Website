import { ReactNode } from "react";
import { ObjectResume } from "portfolio-website-shared";
import {
	SetResumeAction,
	SetSyncResumeAction,
} from "../../../store/components/resume/resume_actions_types";
import { SetCenterViewSectionIndexAction } from "../../../store/components/center_view/center_view_actions_types";

export interface CenterResumeProps {
	resume: ObjectResume;
	setResumeAction: (resumeParam: ObjectResume) => SetResumeAction;
	setCenterViewSectionIndexAction: (sectionIndexParam: number) => SetCenterViewSectionIndexAction;
	setSyncResumeAction: (syncResumeParam: (() => void) | null) => SetSyncResumeAction;
	children?: ReactNode;
}
