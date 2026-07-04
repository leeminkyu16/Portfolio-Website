import { ObjectResumeHeading2Item } from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeHeading2ItemProps {
	heading2Item: ObjectResumeHeading2Item;
	onChange: (newHeading2Item: ObjectResumeHeading2Item) => void;
	children?: ReactNode;
}
