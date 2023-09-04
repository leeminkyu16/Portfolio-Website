import React, { FunctionComponent, RefObject, createRef, useEffect } from "react";
import { connect } from "react-redux";
import {
	ObjectResumeItem,
	ObjectResumeItemBundle,
	ObjectResumeHeading1Item,
	ObjectResumeHeading1WithLinkItem,
	ObjectResumeHeading2Item,
	ObjectResumeStartEndDateItem,
	ObjectResumeTextItem,
	ObjectResumeTextTitlePairItem,
	ObjectResumeListItem,
	ObjectResumeHtmlListItem,
	ObjectResumeHtmlTextItem,
	ObjectResumeSubsectionData,
} from "portfolio-website-shared";
import { mapDispatchToProps, mapStateToProps } from "./component_redux_functions";
import { CenterResumeSubsectionProps } from "./CenterResumeSubsectionProps";
import CenterResumeHeading1Item from "./item_components/center_resume_heading_1_item/CenterResumeHeading1Item";
import CenterResumeHeading1WithLinkItem from "./item_components/center_resume_heading_1_with_link_item/CenterResumeHeading1WithLinkItem";
import CenterResumeHeading2Item from "./item_components/center_resume_heading_2/CenterResumeHeading2Item";
import CenterResumeStartEndDateItem from "./item_components/center_resume_start_end_date_item/CenterResumeStartEndDateItem";
import CenterResumeTextItem from "./item_components/center_resume_text_item/CenterResumeTextItem";
import CenterResumeHtmlTextItem from "./item_components/center_resume_html_text_item/CenterResumeHtmlTextItem";
import CenterResumeTextTitlePairItem from "./item_components/center_resume_text_title_pair_item/CenterResumeTextTitlePairItem";
import CenterResumeListItem from "./item_components/center_resume_list_item/CenterResumeListItem";
import CenterResumeHtmlListItem from "./item_components/center_resume_html_list_item/CenterResumeHtmlListItem";
import { generateDefaultItemBundle } from "./other_functions/generate_default_item_bundle";
import { ElementTopRightButtons } from "../shared/components/ElementTopRightButtons";
import "./CenterResumeSubsection.scss";

const CenterResumeSubsection: FunctionComponent<CenterResumeSubsectionProps> = (
	props: CenterResumeSubsectionProps,
): JSX.Element => {
	const updateObjectFunctions: Map<[number, number], () => void> = new Map<
		[number, number],
		() => void
	>();

	const syncState = (): void => {
		updateObjectFunctions.forEach((updateFunction: () => void): void => {
			updateFunction();
		});
	};

	useEffect((): void => {
		props.setSyncResumeAction(syncState);
	}, [props.setSyncResumeAction, updateObjectFunctions, syncState]);

	const setResumeSubsectionDataState = (
		newResumeSubsectionData: ObjectResumeSubsectionData,
	): void => {
		props.setResumeSubsectionDataAction(
			props.resumeSectionIndex,
			props.resumeSubsectionIndex,
			newResumeSubsectionData,
		);
	};

	return (
		<div className="common-page-container__div">
			<p className="common-label-header-1__p">{props.resumeSubsection.title.english}</p>

			{props.resumeSubsection.data.map(
				(itemBundle: ObjectResumeItemBundle, itemBundleIndex: number): JSX.Element => {
					const itemBundleCopy: ObjectResumeItemBundle = itemBundle;

					const uniqueIdInput: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

					updateObjectFunctions.set([-1, -1], (): void => {
						if (
							uniqueIdInput.current !== null &&
							uniqueIdInput.current.value !== undefined
						) {
							itemBundleCopy.uniqueId = parseInt(uniqueIdInput.current.value, 10);
						}
					});

					return (
						<div className="common-element-container__div" key={itemBundle.uniqueId}>
							<ElementTopRightButtons
								listState={props.resumeSubsection.data}
								setListState={setResumeSubsectionDataState}
								elementIndex={itemBundleIndex}
							/>

							<p className="common-label__p">Unique Id:</p>
							<input
								className="common-text__input"
								type="number"
								defaultValue={itemBundle.uniqueId}
								ref={uniqueIdInput}
							/>

							{itemBundle.resumeItems.map(
								(
									resumeItem: ObjectResumeItem,
									resumeItemIndex: number,
								): JSX.Element => {
									const addUpdateObjectFunction = (
										updateObjectFunction: () => void,
									): void => {
										updateObjectFunctions.set(
											[resumeItemIndex, itemBundleIndex],
											updateObjectFunction,
										);
									};
									const setObjectFunction = (
										newObjectItem: ObjectResumeItem,
									): void => {
										itemBundleCopy.resumeItems[resumeItemIndex] = newObjectItem;
									};

									return (
										<div
											className="common-item-container__div"
											key={
												props.resumeSubsection.template[resumeItemIndex]
													.uniqueId
											}
										>
											{((): JSX.Element => {
												switch (
													props.resumeSubsection.template[resumeItemIndex]
														.itemType
												) {
													case "Heading1":
														return (
															<CenterResumeHeading1Item
																addUpdateObjectFunction={
																	addUpdateObjectFunction
																}
																heading1Item={
																	resumeItem as ObjectResumeHeading1Item
																}
															/>
														);
													case "Heading1WithLink":
														return (
															<CenterResumeHeading1WithLinkItem
																addUpdateObjectFunction={
																	addUpdateObjectFunction
																}
																heading1WithLinkItem={
																	resumeItem as ObjectResumeHeading1WithLinkItem
																}
															/>
														);
													case "Heading2":
														return (
															<CenterResumeHeading2Item
																addUpdateObjectFunction={
																	addUpdateObjectFunction
																}
																heading2Item={
																	resumeItem as ObjectResumeHeading2Item
																}
															/>
														);
													case "StartEndDate":
														return (
															<CenterResumeStartEndDateItem
																addUpdateObjectFunction={
																	addUpdateObjectFunction
																}
																startEndDateItem={
																	resumeItem as ObjectResumeStartEndDateItem
																}
															/>
														);
													case "Text":
														return (
															<CenterResumeTextItem
																addUpdateObjectFunction={
																	addUpdateObjectFunction
																}
																textItem={
																	resumeItem as ObjectResumeTextItem
																}
															/>
														);
													case "HTMLText":
														return (
															<CenterResumeHtmlTextItem
																addUpdateObjectFunction={
																	addUpdateObjectFunction
																}
																htmlTextItem={
																	resumeItem as ObjectResumeHtmlTextItem
																}
															/>
														);
													case "TextTitlePair":
														return (
															<CenterResumeTextTitlePairItem
																addUpdateObjectFunction={
																	addUpdateObjectFunction
																}
																textTitlePairItem={
																	resumeItem as ObjectResumeTextTitlePairItem
																}
																textTitlePairTemplateItem={
																	props.resumeSubsection.template[
																		resumeItemIndex
																	]
																}
															/>
														);
													case "List":
														return (
															<CenterResumeListItem
																addUpdateObjectFunction={
																	addUpdateObjectFunction
																}
																setObjectFunction={
																	setObjectFunction
																}
																listItem={
																	resumeItem as ObjectResumeListItem
																}
															/>
														);
													case "HTMLList":
														return (
															<CenterResumeHtmlListItem
																addUpdateObjectFunction={
																	addUpdateObjectFunction
																}
																setObjectFunction={
																	setObjectFunction
																}
																htmlListItem={
																	resumeItem as ObjectResumeHtmlListItem
																}
															/>
														);
													default:
														return <>Default</>;
												}
											})()}
										</div>
									);
								},
							)}
						</div>
					);
				},
			)}

			<button
				className="common__button"
				onClick={(): void => {
					props.setResumeSubsectionDataAction(
						props.resumeSectionIndex,
						props.resumeSubsectionIndex,
						[
							...props.resumeSubsection.data,
							generateDefaultItemBundle(
								props.resumeSubsection.data,
								props.resumeSubsection.template,
							),
						],
					);
				}}
			>
				Add Item Bundle
			</button>

			<button
				className="common__button"
				onClick={(): void => {
					syncState();

					props.setCenterViewSubsectionIndexAction(-1);
				}}
			>
				Go Back
			</button>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterResumeSubsection);
