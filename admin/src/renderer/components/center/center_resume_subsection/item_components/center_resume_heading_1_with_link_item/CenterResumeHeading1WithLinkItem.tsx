import { ObjectResumeHeading1WithLinkItem } from "portfolio-website-shared";
import React, { FunctionComponent, RefObject, createRef } from "react";
import { CenterResumeHeading1WithLinkItemProps } from "./CenterResumeHeading1WithLinkItemProps";

const CenterResumeHeading1WithLinkItem: FunctionComponent<CenterResumeHeading1WithLinkItemProps> = (
	props: CenterResumeHeading1WithLinkItemProps,
): JSX.Element => {
	const itemCopy: ObjectResumeHeading1WithLinkItem = props.heading1WithLinkItem;

	const englishInput: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
	const frenchInput: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
	const linkInput: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
	props.addUpdateObjectFunction((): void => {
		if (englishInput.current !== null && englishInput.current.value !== undefined) {
			itemCopy.text.english = englishInput.current.value;
		}
		if (frenchInput.current !== null && frenchInput.current.value !== undefined) {
			itemCopy.text.french = frenchInput.current.value;
		}
		if (linkInput.current !== null && linkInput.current.value !== undefined) {
			itemCopy.link = linkInput.current.value;
		}
	});

	return (
		<>
			<p className="common-label-header-3__p">Heading 1 With Link</p>
			<p className="common-label__p">Text:</p>
			<div className="common-item-container__div">
				<p className="common-label__p">English:</p>
				<input
					className="common-text__input"
					type="text"
					defaultValue={props.heading1WithLinkItem.text.english}
					ref={englishInput}
				/>

				<p className="common-label__p">Français:</p>
				<input
					className="common-text__input"
					type="text"
					defaultValue={props.heading1WithLinkItem.text.french}
					ref={frenchInput}
				/>
			</div>
			<p className="common-label__p">Link:</p>
			<input
				className="common-text__input"
				type="text"
				defaultValue={props.heading1WithLinkItem.link}
				ref={linkInput}
			/>
		</>
	);
};

export default CenterResumeHeading1WithLinkItem;
