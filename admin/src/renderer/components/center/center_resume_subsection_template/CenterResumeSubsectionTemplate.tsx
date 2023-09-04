import React, { FunctionComponent, RefObject, createRef, useEffect } from "react";
import { connect } from "react-redux";
import {
	ObjectResumeSubsectionTemplateItem,
	ObjectResumeSubsectionTemplateItemType,
	ObjectResumeSubsectionTemplate,
} from "portfolio-website-shared";
import { CenterResumeSubsectionTemplateProps } from "./CenterResumeSubsectionTemplateProps";
import { mapDispatchToProps, mapStateToProps } from "./component_redux_functions";
import { generateUniqueId } from "../shared/functions/generate_unique_id";
import { ElementTopRightButtons } from "../shared/components/ElementTopRightButtons";
import "./CenterResumeSubsectionTemplate.scss";

const CenterResumeSubsectionTemplate: FunctionComponent<CenterResumeSubsectionTemplateProps> = (
	props: CenterResumeSubsectionTemplateProps,
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

	const setResumeTemplateState = (newResumeTemplate: ObjectResumeSubsectionTemplate): void => {
		props.setResumeSubsectionTemplateAction(
			props.resumeSectionIndex,
			props.resumeSubsectionIndex,
			newResumeTemplate,
		);
	};

	return (
		<div className="common-page-container__div">
			<p className="common-label-header-1__p">{`${props.resumeSubsection.title.english} Template`}</p>

			{props.resumeSubsection.template.map(
				(
					templateItem: ObjectResumeSubsectionTemplateItem,
					templateItemIndex: number,
				): JSX.Element => {
					const itemCopy: ObjectResumeSubsectionTemplateItem = templateItem;

					const uniqueIdInputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
					const itemTypeSelectRef: RefObject<HTMLSelectElement> = createRef<HTMLSelectElement>();
					const additionalParamEnglishInputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
					const additionalParamFrenchInputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

					updateObjectFunctions.push((): void => {
						if (
							uniqueIdInputRef.current !== null &&
							uniqueIdInputRef.current.value !== undefined
						) {
							itemCopy.uniqueId = parseInt(uniqueIdInputRef.current.value, 10);
						}
						if (
							itemTypeSelectRef.current !== null &&
							itemTypeSelectRef.current.value !== undefined
						) {
							itemCopy.itemType = itemTypeSelectRef.current
								.value as ObjectResumeSubsectionTemplateItemType;
						}
						if (
							additionalParamEnglishInputRef.current !== null &&
							additionalParamEnglishInputRef.current.value !== undefined &&
							itemCopy.additionalParam !== undefined
						) {
							itemCopy.additionalParam.english =
								additionalParamEnglishInputRef.current.value;
						}
						if (
							additionalParamFrenchInputRef.current !== null &&
							additionalParamFrenchInputRef.current.value !== undefined &&
							itemCopy.additionalParam !== undefined
						) {
							itemCopy.additionalParam.french =
								additionalParamFrenchInputRef.current.value;
						}
					});

					return (
						<div className="common-element-container__div" key={templateItem.uniqueId}>
							<ElementTopRightButtons
								listState={props.resumeSubsection.template}
								setListState={setResumeTemplateState}
								elementIndex={templateItemIndex}
							/>

							<p className="common-label__p">Unique Id:</p>
							<input
								className="common-text__input"
								type="number"
								defaultValue={templateItem.uniqueId}
								ref={uniqueIdInputRef}
							/>

							<p className="common-label__p">Item Type:</p>
							<select
								className="common-dropdown__select"
								defaultValue={templateItem.itemType}
								ref={itemTypeSelectRef}
							>
								<option value="Heading1">Heading 1</option>
								<option value="Heading1WithLink">Heading 1 with Link</option>
								<option value="Heading2">Heading 2</option>
								<option value="StartEndDate">Start End Date</option>
								<option value="Text">Text</option>
								<option value="HTMLText">HTML Text</option>
								<option value="TextTitlePair">Text Title Pair</option>
								<option value="List">List</option>
								<option value="HTMLList">HTML List</option>
							</select>

							{templateItem.additionalParam && (
								<>
									<p className="common-label__p">Additional Param:</p>
									<div className="common-item-container__div">
										<p className="common-label__p">English:</p>
										<input
											className="common-text__input"
											type="text"
											defaultValue={templateItem.additionalParam?.english}
											ref={additionalParamEnglishInputRef}
										/>

										<p className="common-label__p">Français:</p>
										<input
											className="common-text__input"
											type="text"
											defaultValue={templateItem.additionalParam?.french}
											ref={additionalParamFrenchInputRef}
										/>
									</div>
								</>
							)}
						</div>
					);
				},
			)}

			<button
				className="common__button"
				onClick={(): void => {
					props.setResumeSubsectionTemplateAction(
						props.resumeSectionIndex,
						props.resumeSubsectionIndex,
						[
							...props.resumeSubsection.template,
							{
								uniqueId: generateUniqueId(
									props.resumeSubsection.template.map(
										(element: ObjectResumeSubsectionTemplateItem): number =>
											element.uniqueId,
									),
								),
								itemType: "Text",
								additionalParam: undefined,
							},
						],
					);
				}}
			>
				Add Template Item
			</button>

			<button
				className="common__button"
				onClick={(): void => {
					syncState();

					props.setCenterViewSubsectionTemplateIndexAction(-1);
				}}
			>
				Go Back
			</button>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterResumeSubsectionTemplate);
