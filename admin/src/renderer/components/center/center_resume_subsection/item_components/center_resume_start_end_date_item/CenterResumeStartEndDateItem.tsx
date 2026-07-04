import React, { FunctionComponent } from "react";
import { CenterResumeStartEndDateItemProps } from "./CenterResumeStartEndDateItemProps";

const CenterResumeStartEndDateItem: FunctionComponent<CenterResumeStartEndDateItemProps> = (
	props: CenterResumeStartEndDateItemProps,
): JSX.Element => {
	return (
		<>
			<p className="common-label-header-3__p">Start End Date</p>
			<p className="common-label__p">Start Date:</p>
			<div className="common-item-container__div">
				<p className="common-label__p">English:</p>
				<input
					className="common-text__input"
					type="text"
					value={props.startEndDateItem.startDate.english}
					onChange={(event): void =>
						props.onChange({
							...props.startEndDateItem,
							startDate: {
								...props.startEndDateItem.startDate,
								english: event.target.value,
							},
						})
					}
					aria-label="Start Date (English)"
				/>

				<p className="common-label__p">Français:</p>
				<input
					className="common-text__input"
					type="text"
					value={props.startEndDateItem.startDate.french}
					onChange={(event): void =>
						props.onChange({
							...props.startEndDateItem,
							startDate: {
								...props.startEndDateItem.startDate,
								french: event.target.value,
							},
						})
					}
					aria-label="Start Date (French)"
				/>
			</div>

			<p className="common-label__p">End Date:</p>
			<div className="common-item-container__div">
				<p className="common-label__p">English:</p>
				<input
					className="common-text__input"
					type="text"
					value={props.startEndDateItem.endDate.english}
					onChange={(event): void =>
						props.onChange({
							...props.startEndDateItem,
							endDate: {
								...props.startEndDateItem.endDate,
								english: event.target.value,
							},
						})
					}
					aria-label="End Date (English)"
				/>

				<p className="common-label__p">Français:</p>
				<input
					className="common-text__input"
					type="text"
					value={props.startEndDateItem.endDate.french}
					onChange={(event): void =>
						props.onChange({
							...props.startEndDateItem,
							endDate: {
								...props.startEndDateItem.endDate,
								french: event.target.value,
							},
						})
					}
					aria-label="End Date (French)"
				/>
			</div>
		</>
	);
};

export default CenterResumeStartEndDateItem;
