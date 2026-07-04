import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { resumeActions } from "../../../store/components/resume/resumeSlice";
import { centerViewActions } from "../../../store/components/center_view/centerViewSlice";
import { RootState } from "../../../store/RootState";
import "./CenterResumeSubsection.scss";

const CenterResumeSubsection: FunctionComponent<CenterResumeSubsectionProps> = (): JSX.Element => {
	const dispatch = useDispatch();
	const resumeSectionIndex = useSelector(
		(state: RootState) => state.centerViewState.sectionIndex,
	);
	const resumeSubsectionIndex = useSelector(
		(state: RootState) => state.centerViewState.subsectionIndex,
	);
	const resumeSubsection = useSelector(
		(state: RootState) =>
			state.resume.value[state.centerViewState.sectionIndex].data[
				state.centerViewState.subsectionIndex
			],
	);

	const setResumeSubsectionDataState = (
		newResumeSubsectionData: ObjectResumeSubsectionData,
	): void => {
		dispatch(
			resumeActions.setResumeSubsectionData({
				sectionIndex: resumeSectionIndex,
				subsectionIndex: resumeSubsectionIndex,
				subsectionData: newResumeSubsectionData,
			}),
		);
	};

	const updateItemBundle = (
		itemBundleIndex: number,
		itemBundle: ObjectResumeItemBundle,
	): void => {
		setResumeSubsectionDataState(
			resumeSubsection.data.map(
				(bundle: ObjectResumeItemBundle, index: number): ObjectResumeItemBundle =>
					index === itemBundleIndex ? itemBundle : bundle,
			),
		);
	};

	const updateItem = (
		itemBundleIndex: number,
		resumeItemIndex: number,
		newResumeItem: ObjectResumeItem,
	): void => {
		const itemBundle = resumeSubsection.data[itemBundleIndex];
		updateItemBundle(itemBundleIndex, {
			...itemBundle,
			resumeItems: itemBundle.resumeItems.map(
				(item: ObjectResumeItem, index: number): ObjectResumeItem =>
					index === resumeItemIndex ? newResumeItem : item,
			),
		});
	};

	return (
		<div className="common-page-container__div">
			<p className="common-label-header-1__p">{resumeSubsection.title.english}</p>

			{resumeSubsection.data.map(
				(itemBundle: ObjectResumeItemBundle, itemBundleIndex: number): JSX.Element => (
					<div className="common-element-container__div" key={itemBundle.uniqueId}>
						<ElementTopRightButtons
							listState={resumeSubsection.data}
							setListState={setResumeSubsectionDataState}
							elementIndex={itemBundleIndex}
						/>

						<p className="common-label__p">Unique Id:</p>
						<input
							className="common-text__input"
							type="number"
							aria-label="Unique Id"
							value={itemBundle.uniqueId}
							onChange={(event): void =>
								updateItemBundle(itemBundleIndex, {
									...itemBundle,
									uniqueId: parseInt(event.target.value, 10) || 0,
								})
							}
						/>

						{itemBundle.resumeItems.map(
							(
								resumeItem: ObjectResumeItem,
								resumeItemIndex: number,
							): JSX.Element => (
								<div
									className="common-item-container__div"
									key={resumeSubsection.template[resumeItemIndex].uniqueId}
								>
									{((): JSX.Element => {
										switch (
											resumeSubsection.template[resumeItemIndex].itemType
										) {
											case "Heading1":
												return (
													<CenterResumeHeading1Item
														heading1Item={
															resumeItem as ObjectResumeHeading1Item
														}
														onChange={(
															newItem: ObjectResumeHeading1Item,
														): void =>
															updateItem(
																itemBundleIndex,
																resumeItemIndex,
																newItem,
															)
														}
													/>
												);
											case "Heading1WithLink":
												return (
													<CenterResumeHeading1WithLinkItem
														heading1WithLinkItem={
															resumeItem as ObjectResumeHeading1WithLinkItem
														}
														onChange={(
															newItem: ObjectResumeHeading1WithLinkItem,
														): void =>
															updateItem(
																itemBundleIndex,
																resumeItemIndex,
																newItem,
															)
														}
													/>
												);
											case "Heading2":
												return (
													<CenterResumeHeading2Item
														heading2Item={
															resumeItem as ObjectResumeHeading2Item
														}
														onChange={(
															newItem: ObjectResumeHeading2Item,
														): void =>
															updateItem(
																itemBundleIndex,
																resumeItemIndex,
																newItem,
															)
														}
													/>
												);
											case "StartEndDate":
												return (
													<CenterResumeStartEndDateItem
														startEndDateItem={
															resumeItem as ObjectResumeStartEndDateItem
														}
														onChange={(
															newItem: ObjectResumeStartEndDateItem,
														): void =>
															updateItem(
																itemBundleIndex,
																resumeItemIndex,
																newItem,
															)
														}
													/>
												);
											case "Text":
												return (
													<CenterResumeTextItem
														textItem={
															resumeItem as ObjectResumeTextItem
														}
														onChange={(
															newItem: ObjectResumeTextItem,
														): void =>
															updateItem(
																itemBundleIndex,
																resumeItemIndex,
																newItem,
															)
														}
													/>
												);
											case "HTMLText":
												return (
													<CenterResumeHtmlTextItem
														htmlTextItem={
															resumeItem as ObjectResumeHtmlTextItem
														}
														onChange={(
															newItem: ObjectResumeHtmlTextItem,
														): void =>
															updateItem(
																itemBundleIndex,
																resumeItemIndex,
																newItem,
															)
														}
													/>
												);
											case "TextTitlePair":
												return (
													<CenterResumeTextTitlePairItem
														textTitlePairItem={
															resumeItem as ObjectResumeTextTitlePairItem
														}
														textTitlePairTemplateItem={
															resumeSubsection.template[
																resumeItemIndex
															]
														}
														onChange={(
															newItem: ObjectResumeTextTitlePairItem,
														): void =>
															updateItem(
																itemBundleIndex,
																resumeItemIndex,
																newItem,
															)
														}
													/>
												);
											case "List":
												return (
													<CenterResumeListItem
														listItem={
															resumeItem as ObjectResumeListItem
														}
														onChange={(
															newItem: ObjectResumeListItem,
														): void =>
															updateItem(
																itemBundleIndex,
																resumeItemIndex,
																newItem,
															)
														}
													/>
												);
											case "HTMLList":
												return (
													<CenterResumeHtmlListItem
														htmlListItem={
															resumeItem as ObjectResumeHtmlListItem
														}
														onChange={(
															newItem: ObjectResumeHtmlListItem,
														): void =>
															updateItem(
																itemBundleIndex,
																resumeItemIndex,
																newItem,
															)
														}
													/>
												);
											default:
												return <>Default</>;
										}
									})()}
								</div>
							),
						)}
					</div>
				),
			)}

			{resumeSubsection.data.length === 0 && (
				<p className="common-empty__p">No item bundles yet. Add one below.</p>
			)}

			<button
				className="common__button"
				type="button"
				onClick={(): void => {
					dispatch(
						resumeActions.setResumeSubsectionData({
							sectionIndex: resumeSectionIndex,
							subsectionIndex: resumeSubsectionIndex,
							subsectionData: [
								...resumeSubsection.data,
								generateDefaultItemBundle(
									resumeSubsection.data,
									resumeSubsection.template,
								),
							],
						}),
					);
				}}
			>
				Add Item Bundle
			</button>

			<button
				className="common__button"
				type="button"
				onClick={(): void => {
					dispatch(centerViewActions.setSubsectionIndex(-1));
				}}
			>
				Go Back
			</button>
		</div>
	);
};

export default CenterResumeSubsection;
