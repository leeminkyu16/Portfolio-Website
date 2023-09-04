import {
	ListResumeHeading1Item,
	ListResumeHeading1WithLinkItem,
	ListResumeHeading2Item,
	ListResumeHtmlListItem,
	ListResumeHtmlTextItem,
	ListResumeInternationalizedString,
	ListResumeItem,
	ListResumeListItem,
	ListResumeStartEndDateItem,
	ListResumeSubsectionTemplateItem,
	ListResumeTextItem,
	ListResumeTextTitlePairItem,
} from "portfolio-website-shared";
import React from "react";
import sanitizeHtml from "sanitize-html";
import "./ResumeCard.scss";
import { ResumeCardProps } from "./ResumeCardProps";

const ResumeCard: React.FunctionComponent<ResumeCardProps> = (
	props: ResumeCardProps,
): JSX.Element => {
	const { keyId, template, data } = props;

	const generateHeading1 = (
		key: string,
		elementData: ListResumeHeading1Item,
		languageIndex = 0,
	): JSX.Element => {
		return (
			<p
				key={key}
				className="heading1-p"
			>
				{elementData[languageIndex]}
			</p>
		);
	};

	const generateHeading1WithLink = (
		key: string,
		elementData: ListResumeHeading1WithLinkItem,
		languageIndex = 0,
	): JSX.Element => {
		return (
			<a
				key={key}
				href={elementData[1]}
				className="heading1-p"
			>
				{elementData[0][languageIndex]}
			</a>
		);
	};

	const generateHeading2 = (
		key: string,
		elementData: ListResumeHeading2Item,
		languageIndex = 0,
	): JSX.Element => {
		return (
			<p
				key={key}
				className="heading2-p"
			>
				{elementData[languageIndex]}
			</p>
		);
	};

	const generateStartEndDate = (
		key: string,
		elementData: ListResumeStartEndDateItem,
		languageIndex = 0,
	): JSX.Element => {
		return (
			<div
				key={key}
				className="start-end-date-div"
			>
				<p className="date-title">Start Date:</p>
				<p className="date-content">{elementData[0][languageIndex]}</p>
				<p className="date-title">End Date:</p>
				<p className="date-content">{elementData[1][languageIndex]}</p>
			</div>
		);
	};

	const generateText = (
		key: string,
		elementData: ListResumeTextItem,
		languageIndex = 0,
	): JSX.Element => {
		return (
			<p
				key={key}
				className="text-p"
			>
				{elementData[languageIndex]}
			</p>
		);
	};

	const generateHTMLText = (
		key: string,
		elementData: ListResumeHtmlTextItem,
		languageIndex = 0,
	): JSX.Element => {
		return (
			<p
				key={key}
				className="text-p"
				dangerouslySetInnerHTML={{
					__html: sanitizeHtml(elementData[languageIndex], {
						allowedTags: ["b", "br"],
					}),
				}}
			/>
		);
	};

	const generateTextTitlePair = (
		key: string,
		elementData: ListResumeTextTitlePairItem,
		title: ListResumeInternationalizedString,
		languageIndex = 0,
	): JSX.Element => {
		return (
			<div
				className="text-div"
				key={key}
			>
				<p className="title">{title[languageIndex]}</p>
				<p className="text">{elementData[languageIndex]}</p>
			</div>
		);
	};

	const generateList = (
		key: string,
		elementData: ListResumeListItem,
		title: ListResumeInternationalizedString,
		languageIndex = 0,
	): JSX.Element | null => {
		if (elementData && elementData.length > 0) {
			return (
				<React.Fragment key={key}>
					{<p className="list-title">{title[languageIndex]}</p>}
					<ul className="list-ul">
						{Array.isArray(elementData) &&
							elementData.map((listItem) => {
								return (
									<li
										className="list-li"
										key={`${key}-${listItem[0]}`}
									>
										{listItem[1][0]}
									</li>
								);
							})}
					</ul>
				</React.Fragment>
			);
		} else {
			return null;
		}
	};

	const generateHTMLList = (
		key: string,
		elementData: ListResumeHtmlListItem,
	): JSX.Element => {
		return (
			<ul
				key={key}
				className="list-ul"
			>
				{elementData &&
					Array.isArray(elementData) &&
					elementData.map((listItem) => {
						return (
							<li
								dangerouslySetInnerHTML={{
									__html: sanitizeHtml(listItem[1][0], {
										allowedTags: ["b"],
									}),
								}}
								className="list-li"
								key={`${key}-${listItem[0]}`}
							/>
						);
					})}
			</ul>
		);
	};

	const generateElement = (
		templateItem: ListResumeSubsectionTemplateItem,
		index: number,
	): JSX.Element | null => {
		const uniqueKey = `resume-${keyId}-${templateItem[0]}`;
		const elementData = data[index] as ListResumeItem;
		switch (templateItem[1]) {
			case "Heading1":
				return generateHeading1(
					uniqueKey,
					elementData as ListResumeHeading1Item,
				);
			case "Heading1WithLink":
				return generateHeading1WithLink(
					uniqueKey,
					elementData as ListResumeHeading1WithLinkItem,
				);
			case "Heading2":
				return generateHeading2(
					uniqueKey,
					elementData as ListResumeHeading2Item,
				);
			case "StartEndDate":
				return generateStartEndDate(
					uniqueKey,
					elementData as ListResumeStartEndDateItem,
				);
			case "Text":
				return generateText(
					uniqueKey,
					elementData as ListResumeTextItem,
				);
			case "HTMLText":
				return generateHTMLText(
					uniqueKey,
					elementData as ListResumeHtmlTextItem,
				);
			case "TextTitlePair":
				return generateTextTitlePair(
					uniqueKey,
					elementData as ListResumeTextTitlePairItem,
					templateItem[2] as ListResumeInternationalizedString,
				);
			case "List":
				return generateList(
					uniqueKey,
					elementData as ListResumeListItem,
					templateItem[2] as ListResumeInternationalizedString,
				);
			case "HTMLList":
				return generateHTMLList(
					uniqueKey,
					elementData as ListResumeHtmlListItem,
				);
			default:
				return <></>;
		}
	};

	return (
		<article className="resume-card-article">
			{template &&
				template.map(
					(
						templateItem: ListResumeSubsectionTemplateItem,
						index: number,
					): JSX.Element | null => {
						return generateElement(templateItem, index);
					},
				)}
		</article>
	);
};

export { ResumeCard };
