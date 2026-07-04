import React, { FunctionComponent } from "react";
import { CenterResumeHtmlTextItemProps } from "./CenterResumeHtmlTextItemProps";

const CenterResumeHtmlTextItem: FunctionComponent<CenterResumeHtmlTextItemProps> = (
	props: CenterResumeHtmlTextItemProps,
): JSX.Element => {
	return (
		<>
			<p className="common-label-header-3__p">HTML Text</p>
			<p className="common-label__p">English:</p>
			<textarea
				className="common-text__textarea"
				value={props.htmlTextItem.english}
				onChange={(event): void =>
					props.onChange({ ...props.htmlTextItem, english: event.target.value })
				}
				aria-label="HTML Text (English)"
			/>

			<p className="common-label__p">Français:</p>
			<textarea
				className="common-text__textarea"
				value={props.htmlTextItem.french}
				onChange={(event): void =>
					props.onChange({ ...props.htmlTextItem, french: event.target.value })
				}
				aria-label="HTML Text (French)"
			/>
		</>
	);
};

export default CenterResumeHtmlTextItem;
