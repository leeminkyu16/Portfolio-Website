import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ObjectResumeUniqueId, ObjectResumeSection } from "portfolio-website-shared";
import { CenterResumeProps } from "./CenterResumeProps";
import { generateUniqueId } from "../shared/functions/generate_unique_id";
import { ElementTopRightButtons } from "../shared/components/ElementTopRightButtons";
import { resumeActions } from "../../../store/components/resume/resumeSlice";
import { centerViewActions } from "../../../store/components/center_view/centerViewSlice";
import { RootState } from "../../../store/RootState";
import "./CenterResume.scss";

const CenterResume: FunctionComponent<CenterResumeProps> = (): JSX.Element => {
	const dispatch = useDispatch();
	const resume = useSelector((state: RootState) => state.resume.value);

	const updateSection = (sectionIndex: number, section: ObjectResumeSection): void => {
		dispatch(resumeActions.setResumeSection({ sectionIndex, section }));
	};

	return (
		<div className="common-page-container__div">
			{resume.map((resumeSection: ObjectResumeSection, sectionIndex: number): JSX.Element => (
				<div
					className="common-element-container__div"
					key={`resume-${resumeSection.uniqueId}`}
				>
					<ElementTopRightButtons
						listState={resume}
						setListState={(newResume) => dispatch(resumeActions.setResume(newResume))}
						elementIndex={sectionIndex}
					/>

					<p className="common-label__p">Unique Id:</p>

					<input
						className="common-text__input"
						type="number"
						aria-label="Unique Id"
						value={resumeSection.uniqueId}
						onChange={(event): void =>
							updateSection(sectionIndex, {
								...resumeSection,
								uniqueId: parseInt(event.target.value, 10) || 0,
							})
						}
					/>

					<p className="common-label__p">Title:</p>

					<div className="common-item-container__div">
						<p className="common-label__p">English:</p>
						<input
							className="common-text__input"
							type="text"
							aria-label="Title (English)"
							value={resumeSection.title.english}
							onChange={(event): void =>
								updateSection(sectionIndex, {
									...resumeSection,
									title: {
										...resumeSection.title,
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
							value={resumeSection.title.french}
							onChange={(event): void =>
								updateSection(sectionIndex, {
									...resumeSection,
									title: {
										...resumeSection.title,
										french: event.target.value,
									},
								})
							}
						/>
					</div>

					<button
						className="common__button"
						type="button"
						onClick={(): void => {
							dispatch(centerViewActions.setSectionIndex(sectionIndex));
						}}
					>
						Open Subsection
					</button>
				</div>
			))}

			{resume.length === 0 && (
				<p className="common-empty__p">No resume sections yet. Add one below.</p>
			)}

			<button
				className="common__button"
				type="button"
				onClick={(): void => {
					dispatch(
						resumeActions.setResume([
							...resume,
							{
								uniqueId: generateUniqueId(
									resume.map(
										(
											objectResumeSection: ObjectResumeSection,
										): ObjectResumeUniqueId => objectResumeSection.uniqueId,
									),
								),
								title: { english: "", french: "" },
								data: [],
							},
						]),
					);
				}}
			>
				Add Resume Section
			</button>
		</div>
	);
};

export default CenterResume;
