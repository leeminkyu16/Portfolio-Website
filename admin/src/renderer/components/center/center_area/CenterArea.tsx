import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import CenterResume from "../center_resume/CenterResume";
import CenterResumeSection from "../center_resume_section/CenterResumeSection";
import { CenterAreaProps } from "./CenterAreaProps";
import { mapDispatchToProps, mapStateToProps } from "./component_redux_functions";
import CenterResumeSubsection from "../center_resume_subsection/CenterResumeSubsection";
import CenterResumeSubsectionTemplate from "../center_resume_subsection_template/CenterResumeSubsectionTemplate";
import "./CenterArea.scss";

const CenterArea: FunctionComponent<CenterAreaProps> = (props: CenterAreaProps): JSX.Element => {
	if (props.centerViewState.sectionIndex >= 0) {
		if (props.centerViewState.subsectionIndex >= 0) {
			return <CenterResumeSubsection />;
		}
		if (props.centerViewState.subsectionTemplateIndex >= 0) {
			return <CenterResumeSubsectionTemplate />;
		}

		return <CenterResumeSection />;
	}
	return <CenterResume />;
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterArea);
