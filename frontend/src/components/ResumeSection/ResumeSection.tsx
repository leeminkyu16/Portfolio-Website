import React from "react";

import { resumeArray } from "portfolio-website-shared";
import { RootState } from "../../state";
import { SettingsSliceState } from "../../state/SettingsSlice/SettingsSliceTypes";
import { useAppSelector } from "../../state/hooks";
import { FadeInSection } from "../FadeInSection/FadeInSection";
import { ResumeCard } from "../ResumeCard/ResumeCard";
import "./ResumeSection.scss";

const ResumeSection: React.FunctionComponent = (): JSX.Element => {
	const settingsState: SettingsSliceState = useAppSelector(
		(storeState: RootState): SettingsSliceState => {
			return storeState.settings;
		},
	);
	const languageIndex = 0;

	return (
		<>
			<FadeInSection fadeToggle={settingsState.sectionsFade}>
				{resumeArray &&
					resumeArray.map((resumeSection) => {
						return (
							<div
								className="resume-section"
								key={`resume-${resumeSection[0]}`}
								id={`resume-${resumeSection[0]}`}
							>
								<h1 className="resume-section__title-1">
									{resumeSection[1][languageIndex]}
								</h1>
								{resumeSection[2] &&
									resumeSection[2].map((resumeSubsection) => {
										return (
											<div
												className="resume-subsection"
												key={`resume-${resumeSection[0]}-${resumeSubsection[0]}`}
												id={`resume-${resumeSection[0]}-${resumeSubsection[0]}`}
											>
												{resumeSubsection[1][
													languageIndex
												] !== "" && (
													<h2 className="resume-section__title-2">
														{
															resumeSubsection[1][
																languageIndex
															]
														}
													</h2>
												)}
												<section
													className={`main-section--${resumeSubsection[2]}`}
												>
													{resumeSubsection[4] &&
														resumeSubsection[4].map(
															(resumeElement) => {
																return (
																	<ResumeCard
																		key={`resume-${resumeSection[0]}-${resumeSubsection[0]}-${resumeElement[0]}`}
																		keyId={`${resumeSection[0]}-${resumeSubsection[0]}-${resumeElement[0]}`}
																		template={
																			resumeSubsection[3]
																		}
																		data={
																			resumeElement
																		}
																	/>
																);
															},
														)}
												</section>
											</div>
										);
									})}
							</div>
						);
					})}
			</FadeInSection>
		</>
	);
};

export { ResumeSection };
