import { ObjectResumeHtmlTextItem } from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeHtmlTextItemProps {
	addUpdateObjectFunction: (updateObjectFunction: () => void) => void;
	htmlTextItem: ObjectResumeHtmlTextItem;
	children?: ReactNode;
}
