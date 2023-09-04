import { ObjectResumeTextItem } from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeTextItemProps {
	addUpdateObjectFunction: (updateObjectFunction: () => void) => void;
	textItem: ObjectResumeTextItem;
	children?: ReactNode;
}
