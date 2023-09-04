import React, { FunctionComponent, RefObject, createRef, useEffect } from "react";
import { connect } from "react-redux";
import { ObjectResumeUniqueId, ObjectResumeSection } from "portfolio-website-shared";
import { CenterResumeProps } from "./CenterResumeProps";
import { mapDispatchToProps, mapStateToProps } from "./component_redux_functions";
import { generateUniqueId } from "../shared/functions/generate_unique_id";
import { ElementTopRightButtons } from "../shared/components/ElementTopRightButtons";
import "./CenterResume.scss";

const CenterResume: FunctionComponent<CenterResumeProps> = (
	props: CenterResumeProps,
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
			{props.resume.map(
				(resumeSection: ObjectResumeSection, sectionIndex: number): JSX.Element => {
					const itemCopy: ObjectResumeSection = resumeSection;

					const uniqueIdInputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
					const titleEnglishInputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
					const titleFrenchInputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

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
					});

					return (
						<div
							className="common-element-container__div"
							key={`resume-${resumeSection.uniqueId}`}
						>
							<ElementTopRightButtons
								listState={props.resume}
								setListState={props.setResumeAction}
								elementIndex={sectionIndex}
							/>

							<p className="common-label__p">Unique Id:</p>

							<input
								className="common-text__input"
								type="number"
								defaultValue={resumeSection.uniqueId}
								ref={uniqueIdInputRef}
							/>

							<p className="common-label__p">Title:</p>

							<div className="common-item-container__div">
								<p className="common-label__p">English:</p>
								<input
									className="common-text__input"
									type="text"
									defaultValue={resumeSection.title.english}
									ref={titleEnglishInputRef}
								/>

								<p className="common-label__p">Français:</p>
								<input
									className="common-text__input"
									type="text"
									defaultValue={resumeSection.title.french}
									ref={titleFrenchInputRef}
								/>
							</div>

							<button
								className="common__button"
								onClick={(): void => {
									syncState();

									props.setCenterViewSectionIndexAction(sectionIndex);
								}}
							>
								Open Subsection
							</button>
						</div>
					);
				},
			)}

			<button
				className="common__button"
				onClick={(): void => {
					props.setResumeAction([
						...props.resume,
						{
							uniqueId: generateUniqueId(
								props.resume.map(
									(
										objectResumeSection: ObjectResumeSection,
									): ObjectResumeUniqueId => objectResumeSection.uniqueId,
								),
							),
							title: { english: "", french: "" },
							data: [],
						},
					]);
				}}
			>
				Add Resume Section
			</button>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterResume);
