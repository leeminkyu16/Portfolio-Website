import { ObjectResumeHeading1WithLinkItem } from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeHeading1WithLinkItemProps {
	heading1WithLinkItem: ObjectResumeHeading1WithLinkItem;
	onChange: (newHeading1WithLinkItem: ObjectResumeHeading1WithLinkItem) => void;
	children?: ReactNode;
}
