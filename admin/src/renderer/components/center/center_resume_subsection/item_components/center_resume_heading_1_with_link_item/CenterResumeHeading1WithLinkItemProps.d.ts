import { ObjectResumeHeading1WithLinkItem } from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeHeading1WithLinkItemProps {
	addUpdateObjectFunction: (updateObjectFunction: () => void) => void;
	heading1WithLinkItem: ObjectResumeHeading1WithLinkItem;
	children?: ReactNode;
}
