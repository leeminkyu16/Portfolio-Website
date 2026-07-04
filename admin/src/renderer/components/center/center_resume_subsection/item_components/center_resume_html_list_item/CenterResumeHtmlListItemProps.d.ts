import { ObjectResumeHtmlListItem } from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeHtmlListItemProps {
	htmlListItem: ObjectResumeHtmlListItem;
	onChange: (newHtmlListItem: ObjectResumeHtmlListItem) => void;
	children?: ReactNode;
}
