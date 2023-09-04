import { ObjectResumeItemBundle } from "portfolio-website-shared/src/types/object_resume/ObjectResumeItemBundle";
import { ObjectResumeSubsectionData } from "portfolio-website-shared/src/types/object_resume/ObjectResumeSubsectionData";
import { ObjectResumeSubsectionTemplate } from "portfolio-website-shared/src/types/object_resume/ObjectResumeSubsectionTemplate";
import { ObjectResumeSubsectionTemplateItem } from "portfolio-website-shared/src/types/object_resume/ObjectResumeSubsectionTemplateItem";
import { ObjectResumeHeading1Item } from "portfolio-website-shared/src/types/object_resume/items/ObjectResumeHeading1Item";
import { ObjectResumeItem } from "portfolio-website-shared/src/types/object_resume/items/ObjectResumeItem";
import { ObjectResumeHeading1WithLinkItem } from "portfolio-website-shared/src/types/object_resume/items/ObjectResumeHeading1WithLinkItem";
import { ObjectResumeHeading2Item } from "portfolio-website-shared/src/types/object_resume/items/ObjectResumeHeading2Item";
import { ObjectResumeHtmlListItem } from "portfolio-website-shared/src/types/object_resume/items/ObjectResumeHtmlListItem";
import { ObjectResumeHtmlTextItem } from "portfolio-website-shared/src/types/object_resume/items/ObjectResumeHtmlTextItem";
import { ObjectResumeListItem } from "portfolio-website-shared/src/types/object_resume/items/ObjectResumeListItem";
import { ObjectResumeStartEndDateItem } from "portfolio-website-shared/src/types/object_resume/items/ObjectResumeStartEndDateItem";
import { ObjectResumeTextItem } from "portfolio-website-shared/src/types/object_resume/items/ObjectResumeTextItem";
import { ObjectResumeTextTitlePairItem } from "portfolio-website-shared/src/types/object_resume/items/ObjectResumeTextTitlePairItem";
import { generateUniqueId } from "../../shared/functions/generate_unique_id";

const generateDefaultItemBundle = (
	resumeSubsectionData: ObjectResumeSubsectionData,
	resumeSubsectionTemplate: ObjectResumeSubsectionTemplate,
): ObjectResumeItemBundle => {
	return {
		uniqueId: generateUniqueId(
			resumeSubsectionData.map(
				(resumeItemBundle: ObjectResumeItemBundle): number => resumeItemBundle.uniqueId,
			),
		),
		resumeItems: resumeSubsectionTemplate.map(
			(templateItem: ObjectResumeSubsectionTemplateItem): ObjectResumeItem => {
				switch (templateItem.itemType) {
					case "Heading1":
						return { english: "", french: "" } as ObjectResumeHeading1Item;
					case "Heading1WithLink":
						return {
							text: { english: "", french: "" },
							link: "",
						} as ObjectResumeHeading1WithLinkItem;
					case "Heading2":
						return { english: "", french: "" } as ObjectResumeHeading2Item;
					case "StartEndDate":
						return {
							startDate: { english: "", french: "" },
							endDate: { english: "", french: "" },
						} as ObjectResumeStartEndDateItem;
					case "Text":
						return { english: "", french: "" } as ObjectResumeTextItem;
					case "HTMLText":
						return { english: "", french: "" } as ObjectResumeHtmlTextItem;
					case "TextTitlePair":
						return { english: "", french: "" } as ObjectResumeTextTitlePairItem;
					case "List":
						return [] as ObjectResumeListItem;
					case "HTMLList":
						return [] as ObjectResumeHtmlListItem;
					default:
						return { english: "", french: "" } as ObjectResumeItem;
				}
			},
		),
	};
};

export { generateDefaultItemBundle };
