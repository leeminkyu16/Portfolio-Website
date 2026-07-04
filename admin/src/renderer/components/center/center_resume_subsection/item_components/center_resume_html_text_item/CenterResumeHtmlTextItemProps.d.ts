import { ObjectResumeHtmlTextItem } from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeHtmlTextItemProps {
	htmlTextItem: ObjectResumeHtmlTextItem;
	onChange: (newHtmlTextItem: ObjectResumeHtmlTextItem) => void;
	children?: ReactNode;
}
