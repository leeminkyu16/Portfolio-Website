import React, { FunctionComponent } from "react";
import { CenterResumeHeading1ItemProps } from "./CenterResumeHeading1ItemProps";

const CenterResumeHeading1Item: FunctionComponent<CenterResumeHeading1ItemProps> = (
	props: CenterResumeHeading1ItemProps,
): JSX.Element => {
	return (
		<>
			<p className="common-label-header-3__p">Heading 1</p>
			<p className="common-label__p">English:</p>
			<input
				className="common-text__input"
				type="text"
				value={props.heading1Item.english}
				onChange={(event): void =>
					props.onChange({ ...props.heading1Item, english: event.target.value })
				}
				aria-label="Heading 1 (English)"
			/>

			<p className="common-label__p">Français:</p>
			<input
				className="common-text__input"
				type="text"
				value={props.heading1Item.french}
				onChange={(event): void =>
					props.onChange({ ...props.heading1Item, french: event.target.value })
				}
				aria-label="Heading 1 (French)"
			/>
		</>
	);
};

export default CenterResumeHeading1Item;
