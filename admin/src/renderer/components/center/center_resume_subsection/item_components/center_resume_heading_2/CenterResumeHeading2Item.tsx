import { ObjectResumeHeading2Item } from "portfolio-website-shared";
import React, { FunctionComponent, RefObject, createRef } from "react";
import { CenterResumeHeading2ItemProps } from "./CenterResumeHeading2ItemProps";

const CenterResumeHeading2Item: FunctionComponent<CenterResumeHeading2ItemProps> = (
	props: CenterResumeHeading2ItemProps,
): JSX.Element => {
	const itemCopy: ObjectResumeHeading2Item = props.heading2Item;

	const englishInput: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
	const frenchInput: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
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
			<p className="common-label-header-3__p">Heading 2</p>
			<p className="common-label__p">English:</p>
			<input
				className="common-text__input"
				type="text"
				defaultValue={props.heading2Item.english}
				ref={englishInput}
			/>

			<p className="common-label__p">Français:</p>
			<input
				className="common-text__input"
				type="text"
				defaultValue={props.heading2Item.french}
				ref={frenchInput}
			/>
		</>
	);
};

export default CenterResumeHeading2Item;
