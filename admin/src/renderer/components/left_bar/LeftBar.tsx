import React, { FunctionComponent } from "react";
import { connect, useSelector } from "react-redux";
import { ObjectResumeSection } from "portfolio-website-shared/src/types/object_resume/ObjectResumeSection";
import { ObjectResumeSubsection } from "portfolio-website-shared/src/types/object_resume/ObjectResumeSubsection";
import { ResumeState } from "../../store/components/resume/resume_reducer";
import { LeftBarProps } from "./LeftBarProps";
import { RootState } from "../../store/RootState";
import { mapDispatchToProps, mapStateToProps } from "./component_redux_functions";
import "./LeftBar.scss";

const LeftBar: FunctionComponent<LeftBarProps> = (props: LeftBarProps): JSX.Element => {
	const resumeState: ResumeState = useSelector((state: RootState): ResumeState => state.resume);

	return (
		<div className="left-bar-main__div">
			<button
				className="resume-text__button"
				onClick={(): void => {
					if (props.syncResume !== null) {
						props.syncResume();
					}

					props.setCenterViewStateAction({
						sectionIndex: -1,
						subsectionIndex: -1,
						subsectionTemplateIndex: -1,
					});
				}}
			>
				Resume
			</button>

			{resumeState.value.map(
				(resumeSection: ObjectResumeSection, resumeSectionIndex: number): JSX.Element => (
					<div key={`resume-${resumeSection.uniqueId}`}>
						<button
							className="section-text__button"
							onClick={(): void => {
								if (props.syncResume !== null) {
									props.syncResume();
								}

								props.setCenterViewStateAction({
									sectionIndex: resumeSectionIndex,
									subsectionIndex: -1,
									subsectionTemplateIndex: -1,
								});
							}}
						>
							{resumeSection.title.english}
						</button>
						{resumeSection.data.map(
							(
								resumeSubsection: ObjectResumeSubsection,
								resumeSubsectionIndex: number,
							): JSX.Element => {
								return (
									<div
										key={`resume-${resumeSection.uniqueId}-${resumeSubsection.uniqueId}`}
									>
										<button
											className="subsection-text__button"
											onClick={(): void => {
												if (props.syncResume !== null) {
													props.syncResume();
												}

												props.setCenterViewStateAction({
													sectionIndex: resumeSectionIndex,
													subsectionIndex: resumeSubsectionIndex,
													subsectionTemplateIndex: -1,
												});
											}}
										>
											{resumeSubsection.title.english}
										</button>
									</div>
								);
							},
						)}
					</div>
				),
			)}
			<button
				className="common__button"
				onClick={(): void => {
					if (props.syncResume !== null) {
						props.syncResume();
					}

					window
						.require("electron")
						.ipcRenderer.send("create-list-resume-files", props.objectResume);
				}}
			>
				Export Resume
			</button>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);
