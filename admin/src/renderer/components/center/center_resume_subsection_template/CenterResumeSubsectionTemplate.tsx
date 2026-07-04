import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	ObjectResumeSubsectionTemplateItem,
	ObjectResumeSubsectionTemplateItemType,
	ObjectResumeSubsectionTemplate,
} from "portfolio-website-shared";
import { CenterResumeSubsectionTemplateProps } from "./CenterResumeSubsectionTemplateProps";
import { generateUniqueId } from "../shared/functions/generate_unique_id";
import { ElementTopRightButtons } from "../shared/components/ElementTopRightButtons";
import { resumeActions } from "../../../store/components/resume/resumeSlice";
import { centerViewActions } from "../../../store/components/center_view/centerViewSlice";
import { RootState } from "../../../store/RootState";
import "./CenterResumeSubsectionTemplate.scss";

const CenterResumeSubsectionTemplate: FunctionComponent<
	CenterResumeSubsectionTemplateProps
> = (): JSX.Element => {
	const dispatch = useDispatch();
	const resumeSectionIndex = useSelector(
		(state: RootState) => state.centerViewState.sectionIndex,
	);
	const resumeSubsectionIndex = useSelector(
		(state: RootState) => state.centerViewState.subsectionTemplateIndex,
	);
	const resumeSubsection = useSelector(
		(state: RootState) =>
			state.resume.value[state.centerViewState.sectionIndex].data[
				state.centerViewState.subsectionTemplateIndex
			],
	);

	const setResumeTemplateState = (newResumeTemplate: ObjectResumeSubsectionTemplate): void => {
		dispatch(
			resumeActions.setResumeSubsectionTemplate({
				sectionIndex: resumeSectionIndex,
				subsectionIndex: resumeSubsectionIndex,
				template: newResumeTemplate,
			}),
		);
	};

	const updateTemplateItem = (
		templateItemIndex: number,
		templateItem: ObjectResumeSubsectionTemplateItem,
	): void => {
		setResumeTemplateState(
			resumeSubsection.template.map(
				(
					item: ObjectResumeSubsectionTemplateItem,
					index: number,
				): ObjectResumeSubsectionTemplateItem =>
					index === templateItemIndex ? templateItem : item,
			),
		);
	};

	return (
		<div className="common-page-container__div">
			<p className="common-label-header-1__p">{`${resumeSubsection.title.english} Template`}</p>

			{resumeSubsection.template.map(
				(
					templateItem: ObjectResumeSubsectionTemplateItem,
					templateItemIndex: number,
				): JSX.Element => {
					const { additionalParam } = templateItem;

					return (
						<div className="common-element-container__div" key={templateItem.uniqueId}>
							<ElementTopRightButtons
								listState={resumeSubsection.template}
								setListState={setResumeTemplateState}
								elementIndex={templateItemIndex}
							/>

							<p className="common-label__p">Unique Id:</p>
							<input
								className="common-text__input"
								type="number"
								aria-label="Unique Id"
								value={templateItem.uniqueId}
								onChange={(event): void =>
									updateTemplateItem(templateItemIndex, {
										...templateItem,
										uniqueId: parseInt(event.target.value, 10) || 0,
									})
								}
							/>

							<p className="common-label__p">Item Type:</p>
							<select
								className="common-dropdown__select"
								aria-label="Item Type"
								value={templateItem.itemType}
								onChange={(event): void =>
									updateTemplateItem(templateItemIndex, {
										...templateItem,
										itemType: event.target
											.value as ObjectResumeSubsectionTemplateItemType,
									})
								}
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

							{additionalParam && (
								<>
									<p className="common-label__p">Additional Param:</p>
									<div className="common-item-container__div">
										<p className="common-label__p">English:</p>
										<input
											className="common-text__input"
											type="text"
											aria-label="Additional Param (English)"
											value={additionalParam.english}
											onChange={(event): void =>
												updateTemplateItem(templateItemIndex, {
													...templateItem,
													additionalParam: {
														...additionalParam,
														english: event.target.value,
													},
												})
											}
										/>

										<p className="common-label__p">Français:</p>
										<input
											className="common-text__input"
											type="text"
											aria-label="Additional Param (French)"
											value={additionalParam.french}
											onChange={(event): void =>
												updateTemplateItem(templateItemIndex, {
													...templateItem,
													additionalParam: {
														...additionalParam,
														french: event.target.value,
													},
												})
											}
										/>
									</div>
								</>
							)}
						</div>
					);
				},
			)}

			{resumeSubsection.template.length === 0 && (
				<p className="common-empty__p">No template items yet. Add one below.</p>
			)}

			<button
				className="common__button"
				type="button"
				onClick={(): void => {
					dispatch(
						resumeActions.setResumeSubsectionTemplate({
							sectionIndex: resumeSectionIndex,
							subsectionIndex: resumeSubsectionIndex,
							template: [
								...resumeSubsection.template,
								{
									uniqueId: generateUniqueId(
										resumeSubsection.template.map(
											(element: ObjectResumeSubsectionTemplateItem): number =>
												element.uniqueId,
										),
									),
									itemType: "Text",
									additionalParam: null,
								},
							],
						}),
					);
				}}
			>
				Add Template Item
			</button>

			<button
				className="common__button"
				type="button"
				onClick={(): void => {
					dispatch(centerViewActions.setSubsectionTemplateIndex(-1));
				}}
			>
				Go Back
			</button>
		</div>
	);
};

export default CenterResumeSubsectionTemplate;
