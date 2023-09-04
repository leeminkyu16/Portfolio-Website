import {
	ObjectResumeSubsectionTemplateItem,
	ObjectResumeTextTitlePairItem,
} from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeTextTitlePairItemProps {
	addUpdateObjectFunction: (updateObjectFunction: () => void) => void;
	textTitlePairItem: ObjectResumeTextTitlePairItem;
	textTitlePairTemplateItem: ObjectResumeSubsectionTemplateItem;
	children?: ReactNode;
}
