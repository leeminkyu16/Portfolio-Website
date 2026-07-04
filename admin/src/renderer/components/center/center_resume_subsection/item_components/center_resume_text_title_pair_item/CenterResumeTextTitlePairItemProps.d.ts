import {
	ObjectResumeSubsectionTemplateItem,
	ObjectResumeTextTitlePairItem,
} from "portfolio-website-shared";
import { ReactNode } from "react";

export interface CenterResumeTextTitlePairItemProps {
	textTitlePairItem: ObjectResumeTextTitlePairItem;
	textTitlePairTemplateItem: ObjectResumeSubsectionTemplateItem;
	onChange: (newTextTitlePairItem: ObjectResumeTextTitlePairItem) => void;
	children?: ReactNode;
}
