import { ObjectResumeHeading1Item } from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeHeading1ItemProps {
	heading1Item: ObjectResumeHeading1Item;
	onChange: (newHeading1Item: ObjectResumeHeading1Item) => void;
	children?: ReactNode;
}
