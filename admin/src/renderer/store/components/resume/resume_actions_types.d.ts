import { Action } from "redux";
import {
	ObjectResume,
	ObjectResumeSection,
	ObjectResumeSectionData,
	ObjectResumeSubsection,
	ObjectResumeSubsectionData,
	ObjectResumeSubsectionTemplate,
} from "portfolio-website-shared";

export interface SetResumeAction extends Action<string> {
	type: "SET_RESUME";
	resumeParam: ObjectResume;
}

export interface SetResumeSectionAction extends Action<string> {
	type: "SET_RESUME_SECTION";
	resumeSectionIndexParam: number;
	resumeSectionParam: ObjectResumeSection;
}

export interface SetResumeSectionDataAction extends Action<string> {
	type: "SET_RESUME_SECTION_DATA";
	resumeSectionIndexParam: number;
	resumeSectionDataParam: ObjectResumeSectionData;
}

export interface SetResumeSubsectionAction extends Action<string> {
	type: "SET_RESUME_SUBSECTION";
	resumeSectionIndexParam: number;
	resumeSubsectionIndexParam: number;
	resumeSubsectionParam: ObjectResumeSubsection;
}

export interface SetResumeSubsectionDataAction extends Action<string> {
	type: "SET_RESUME_SUBSECTION_DATA";
	resumeSectionIndexParam: number;
	resumeSubsectionIndexParam: number;
	resumeSubsectionDataParam: ObjectResumeSubsectionData;
}

export interface SetResumeSubsectionTemplateAction extends Action<string> {
	type: "SET_RESUME_SUBSECTION_TEMPLATE";
	resumeSectionIndexParam: number;
	resumeSubsectionIndexParam: number;
	resumeSubsectionTemplateParam: ObjectResumeSubsectionTemplate;
}

export interface SetSyncResumeAction extends Action<string> {
	type: "SET_SYNC_RESUME";
	syncResumeParam: (() => void) | null;
}

export type ResumeAction =
	| SetResumeAction
	| SetResumeSectionAction
	| SetResumeSectionDataAction
	| SetResumeSubsectionAction
	| SetResumeSubsectionDataAction
	| SetResumeSubsectionTemplateAction
	| SetSyncResumeAction;
