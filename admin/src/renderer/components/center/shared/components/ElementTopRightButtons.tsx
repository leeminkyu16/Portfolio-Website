import React from "react";
import { UpChevron, DownChevron, TrashCan } from "../../../../assets/images";
import { removeElement } from "../functions/remove_element";
import { switchElements } from "../functions/switch_elements";
import { ElementTopRightButtonsProps } from "./ElementTopRightButtonsProps";

const ElementTopRightButtons: <T>(props: ElementTopRightButtonsProps<T>) => JSX.Element = <T,>(
	props: ElementTopRightButtonsProps<T>,
): JSX.Element => {
	return (
		<div className="top-right-container__div">
			<button
				className="common-image__button"
				onClick={(): void => {
					switchElements(
						props.listState,
						props.setListState,
						props.elementIndex - 1,
						props.elementIndex,
					);
				}}
			>
				<img src={UpChevron} alt="Up Chevron" />
			</button>
			<button
				className="common-image__button"
				onClick={(): void => {
					switchElements(
						props.listState,
						props.setListState,
						props.elementIndex,
						props.elementIndex + 1,
					);
				}}
			>
				<img src={DownChevron} alt="Down Chevron" />
			</button>
			<button
				className="common-image__button"
				onClick={(): void => {
					removeElement(props.listState, props.setListState, props.elementIndex);
				}}
			>
				<img src={TrashCan} alt="Trash Can" />
			</button>
		</div>
	);
};

export { ElementTopRightButtons };
