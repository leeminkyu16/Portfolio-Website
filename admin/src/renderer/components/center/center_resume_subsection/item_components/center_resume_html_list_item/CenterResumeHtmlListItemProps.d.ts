import { ObjectResumeHtmlListItem, ObjectResumeItem } from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeHtmlListItemProps {
	addUpdateObjectFunction: (updateObjectFunction: () => void) => void;
	setObjectFunction: (newObjectItem: ObjectResumeItem) => void;
	htmlListItem: ObjectResumeHtmlListItem;
	children?: ReactNode;
}
