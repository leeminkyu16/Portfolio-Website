import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import CenterResume from "../center_resume/CenterResume";
import CenterResumeSection from "../center_resume_section/CenterResumeSection";
import { CenterAreaProps } from "./CenterAreaProps";
import CenterResumeSubsection from "../center_resume_subsection/CenterResumeSubsection";
import CenterResumeSubsectionTemplate from "../center_resume_subsection_template/CenterResumeSubsectionTemplate";
import { RootState } from "../../../store/RootState";
import "./CenterArea.scss";

const CenterArea: FunctionComponent<CenterAreaProps> = (): JSX.Element => {
	const centerViewState = useSelector((state: RootState) => state.centerViewState);
	const resume = useSelector((state: RootState) => state.resume.value);

	// Guard against stale indices (e.g. after loading a smaller resume) so a view
	// pointing past the end of the current data degrades to a valid parent view
	// instead of indexing into `undefined` and crashing the renderer.
	const section =
		centerViewState.sectionIndex >= 0 ? resume[centerViewState.sectionIndex] : undefined;

	if (section !== undefined) {
		if (centerViewState.subsectionIndex >= 0) {
			if (section.data[centerViewState.subsectionIndex] !== undefined) {
				return <CenterResumeSubsection />;
			}
			return <CenterResumeSection />;
		}
		if (centerViewState.subsectionTemplateIndex >= 0) {
			if (section.data[centerViewState.subsectionTemplateIndex] !== undefined) {
				return <CenterResumeSubsectionTemplate />;
			}
			return <CenterResumeSection />;
		}

		return <CenterResumeSection />;
	}
	return <CenterResume />;
};

export default CenterArea;
