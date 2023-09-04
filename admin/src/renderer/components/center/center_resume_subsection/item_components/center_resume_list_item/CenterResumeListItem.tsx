import { ObjectResumeListItem, ObjectResumeListItemProper } from "portfolio-website-shared";
import React, { FunctionComponent, RefObject, createRef, useState } from "react";
import { generateUniqueId } from "../../../shared/functions/generate_unique_id";
import { CenterResumeListItemProps } from "./CenterResumeListItemProps";
import { ElementTopRightButtons } from "../../../shared/components/ElementTopRightButtons";

const CenterResumeListItem: FunctionComponent<CenterResumeListItemProps> = (
	props: CenterResumeListItemProps,
): JSX.Element => {
	const listUpdateObjectFunctions: (() => void)[] = [];
	const [listItemState, setListItemState] = useState<ObjectResumeListItem>(props.listItem);

	props.addUpdateObjectFunction(() => {
		listUpdateObjectFunctions.forEach((updateObjectFunction: () => void): void => {
			updateObjectFunction();
		});

		props.setObjectFunction(listItemState);
	});

	return (
		<>
			<p className="common-label-header-3__p">List</p>
			{listItemState.map(
				(
					listItemProper: ObjectResumeListItemProper,
					listItemIndex: number,
				): JSX.Element => {
					const itemCopy: ObjectResumeListItemProper = listItemProper;

					const uniqueIdInput: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
					const textEnglishTextArea: RefObject<HTMLTextAreaElement> = createRef<HTMLTextAreaElement>();
					const textFrenchTextArea: RefObject<HTMLTextAreaElement> = createRef<HTMLTextAreaElement>();

					listUpdateObjectFunctions.push((): void => {
						if (
							uniqueIdInput.current !== null &&
							uniqueIdInput.current.value !== undefined
						) {
							itemCopy.uniqueId = parseInt(uniqueIdInput.current.value, 10);
						}
						if (
							textEnglishTextArea.current !== null &&
							textEnglishTextArea.current.value !== undefined
						) {
							itemCopy.text.english = textEnglishTextArea.current.value;
						}
						if (
							textFrenchTextArea.current !== null &&
							textFrenchTextArea.current.value !== undefined
						) {
							itemCopy.text.french = textFrenchTextArea.current.value;
						}
					});

					return (
						<div className="common-item-container__div" key={listItemProper.uniqueId}>
							<ElementTopRightButtons
								listState={listItemState}
								setListState={setListItemState}
								elementIndex={listItemIndex}
							/>

							<p className="common-label__p">UniqueId:</p>
							<input
								className="common-text__input"
								type="text"
								defaultValue={listItemProper.uniqueId}
								ref={uniqueIdInput}
							/>

							<p className="common-label__p">Text:</p>
							<div className="common-item-container__div">
								<p className="common-label__p">English:</p>
								<textarea
									className="common-text__textarea"
									defaultValue={listItemProper.text.english}
									ref={textEnglishTextArea}
								/>

								<p className="common-label__p">Français:</p>
								<textarea
									className="common-text__textarea"
									defaultValue={listItemProper.text.french}
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
					setListItemState(
						(oldListItem: ObjectResumeListItem): ObjectResumeListItem => {
							return [
								...oldListItem,
								{
									uniqueId: generateUniqueId(
										oldListItem.map(
											(element: ObjectResumeListItemProper): number =>
												element.uniqueId,
										),
									),
									text: { english: "", french: "" },
								},
							];
						},
					);
				}}
			>
				Add Element to List
			</button>
		</>
	);
};

export default CenterResumeListItem;
