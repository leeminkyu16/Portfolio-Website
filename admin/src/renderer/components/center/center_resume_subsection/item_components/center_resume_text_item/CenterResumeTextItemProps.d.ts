import { ObjectResumeTextItem } from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeTextItemProps {
	textItem: ObjectResumeTextItem;
	onChange: (newTextItem: ObjectResumeTextItem) => void;
	children?: ReactNode;
}
