import React, { FunctionComponent } from "react";
import { CenterResumeTextItemProps } from "./CenterResumeTextItemProps";

const CenterResumeTextItem: FunctionComponent<CenterResumeTextItemProps> = (
	props: CenterResumeTextItemProps,
): JSX.Element => {
	return (
		<>
			<p className="common-label-header-3__p">Text</p>
			<p className="common-label__p">English:</p>
			<textarea
				className="common-text__textarea"
				aria-label="Text (English)"
				value={props.textItem.english}
				onChange={(event): void =>
					props.onChange({ ...props.textItem, english: event.target.value })
				}
			/>

			<p className="common-label__p">Français:</p>
			<textarea
				className="common-text__textarea"
				aria-label="Text (French)"
				value={props.textItem.french}
				onChange={(event): void =>
					props.onChange({ ...props.textItem, french: event.target.value })
				}
			/>
		</>
	);
};

export default CenterResumeTextItem;
