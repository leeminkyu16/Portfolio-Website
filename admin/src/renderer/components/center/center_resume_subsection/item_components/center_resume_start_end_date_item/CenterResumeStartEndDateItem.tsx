import { ObjectResumeStartEndDateItem } from "portfolio-website-shared";
import React, { FunctionComponent, RefObject, createRef } from "react";
import { CenterResumeStartEndDateItemProps } from "./CenterResumeStartEndDateItemProps";

const CenterResumeStartEndDateItem: FunctionComponent<CenterResumeStartEndDateItemProps> = (
	props: CenterResumeStartEndDateItemProps,
): JSX.Element => {
	const itemCopy: ObjectResumeStartEndDateItem = props.startEndDateItem;

	const startDateEnglishInput: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
	const startDateFrenchInput: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
	const endDateEnglishInput: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
	const endDateFrenchInput: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
	props.addUpdateObjectFunction((): void => {
		if (
			startDateEnglishInput.current !== null &&
			startDateEnglishInput.current.value !== undefined
		) {
			itemCopy.startDate.english = startDateEnglishInput.current.value;
		}
		if (
			startDateFrenchInput.current !== null &&
			startDateFrenchInput.current.value !== undefined
		) {
			itemCopy.startDate.french = startDateFrenchInput.current.value;
		}
		if (
			endDateEnglishInput.current !== null &&
			endDateEnglishInput.current.value !== undefined
		) {
			itemCopy.endDate.english = endDateEnglishInput.current.value;
		}
		if (endDateFrenchInput.current !== null && endDateFrenchInput.current.value !== undefined) {
			itemCopy.endDate.french = endDateFrenchInput.current.value;
		}
	});

	return (
		<>
			<p className="common-label-header-3__p">Start End Date</p>
			<p className="common-label__p">Start Date:</p>
			<div className="common-item-container__div">
				<p className="common-label__p">English:</p>
				<input
					className="common-text__input"
					type="text"
					defaultValue={props.startEndDateItem.startDate.english}
					ref={startDateEnglishInput}
				/>

				<p className="common-label__p">Français:</p>
				<input
					className="common-text__input"
					type="text"
					defaultValue={props.startEndDateItem.startDate.french}
					ref={startDateFrenchInput}
				/>
			</div>

			<p className="common-label__p">End Date:</p>
			<div className="common-item-container__div">
				<p className="common-label__p">English:</p>
				<input
					className="common-text__input"
					type="text"
					defaultValue={props.startEndDateItem.endDate.english}
					ref={endDateEnglishInput}
				/>

				<p className="common-label__p">Français:</p>
				<input
					className="common-text__input"
					type="text"
					defaultValue={props.startEndDateItem.endDate.french}
					ref={endDateFrenchInput}
				/>
			</div>
		</>
	);
};

export default CenterResumeStartEndDateItem;
