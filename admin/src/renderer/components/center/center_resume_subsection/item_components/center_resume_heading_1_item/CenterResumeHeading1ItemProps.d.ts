import { ObjectResumeHeading1Item } from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeHeading1ItemProps {
	addUpdateObjectFunction: (updateObjectFunction: () => void) => void;
	heading1Item: ObjectResumeHeading1Item;
	children?: ReactNode;
}
