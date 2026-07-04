import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	ObjectResumeSubsectionCardSize,
	ObjectResumeSectionData,
	ObjectResumeUniqueId,
	ObjectResumeSubsection,
} from "portfolio-website-shared";
import { CenterResumeSectionProps } from "./CenterResumeSectionProps";
import { generateUniqueId } from "../shared/functions/generate_unique_id";
import { ElementTopRightButtons } from "../shared/components/ElementTopRightButtons";
import { resumeActions } from "../../../store/components/resume/resumeSlice";
import { centerViewActions } from "../../../store/components/center_view/centerViewSlice";
import { RootState } from "../../../store/RootState";
import "./CenterResumeSection.scss";

const CenterResumeSection: FunctionComponent<CenterResumeSectionProps> = (): JSX.Element => {
	const dispatch = useDispatch();
	const resumeSectionIndex = useSelector(
		(state: RootState) => state.centerViewState.sectionIndex,
	);
	const resumeSection = useSelector(
		(state: RootState) => state.resume.value[state.centerViewState.sectionIndex],
	);

	const setResumeSectionDataState = (newResumeSectionData: ObjectResumeSectionData): void => {
		dispatch(
			resumeActions.setResumeSectionData({
				sectionIndex: resumeSectionIndex,
				sectionData: newResumeSectionData,
			}),
		);
	};

	const updateSubsection = (
		subsectionIndex: number,
		subsection: ObjectResumeSubsection,
	): void => {
		dispatch(
			resumeActions.setResumeSubsection({
				sectionIndex: resumeSectionIndex,
				subsectionIndex,
				subsection,
			}),
		);
	};

	return (
		<div className="common-page-container__div">
			<p className="common-label-header-1__p">{resumeSection.title.english}</p>

			{resumeSection.data.map(
				(
					resumeSubsection: ObjectResumeSubsection,
					subsectionIndex: number,
				): JSX.Element => (
					<div className="common-element-container__div" key={resumeSubsection.uniqueId}>
						<ElementTopRightButtons
							listState={resumeSection.data}
							setListState={setResumeSectionDataState}
							elementIndex={subsectionIndex}
						/>

						<p className="common-label__p">Unique Id:</p>
						<input
							className="common-text__input"
							type="number"
							aria-label="Unique Id"
							value={resumeSubsection.uniqueId}
							onChange={(event): void =>
								updateSubsection(subsectionIndex, {
									...resumeSubsection,
									uniqueId: parseInt(event.target.value, 10) || 0,
								})
							}
						/>

						<p className="common-label__p">Title: </p>
						<div className="common-item-container__div">
							<p className="common-label__p">English:</p>
							<input
								className="common-text__input"
								type="text"
								aria-label="Title (English)"
								value={resumeSubsection.title.english}
								onChange={(event): void =>
									updateSubsection(subsectionIndex, {
										...resumeSubsection,
										title: {
											...resumeSubsection.title,
											english: event.target.value,
										},
									})
								}
							/>

							<p className="common-label__p">Français:</p>
							<input
								className="common-text__input"
								type="text"
								aria-label="Title (French)"
								value={resumeSubsection.title.french}
								onChange={(event): void =>
									updateSubsection(subsectionIndex, {
										...resumeSubsection,
										title: {
											...resumeSubsection.title,
											french: event.target.value,
										},
									})
								}
							/>
						</div>

						<p className="common-label__p">Card Size:</p>
						<select
							className="common-dropdown__select"
							aria-label="Card Size"
							value={resumeSubsection.cardSize}
							onChange={(event): void =>
								updateSubsection(subsectionIndex, {
									...resumeSubsection,
									cardSize: event.target.value as ObjectResumeSubsectionCardSize,
								})
							}
						>
							<option value="small">Small</option>
							<option value="medium">Medium</option>
							<option value="large">Large</option>
						</select>

						<button
							className="common__button"
							type="button"
							onClick={(): void => {
								dispatch(
									centerViewActions.setSubsectionTemplateIndex(subsectionIndex),
								);
							}}
						>
							Open Template
						</button>

						<button
							className="common__button"
							type="button"
							onClick={(): void => {
								dispatch(centerViewActions.setSubsectionIndex(subsectionIndex));
							}}
						>
							Open Items
						</button>
					</div>
				),
			)}

			{resumeSection.data.length === 0 && (
				<p className="common-empty__p">No subsections yet. Add one below.</p>
			)}

			<button
				className="common__button"
				type="button"
				onClick={(): void => {
					dispatch(
						resumeActions.setResumeSectionData({
							sectionIndex: resumeSectionIndex,
							sectionData: [
								...resumeSection.data,
								{
									uniqueId: generateUniqueId(
										resumeSection.data.map(
											(
												oldResumeSubsection: ObjectResumeSubsection,
											): ObjectResumeUniqueId => oldResumeSubsection.uniqueId,
										),
									),
									title: { english: "", french: "" },
									cardSize: "medium",
									template: [],
									data: [],
								},
							],
						}),
					);
				}}
			>
				Add Resume Subsection
			</button>

			<button
				className="common__button"
				type="button"
				onClick={(): void => {
					dispatch(centerViewActions.setSectionIndex(-1));
				}}
			>
				Go Back
			</button>
		</div>
	);
};

export default CenterResumeSection;
