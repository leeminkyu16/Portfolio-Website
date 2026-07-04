import React, { FunctionComponent } from "react";
import { CenterResumeTextTitlePairItemProps } from "./CenterResumeTextTitlePairItemProps";

const CenterResumeTextTitlePairItem: FunctionComponent<CenterResumeTextTitlePairItemProps> = (
	props: CenterResumeTextTitlePairItemProps,
): JSX.Element => {
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
							value={props.textTitlePairTemplateItem.additionalParam?.english}
							disabled
							aria-label="Text title pair first (English)"
						/>

						<p className="common-label__p">Français:</p>
						<input
							className="common-text__input"
							type="text"
							value={props.textTitlePairTemplateItem.additionalParam?.french}
							disabled
							aria-label="Text title pair first (French)"
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
					value={props.textTitlePairItem.english}
					onChange={(event): void =>
						props.onChange({ ...props.textTitlePairItem, english: event.target.value })
					}
					aria-label="Text title pair second (English)"
				/>

				<p className="common-label__p">Français:</p>
				<input
					className="common-text__input"
					type="text"
					value={props.textTitlePairItem.french}
					onChange={(event): void =>
						props.onChange({ ...props.textTitlePairItem, french: event.target.value })
					}
					aria-label="Text title pair second (French)"
				/>
			</div>
		</>
	);
};

export default CenterResumeTextTitlePairItem;
