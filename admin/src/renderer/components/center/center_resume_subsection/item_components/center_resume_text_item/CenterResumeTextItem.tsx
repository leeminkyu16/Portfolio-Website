import { ObjectResumeTextItem } from "portfolio-website-shared";
import React, { FunctionComponent, RefObject, createRef } from "react";
import { CenterResumeTextItemProps } from "./CenterResumeTextItemProps";

const CenterResumeTextItem: FunctionComponent<CenterResumeTextItemProps> = (
	props: CenterResumeTextItemProps,
): JSX.Element => {
	const itemCopy: ObjectResumeTextItem = props.textItem;

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
			<p className="common-label-header-3__p">Text</p>
			<p className="common-label__p">English:</p>
			<textarea
				className="common-text__textarea"
				defaultValue={props.textItem.english}
				ref={englishInput}
			/>

			<p className="common-label__p">Français:</p>
			<textarea
				className="common-text__textarea"
				defaultValue={props.textItem.french}
				ref={frenchInput}
			/>
		</>
	);
};

export default CenterResumeTextItem;
