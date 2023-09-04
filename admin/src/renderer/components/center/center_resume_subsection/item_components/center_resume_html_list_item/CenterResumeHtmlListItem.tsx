import { ObjectResumeHtmlListItem, ObjectResumeHtmlListItemProper } from "portfolio-website-shared";
import React, { FunctionComponent, RefObject, createRef, useState } from "react";
import { generateUniqueId } from "../../../shared/functions/generate_unique_id";
import { CenterResumeHtmlListItemProps } from "./CenterResumeHtmlListItemProps";
import { ElementTopRightButtons } from "../../../shared/components/ElementTopRightButtons";

const CenterResumeHtmlListItem: FunctionComponent<CenterResumeHtmlListItemProps> = (
	props: CenterResumeHtmlListItemProps,
): JSX.Element => {
	const listUpdateObjectFunctions: (() => void)[] = [];
	const [htmlListItemState, setHtmlListItemState] = useState<ObjectResumeHtmlListItem>(
		props.htmlListItem,
	);

	props.addUpdateObjectFunction((): void => {
		listUpdateObjectFunctions.forEach((updateObjectFunction: () => void): void => {
			updateObjectFunction();
		});
		props.setObjectFunction(htmlListItemState);
	});

	return (
		<>
			<p className="common-label-header-3__p">HTML List</p>
			{htmlListItemState.map(
				(
					htmlListItemProper: ObjectResumeHtmlListItemProper,
					htmlListItemProperIndex: number,
				): JSX.Element => {
					const itemProperCopy: ObjectResumeHtmlListItemProper = htmlListItemProper;

					const uniqueIdInput: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
					const textEnglishTextArea: RefObject<HTMLTextAreaElement> = createRef<HTMLTextAreaElement>();
					const textFrenchTextArea: RefObject<HTMLTextAreaElement> = createRef<HTMLTextAreaElement>();

					listUpdateObjectFunctions.push((): void => {
						if (
							uniqueIdInput.current !== null &&
							uniqueIdInput.current.value !== undefined
						) {
							itemProperCopy.uniqueId = parseInt(uniqueIdInput.current.value, 10);
						}
						if (
							textEnglishTextArea.current !== null &&
							textEnglishTextArea.current.value !== undefined
						) {
							itemProperCopy.htmlText.english = textEnglishTextArea.current.value;
						}
						if (
							textFrenchTextArea.current !== null &&
							textFrenchTextArea.current.value !== undefined
						) {
							itemProperCopy.htmlText.french = textFrenchTextArea.current.value;
						}
					});

					return (
						<div
							className="common-item-container__div"
							key={htmlListItemProper.uniqueId}
						>
							<ElementTopRightButtons
								listState={htmlListItemState}
								setListState={setHtmlListItemState}
								elementIndex={htmlListItemProperIndex}
							/>
							<p className="common-label__p">Unique Id:</p>
							<input
								className="common-text__input"
								type="number"
								defaultValue={htmlListItemProper.uniqueId}
								ref={uniqueIdInput}
							/>

							<p className="common-label__p">Text:</p>
							<div className="common-item-container__div">
								<p className="common-label__p">English:</p>
								<textarea
									className="common-text__textarea"
									defaultValue={htmlListItemProper.htmlText.english}
									ref={textEnglishTextArea}
								/>

								<p className="common-label__p">Français:</p>
								<textarea
									className="common-text__textarea"
									defaultValue={htmlListItemProper.htmlText.french}
									ref={textFrenchTextArea}
								/>
							</div>
						</div>
					);
				},
			)}

			<button
				className="common__button"
				onClick={(): void => {
					setHtmlListItemState(
						(oldListItem: ObjectResumeHtmlListItem): ObjectResumeHtmlListItem => {
							return [
								...oldListItem,
								{
									uniqueId: generateUniqueId(
										oldListItem.map(
											(element: ObjectResumeHtmlListItemProper): number =>
												element.uniqueId,
										),
									),
									htmlText: { english: "", french: "" },
								},
							];
						},
					);
				}}
			>
				Add Element to HTML List
			</button>
		</>
	);
};

export default CenterResumeHtmlListItem;
