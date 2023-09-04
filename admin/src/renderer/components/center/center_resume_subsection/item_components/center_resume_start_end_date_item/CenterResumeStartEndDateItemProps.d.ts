import { ObjectResumeStartEndDateItem } from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeStartEndDateItemProps {
	addUpdateObjectFunction: (updateObjectFunction: () => void) => void;
	startEndDateItem: ObjectResumeStartEndDateItem;
	children?: ReactNode;
}
