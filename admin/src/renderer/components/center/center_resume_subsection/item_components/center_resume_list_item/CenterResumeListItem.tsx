import { ObjectResumeListItem, ObjectResumeListItemProper } from "portfolio-website-shared";
import React, { FunctionComponent } from "react";
import { generateUniqueId } from "../../../shared/functions/generate_unique_id";
import { CenterResumeListItemProps } from "./CenterResumeListItemProps";
import { ElementTopRightButtons } from "../../../shared/components/ElementTopRightButtons";

const CenterResumeListItem: FunctionComponent<CenterResumeListItemProps> = (
	props: CenterResumeListItemProps,
): JSX.Element => {
	const { listItem } = props;

	const updateElement = (
		listItemIndex: number,
		listItemProper: ObjectResumeListItemProper,
	): void => {
		props.onChange(
			listItem.map(
				(element: ObjectResumeListItemProper, index: number): ObjectResumeListItemProper =>
					index === listItemIndex ? listItemProper : element,
			),
		);
	};

	return (
		<>
			<p className="common-label-header-3__p">List</p>
			{listItem.map(
				(
					listItemProper: ObjectResumeListItemProper,
					listItemIndex: number,
				): JSX.Element => (
					<div className="common-item-container__div" key={listItemProper.uniqueId}>
						<ElementTopRightButtons
							listState={listItem}
							setListState={props.onChange}
							elementIndex={listItemIndex}
						/>

						<p className="common-label__p">UniqueId:</p>
						<input
							className="common-text__input"
							type="text"
							aria-label="List element Unique Id"
							value={listItemProper.uniqueId}
							onChange={(event): void =>
								updateElement(listItemIndex, {
									...listItemProper,
									uniqueId: parseInt(event.target.value, 10) || 0,
								})
							}
						/>

						<p className="common-label__p">Text:</p>
						<div className="common-item-container__div">
							<p className="common-label__p">English:</p>
							<textarea
								className="common-text__textarea"
								aria-label="List text (English)"
								value={listItemProper.text.english}
								onChange={(event): void =>
									updateElement(listItemIndex, {
										...listItemProper,
										text: {
											...listItemProper.text,
											english: event.target.value,
										},
									})
								}
							/>

							<p className="common-label__p">Français:</p>
							<textarea
								className="common-text__textarea"
								aria-label="List text (French)"
								value={listItemProper.text.french}
								onChange={(event): void =>
									updateElement(listItemIndex, {
										...listItemProper,
										text: {
											...listItemProper.text,
											french: event.target.value,
										},
									})
								}
							/>
						</div>
					</div>
				),
			)}

			<button
				className="common__button"
				type="button"
				onClick={(): void => {
					props.onChange([
						...listItem,
						{
							uniqueId: generateUniqueId(
								listItem.map(
									(element: ObjectResumeListItemProper): number =>
										element.uniqueId,
								),
							),
							text: { english: "", french: "" },
						},
					]);
				}}
			>
				Add Element to List
			</button>
		</>
	);
};

export default CenterResumeListItem;
