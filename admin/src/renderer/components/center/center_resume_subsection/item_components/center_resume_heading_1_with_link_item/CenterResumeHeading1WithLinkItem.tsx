import React, { FunctionComponent } from "react";
import { CenterResumeHeading1WithLinkItemProps } from "./CenterResumeHeading1WithLinkItemProps";

const CenterResumeHeading1WithLinkItem: FunctionComponent<CenterResumeHeading1WithLinkItemProps> = (
	props: CenterResumeHeading1WithLinkItemProps,
): JSX.Element => {
	return (
		<>
			<p className="common-label-header-3__p">Heading 1 With Link</p>
			<p className="common-label__p">Text:</p>
			<div className="common-item-container__div">
				<p className="common-label__p">English:</p>
				<input
					className="common-text__input"
					type="text"
					value={props.heading1WithLinkItem.text.english}
					onChange={(event): void =>
						props.onChange({
							...props.heading1WithLinkItem,
							text: {
								...props.heading1WithLinkItem.text,
								english: event.target.value,
							},
						})
					}
					aria-label="Heading 1 with link text (English)"
				/>

				<p className="common-label__p">Français:</p>
				<input
					className="common-text__input"
					type="text"
					value={props.heading1WithLinkItem.text.french}
					onChange={(event): void =>
						props.onChange({
							...props.heading1WithLinkItem,
							text: {
								...props.heading1WithLinkItem.text,
								french: event.target.value,
							},
						})
					}
					aria-label="Heading 1 with link text (French)"
				/>
			</div>
			<p className="common-label__p">Link:</p>
			<input
				className="common-text__input"
				type="text"
				value={props.heading1WithLinkItem.link}
				onChange={(event): void =>
					props.onChange({ ...props.heading1WithLinkItem, link: event.target.value })
				}
				aria-label="Heading 1 link URL"
			/>
		</>
	);
};

export default CenterResumeHeading1WithLinkItem;
