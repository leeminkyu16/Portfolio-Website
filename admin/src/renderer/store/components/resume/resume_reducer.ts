import { Reducer } from "redux";

import {
	resumeArray,
	listToObjectResume,
	ObjectResume,
	ObjectResumeSection,
	ObjectResumeSubsection,
} from "portfolio-website-shared";
import {
	SET_RESUME,
	SET_RESUME_SECTION,
	SET_RESUME_SECTION_DATA,
	SET_RESUME_SUBSECTION,
	SET_RESUME_SUBSECTION_DATA,
	SET_RESUME_SUBSECTION_TEMPLATE,
	SET_SYNC_RESUME,
} from "./resume_actions";
import { ResumeAction } from "./resume_actions_types";

export interface ResumeState {
	readonly value: ObjectResume;
	readonly syncResume: (() => void) | null;
}

const defaultState: ResumeState = {
	value: listToObjectResume(resumeArray),
	syncResume: null,
};

export const resumeReducer: Reducer<ResumeState, ResumeAction> = (
	// eslint-disable-next-line default-param-last
	state: ResumeState = defaultState,
	action: ResumeAction,
): ResumeState => {
	switch (action.type) {
		case SET_RESUME:
			return {
				...state,
				value: action.resumeParam,
			};
		case SET_RESUME_SECTION:
			return {
				...state,
				value: state.value.map(
					(
						resumeSection: ObjectResumeSection,
						resumeSectionIndex: number,
					): ObjectResumeSection => {
						if (resumeSectionIndex === action.resumeSectionIndexParam) {
							return action.resumeSectionParam;
						}
						return resumeSection;
					},
				),
			};
		case SET_RESUME_SECTION_DATA:
			return {
				...state,
				value: state.value.map(
					(
						resumeSection: ObjectResumeSection,
						resumeSectionIndex: number,
					): ObjectResumeSection => {
						if (resumeSectionIndex === action.resumeSectionIndexParam) {
							return {
								...resumeSection,
								data: action.resumeSectionDataParam,
							};
						}
						return resumeSection;
					},
				),
			};
		case SET_RESUME_SUBSECTION:
			return {
				...state,
				value: state.value.map(
					(
						resumeSection: ObjectResumeSection,
						resumeSectionIndex: number,
					): ObjectResumeSection => {
						if (resumeSectionIndex === action.resumeSectionIndexParam) {
							return {
								...resumeSection,
								data: resumeSection.data.map(
									(
										resumeSubsection: ObjectResumeSubsection,
										resumeSubsectionIndex: number,
									): ObjectResumeSubsection => {
										if (
											resumeSubsectionIndex ===
											action.resumeSubsectionIndexParam
										) {
											return action.resumeSubsectionParam;
										}
										return resumeSubsection;
									},
								),
							};
						}
						return resumeSection;
					},
				),
			};
		case SET_RESUME_SUBSECTION_DATA:
			return {
				...state,
				value: state.value.map(
					(
						resumeSection: ObjectResumeSection,
						resumeSectionIndex: number,
					): ObjectResumeSection => {
						if (resumeSectionIndex === action.resumeSectionIndexParam) {
							return {
								...resumeSection,
								data: resumeSection.data.map(
									(
										resumeSubsection: ObjectResumeSubsection,
										resumeSubsectionIndex: number,
									): ObjectResumeSubsection => {
										if (
											resumeSubsectionIndex ===
											action.resumeSubsectionIndexParam
										) {
											return {
												...resumeSubsection,
												data: action.resumeSubsectionDataParam,
											};
										}
										return resumeSubsection;
									},
								),
							};
						}
						return resumeSection;
					},
				),
			};
		case SET_RESUME_SUBSECTION_TEMPLATE:
			return {
				...state,
				value: state.value.map(
					(
						resumeSection: ObjectResumeSection,
						resumeSectionIndex: number,
					): ObjectResumeSection => {
						if (resumeSectionIndex === action.resumeSectionIndexParam) {
							return {
								...resumeSection,
								data: resumeSection.data.map(
									(
										resumeSubsection: ObjectResumeSubsection,
										resumeSubsectionIndex: number,
									): ObjectResumeSubsection => {
										if (
											resumeSubsectionIndex ===
											action.resumeSubsectionIndexParam
										) {
											return {
												...resumeSubsection,
												template: action.resumeSubsectionTemplateParam,
											};
										}
										return resumeSubsection;
									},
								),
							};
						}
						return resumeSection;
					},
				),
			};
		case SET_SYNC_RESUME:
			return {
				...state,
				syncResume: action.syncResumeParam,
			};
		default:
			return state;
	}
};
