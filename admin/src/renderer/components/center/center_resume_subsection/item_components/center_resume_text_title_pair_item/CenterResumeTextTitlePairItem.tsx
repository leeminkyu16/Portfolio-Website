import { ObjectResumeTextTitlePairItem } from "portfolio-website-shared";
import React, { FunctionComponent, RefObject, createRef } from "react";
import { CenterResumeTextTitlePairItemProps } from "./CenterResumeTextTitlePairItemProps";

const CenterResumeTextTitlePairItem: FunctionComponent<CenterResumeTextTitlePairItemProps> = (
	props: CenterResumeTextTitlePairItemProps,
): JSX.Element => {
	const itemCopy: ObjectResumeTextTitlePairItem = props.textTitlePairItem;

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
			<p className="common-label-header-3__p">Text Title Pair</p>
			{props.textTitlePairTemplateItem.additionalParam && (
				<>
					<p className="common-label__p">First:</p>
					<div className="common-item-container__div">
						<p className="common-label__p">English:</p>
						<input
							className="common-text__input"
							type="text"
							defaultValue={props.textTitlePairTemplateItem.additionalParam?.english}
							disabled
						/>

						<p className="common-label__p">Français:</p>
						<input
							className="common-text__input"
							type="text"
							defaultValue={props.textTitlePairTemplateItem.additionalParam?.french}
							disabled
						/>
					</div>
				</>
			)}
			<p className="common-label__p">Second:</p>
			<div className="common-item-container__div">
				<p className="common-label__p">English:</p>
				<input
					className="common-text__input"
					type="text"
					defaultValue={props.textTitlePairItem.english}
					ref={englishInput}
				/>

				<p className="common-label__p">Français:</p>
				<input
					className="common-text__input"
					type="text"
					defaultValue={props.textTitlePairItem.french}
					ref={frenchInput}
				/>
			</div>
		</>
	);
};

export default CenterResumeTextTitlePairItem;
