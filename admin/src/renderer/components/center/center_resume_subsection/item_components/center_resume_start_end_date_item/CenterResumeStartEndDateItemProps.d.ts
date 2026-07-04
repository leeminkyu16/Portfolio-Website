import { ObjectResumeStartEndDateItem } from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeStartEndDateItemProps {
	startEndDateItem: ObjectResumeStartEndDateItem;
	onChange: (newStartEndDateItem: ObjectResumeStartEndDateItem) => void;
	children?: ReactNode;
}
