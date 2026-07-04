import { ObjectResumeListItem } from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeListItemProps {
	listItem: ObjectResumeListItem;
	onChange: (newListItem: ObjectResumeListItem) => void;
	children?: ReactNode;
}
