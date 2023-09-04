import { ObjectResumeItem, ObjectResumeListItem } from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeListItemProps {
	addUpdateObjectFunction: (updateObjectFunction: () => void) => void;
	setObjectFunction: (newObjectItem: ObjectResumeItem) => void;
	listItem: ObjectResumeListItem;
	children?: ReactNode;
}
