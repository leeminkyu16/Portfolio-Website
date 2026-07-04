import React, { FunctionComponent } from "react";
import { CenterResumeHeading2ItemProps } from "./CenterResumeHeading2ItemProps";

const CenterResumeHeading2Item: FunctionComponent<CenterResumeHeading2ItemProps> = (
	props: CenterResumeHeading2ItemProps,
): JSX.Element => {
	return (
		<>
			<p className="common-label-header-3__p">Heading 2</p>
			<p className="common-label__p">English:</p>
			<input
				className="common-text__input"
				type="text"
				value={props.heading2Item.english}
				onChange={(event): void =>
					props.onChange({ ...props.heading2Item, english: event.target.value })
				}
				aria-label="Heading 2 (English)"
			/>

			<p className="common-label__p">Français:</p>
			<input
				className="common-text__input"
				type="text"
				value={props.heading2Item.french}
				onChange={(event): void =>
					props.onChange({ ...props.heading2Item, french: event.target.value })
				}
				aria-label="Heading 2 (French)"
			/>
		</>
	);
};

export default CenterResumeHeading2Item;
