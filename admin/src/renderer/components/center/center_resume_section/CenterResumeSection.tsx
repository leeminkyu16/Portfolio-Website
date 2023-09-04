import React, { FunctionComponent, RefObject, createRef, useEffect } from "react";

import { connect } from "react-redux";
import {
	ObjectResumeSubsectionCardSize,
	ObjectResumeSectionData,
	ObjectResumeUniqueId,
	ObjectResumeSubsection,
} from "portfolio-website-shared";
import { CenterResumeSectionProps } from "./CenterResumeSectionProps";
import { mapDispatchToProps, mapStateToProps } from "./component_redux_functions";
import { generateUniqueId } from "../shared/functions/generate_unique_id";
import { ElementTopRightButtons } from "../shared/components/ElementTopRightButtons";
import "./CenterResumeSection.scss";

const CenterResumeSection: FunctionComponent<CenterResumeSectionProps> = (
	props: CenterResumeSectionProps,
): JSX.Element => {
	const updateObjectFunctions: (() => void)[] = [];

	const syncState = (): void => {
		updateObjectFunctions.forEach((updateFunction: () => void): void => {
			updateFunction();
		});
	};

	useEffect((): void => {
		props.setSyncResumeAction(syncState);
	}, [props.setSyncResumeAction, updateObjectFunctions, syncState]);

	return (
		<div className="common-page-container__div">
			<p className="common-label-header-1__p">{props.resumeSection.title.english}</p>

			{props.resumeSection.data.map(
				(
					resumeSubsection: ObjectResumeSubsection,
					subsectionIndex: number,
				): JSX.Element => {
					const itemCopy: ObjectResumeSubsection = resumeSubsection;

					const uniqueIdInputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
					const titleEnglishInputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
					const titleFrenchInputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
					const cardSizeSelectRef: RefObject<HTMLSelectElement> = createRef<HTMLSelectElement>();

					updateObjectFunctions.push((): void => {
						if (
							uniqueIdInputRef.current !== null &&
							uniqueIdInputRef.current.value !== undefined
						) {
							itemCopy.uniqueId = parseInt(uniqueIdInputRef.current.value, 10);
						}
						if (
							titleEnglishInputRef.current !== null &&
							titleEnglishInputRef.current.value !== undefined
						) {
							itemCopy.title.english = titleEnglishInputRef.current.value;
						}
						if (
							titleFrenchInputRef.current !== null &&
							titleFrenchInputRef.current.value !== undefined
						) {
							itemCopy.title.french = titleFrenchInputRef.current.value;
						}
						if (
							cardSizeSelectRef.current !== null &&
							cardSizeSelectRef.current.value !== undefined
						) {
							itemCopy.cardSize = cardSizeSelectRef.current
								.value as ObjectResumeSubsectionCardSize;
						}
					});

					const setResumeSectionDataState = (
						newResumeSectionData: ObjectResumeSectionData,
					): void => {
						props.setResumeSectionDataAction(
							props.resumeSectionIndex,
							newResumeSectionData,
						);
					};

					return (
						<div
							className="common-element-container__div"
							key={resumeSubsection.uniqueId}
						>
							<ElementTopRightButtons
								listState={props.resumeSection.data}
								setListState={setResumeSectionDataState}
								elementIndex={subsectionIndex}
							/>

							<p className="common-label__p">Unique Id:</p>
							<input
								className="common-text__input"
								type="number"
								defaultValue={resumeSubsection.uniqueId}
								ref={uniqueIdInputRef}
							/>

							<p className="common-label__p">Title: </p>
							<div className="common-item-container__div">
								<p className="common-label__p">English:</p>
								<input
									className="common-text__input"
									type="text"
									defaultValue={resumeSubsection.title.english}
									ref={titleEnglishInputRef}
								/>

								<p className="common-label__p">Français:</p>
								<input
									className="common-text__input"
									type="text"
									defaultValue={resumeSubsection.title.french}
									ref={titleFrenchInputRef}
								/>
							</div>

							<p className="common-label__p">Card Size:</p>
							<select
								className="common-dropdown__select"
								defaultValue={resumeSubsection.cardSize}
								ref={cardSizeSelectRef}
							>
								<option value="small">Small</option>
								<option value="medium">Medium</option>
								<option value="large">Large</option>
							</select>

							<button
								className="common__button"
								onClick={(): void => {
									syncState();

									props.setCenterViewSubsectionTemplateIndexAction(
										subsectionIndex,
									);
								}}
							>
								Open Template
							</button>

							<button
								className="common__button"
								onClick={(): void => {
									syncState();

									props.setCenterViewSubsectionIndexAction(subsectionIndex);
								}}
							>
								Open Items
							</button>
						</div>
					);
				},
			)}

			<button
				className="common__button"
				onClick={(): void => {
					props.setResumeSectionDataAction(props.resumeSectionIndex, [
						...props.resumeSection.data,
						{
							uniqueId: generateUniqueId(
								props.resumeSection.data.map(
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
					]);
				}}
			>
				Add Resume Subsection
			</button>

			<button
				className="common__button"
				onClick={(): void => {
					syncState();

					props.setCenterViewSectionIndexAction(-1);
				}}
			>
				Go Back
			</button>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterResumeSection);
