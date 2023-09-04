import { ObjectResumeHeading1Item } from "portfolio-website-shared";
import React, { FunctionComponent, RefObject, createRef } from "react";
import { CenterResumeHeading1ItemProps } from "./CenterResumeHeading1ItemProps";

const CenterResumeHeading1Item: FunctionComponent<CenterResumeHeading1ItemProps> = (
	props: CenterResumeHeading1ItemProps,
): JSX.Element => {
	const itemCopy: ObjectResumeHeading1Item = props.heading1Item;

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
			<p className="common-label-header-3__p">Heading 1</p>
			<p className="common-label__p">English:</p>
			<input
				className="common-text__input"
				type="text"
				defaultValue={props.heading1Item.english}
				ref={englishInput}
			/>

			<p className="common-label__p">Français:</p>
			<input
				className="common-text__input"
				type="text"
				defaultValue={props.heading1Item.french}
				ref={frenchInput}
			/>
		</>
	);
};

export default CenterResumeHeading1Item;
