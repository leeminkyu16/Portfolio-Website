import { ObjectResumeHeading2Item } from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeHeading2ItemProps {
	addUpdateObjectFunction: (updateObjectFunction: () => void) => void;
	heading2Item: ObjectResumeHeading2Item;
	children?: ReactNode;
}
