import { ObjectResumeHtmlTextItem } from "portfolio-website-shared";
import React, { FunctionComponent, RefObject, createRef } from "react";
import { CenterResumeHtmlTextItemProps } from "./CenterResumeHtmlTextItemProps";

const CenterResumeHtmlTextItem: FunctionComponent<CenterResumeHtmlTextItemProps> = (
	props: CenterResumeHtmlTextItemProps,
): JSX.Element => {
	const itemCopy: ObjectResumeHtmlTextItem = props.htmlTextItem;

	const englishInput: RefObject<HTMLTextAreaElement> = createRef<HTMLTextAreaElement>();
	const frenchInput: RefObject<HTMLTextAreaElement> = createRef<HTMLTextAreaElement>();
	props.addUpdateObjectFunction((): void => {
		if (englishInput.current !== null && englishInput.current.value !== undefined) {
			itemCopy.english = englishInput.current.value;
		}
		if (frenchInput.current !== null && frenchInput.current.value !== undefined) {
			itemCopy.french = frenchInput.current.value;
		}
	});

	return (
		<>
			<p className="common-label-header-3__p">HTML Text</p>
			<p className="common-label__p">English:</p>
			<textarea
				className="common-text__textarea"
				defaultValue={props.htmlTextItem.english}
				ref={englishInput}
			/>

			<p className="common-label__p">Français:</p>
			<textarea
				className="common-text__textarea"
				defaultValue={props.htmlTextItem.french}
				ref={frenchInput}
			/>
		</>
	);
};

export default CenterResumeHtmlTextItem;
