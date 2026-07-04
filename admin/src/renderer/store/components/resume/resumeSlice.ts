import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	resumeArray,
	listToObjectResume,
	ObjectResume,
	ObjectResumeSection,
	ObjectResumeSectionData,
	ObjectResumeSubsection,
	ObjectResumeSubsectionData,
	ObjectResumeSubsectionTemplate,
} from "portfolio-website-shared";

export interface ResumeState {
	readonly value: ObjectResume;
}

const initialState: ResumeState = {
	value: listToObjectResume(resumeArray),
};

const resumeSlice = createSlice({
	name: "resume",
	initialState,
	reducers: {
		setResume: (state, action: PayloadAction<ObjectResume>): ResumeState => ({
			...state,
			value: action.payload,
		}),
		setResumeSection: (
			state,
			action: PayloadAction<{ sectionIndex: number; section: ObjectResumeSection }>,
		): ResumeState => ({
			...state,
			value: state.value.map(
				(section: ObjectResumeSection, index: number): ObjectResumeSection =>
					index === action.payload.sectionIndex ? action.payload.section : section,
			),
		}),
		setResumeSectionData: (
			state,
			action: PayloadAction<{ sectionIndex: number; sectionData: ObjectResumeSectionData }>,
		): ResumeState => ({
			...state,
			value: state.value.map(
				(section: ObjectResumeSection, index: number): ObjectResumeSection =>
					index === action.payload.sectionIndex
						? { ...section, data: action.payload.sectionData }
						: section,
			),
		}),
		setResumeSubsection: (
			state,
			action: PayloadAction<{
				sectionIndex: number;
				subsectionIndex: number;
				subsection: ObjectResumeSubsection;
			}>,
		): ResumeState => ({
			...state,
			value: state.value.map(
				(section: ObjectResumeSection, index: number): ObjectResumeSection =>
					index === action.payload.sectionIndex
						? {
								...section,
								data: section.data.map(
									(
										subsection: ObjectResumeSubsection,
										subIndex: number,
									): ObjectResumeSubsection =>
										subIndex === action.payload.subsectionIndex
											? action.payload.subsection
											: subsection,
								),
							}
						: section,
			),
		}),
		setResumeSubsectionData: (
			state,
			action: PayloadAction<{
				sectionIndex: number;
				subsectionIndex: number;
				subsectionData: ObjectResumeSubsectionData;
			}>,
		): ResumeState => ({
			...state,
			value: state.value.map(
				(section: ObjectResumeSection, index: number): ObjectResumeSection =>
					index === action.payload.sectionIndex
						? {
								...section,
								data: section.data.map(
									(
										subsection: ObjectResumeSubsection,
										subIndex: number,
									): ObjectResumeSubsection =>
										subIndex === action.payload.subsectionIndex
											? { ...subsection, data: action.payload.subsectionData }
											: subsection,
								),
							}
						: section,
			),
		}),
		setResumeSubsectionTemplate: (
			state,
			action: PayloadAction<{
				sectionIndex: number;
				subsectionIndex: number;
				template: ObjectResumeSubsectionTemplate;
			}>,
		): ResumeState => ({
			...state,
			value: state.value.map(
				(section: ObjectResumeSection, index: number): ObjectResumeSection =>
					index === action.payload.sectionIndex
						? {
								...section,
								data: section.data.map(
									(
										subsection: ObjectResumeSubsection,
										subIndex: number,
									): ObjectResumeSubsection =>
										subIndex === action.payload.subsectionIndex
											? { ...subsection, template: action.payload.template }
											: subsection,
								),
							}
						: section,
			),
		}),
	},
});

export const resumeActions = resumeSlice.actions;
export const resumeReducer = resumeSlice.reducer;
