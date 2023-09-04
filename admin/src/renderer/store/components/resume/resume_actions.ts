import {
	ObjectResume,
	ObjectResumeSection,
	ObjectResumeSectionData,
	ObjectResumeSubsection,
	ObjectResumeSubsectionData,
	ObjectResumeSubsectionTemplate,
} from "portfolio-website-shared";
import { ActionCreator } from "redux";
import {
	SetResumeAction,
	SetResumeSectionAction,
	SetResumeSectionDataAction,
	SetResumeSubsectionAction,
	SetResumeSubsectionDataAction,
	SetResumeSubsectionTemplateAction,
	SetSyncResumeAction,
} from "./resume_actions_types";

export const SET_RESUME = "SET_RESUME";
export const SET_RESUME_SECTION = "SET_RESUME_SECTION";
export const SET_RESUME_SECTION_DATA = "SET_RESUME_SECTION_DATA";
export const SET_RESUME_SUBSECTION = "SET_RESUME_SUBSECTION";
export const SET_RESUME_SUBSECTION_DATA = "SET_RESUME_SUBSECTION_DATA";
export const SET_RESUME_SUBSECTION_TEMPLATE = "SET_RESUME_SUBSECTION_TEMPLATE";
export const SET_SYNC_RESUME = "SET_SYNC_RESUME";

export const setResumeAction: ActionCreator<SetResumeAction> = (
	resumeParam: ObjectResume,
): SetResumeAction => ({
	type: SET_RESUME,
	resumeParam,
});

export const setResumeSectionAction: ActionCreator<SetResumeSectionAction> = (
	resumeSectionIndexParam: number,
	resumeSectionParam: ObjectResumeSection,
): SetResumeSectionAction => ({
	type: SET_RESUME_SECTION,
	resumeSectionIndexParam,
	resumeSectionParam,
});

export const setResumeSectionDataAction: ActionCreator<SetResumeSectionDataAction> = (
	resumeSectionIndexParam: number,
	resumeSectionDataParam: ObjectResumeSectionData,
): SetResumeSectionDataAction => ({
	type: SET_RESUME_SECTION_DATA,
	resumeSectionIndexParam,
	resumeSectionDataParam,
});

export const setResumeSubsectionAction: ActionCreator<SetResumeSubsectionAction> = (
	resumeSectionIndexParam: number,
	resumeSubsectionIndexParam: number,
	resumeSubsectionParam: ObjectResumeSubsection,
): SetResumeSubsectionAction => ({
	type: SET_RESUME_SUBSECTION,
	resumeSectionIndexParam,
	resumeSubsectionIndexParam,
	resumeSubsectionParam,
});

export const setResumeSubsectionDataAction: ActionCreator<SetResumeSubsectionDataAction> = (
	resumeSectionIndexParam: number,
	resumeSubsectionIndexParam: number,
	resumeSubsectionDataParam: ObjectResumeSubsectionData,
): SetResumeSubsectionDataAction => ({
	type: SET_RESUME_SUBSECTION_DATA,
	resumeSectionIndexParam,
	resumeSubsectionIndexParam,
	resumeSubsectionDataParam,
});

export const setResumeSubsectionTemplateAction: ActionCreator<SetResumeSubsectionTemplateAction> = (
	resumeSectionIndexParam: number,
	resumeSubsectionIndexParam: number,
	resumeSubsectionTemplateParam: ObjectResumeSubsectionTemplate,
): SetResumeSubsectionTemplateAction => ({
	type: SET_RESUME_SUBSECTION_TEMPLATE,
	resumeSectionIndexParam,
	resumeSubsectionIndexParam,
	resumeSubsectionTemplateParam,
});

export const setSyncResumeAction: ActionCreator<SetSyncResumeAction> = (
	syncResumeParam: (() => void) | null,
): SetSyncResumeAction => ({
	type: SET_SYNC_RESUME,
	syncResumeParam,
});
