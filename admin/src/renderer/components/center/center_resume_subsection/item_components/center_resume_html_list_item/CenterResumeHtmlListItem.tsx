import { ObjectResumeHtmlListItem, ObjectResumeHtmlListItemProper } from "portfolio-website-shared";
import React, { FunctionComponent } from "react";
import { generateUniqueId } from "../../../shared/functions/generate_unique_id";
import { CenterResumeHtmlListItemProps } from "./CenterResumeHtmlListItemProps";
import { ElementTopRightButtons } from "../../../shared/components/ElementTopRightButtons";

const CenterResumeHtmlListItem: FunctionComponent<CenterResumeHtmlListItemProps> = (
	props: CenterResumeHtmlListItemProps,
): JSX.Element => {
	const { htmlListItem } = props;

	const updateElement = (
		htmlListItemProperIndex: number,
		htmlListItemProper: ObjectResumeHtmlListItemProper,
	): void => {
		props.onChange(
			htmlListItem.map(
				(
					element: ObjectResumeHtmlListItemProper,
					index: number,
				): ObjectResumeHtmlListItemProper =>
					index === htmlListItemProperIndex ? htmlListItemProper : element,
			),
		);
	};

	return (
		<>
			<p className="common-label-header-3__p">HTML List</p>
			{htmlListItem.map(
				(
					htmlListItemProper: ObjectResumeHtmlListItemProper,
					htmlListItemProperIndex: number,
				): JSX.Element => (
					<div className="common-item-container__div" key={htmlListItemProper.uniqueId}>
						<ElementTopRightButtons
							listState={htmlListItem}
							setListState={props.onChange}
							elementIndex={htmlListItemProperIndex}
						/>
						<p className="common-label__p">Unique Id:</p>
						<input
							className="common-text__input"
							type="number"
							value={htmlListItemProper.uniqueId}
							onChange={(event): void =>
								updateElement(htmlListItemProperIndex, {
									...htmlListItemProper,
									uniqueId: parseInt(event.target.value, 10) || 0,
								})
							}
							aria-label="HTML list element Unique Id"
						/>

						<p className="common-label__p">Text:</p>
						<div className="common-item-container__div">
							<p className="common-label__p">English:</p>
							<textarea
								className="common-text__textarea"
								value={htmlListItemProper.htmlText.english}
								onChange={(event): void =>
									updateElement(htmlListItemProperIndex, {
										...htmlListItemProper,
										htmlText: {
											...htmlListItemProper.htmlText,
											english: event.target.value,
										},
									})
								}
								aria-label="HTML list text (English)"
							/>

							<p className="common-label__p">Français:</p>
							<textarea
								className="common-text__textarea"
								value={htmlListItemProper.htmlText.french}
								onChange={(event): void =>
									updateElement(htmlListItemProperIndex, {
										...htmlListItemProper,
										htmlText: {
											...htmlListItemProper.htmlText,
											french: event.target.value,
										},
									})
								}
								aria-label="HTML list text (French)"
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
						...htmlListItem,
						{
							uniqueId: generateUniqueId(
								htmlListItem.map(
									(element: ObjectResumeHtmlListItemProper): number =>
										element.uniqueId,
								),
							),
							htmlText: { english: "", french: "" },
						},
					]);
				}}
			>
				Add Element to HTML List
			</button>
		</>
	);
};

export default CenterResumeHtmlListItem;
