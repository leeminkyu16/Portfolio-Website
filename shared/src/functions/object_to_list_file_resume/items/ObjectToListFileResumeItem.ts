import { ObjectResumeHeading1WithLinkItem } from "../../../types/object_resume/items/ObjectResumeHeading1WithLinkItem";
import { ObjectResumeSubsectionTemplateItem } from "./../../../types/object_resume/ObjectResumeSubsectionTemplateItem";
import { ObjectResumeHeading1Item } from "./../../../types/object_resume/items/ObjectResumeHeading1Item";
import { ObjectResumeHeading2Item } from "./../../../types/object_resume/items/ObjectResumeHeading2Item";
import { ObjectResumeHtmlListItem } from "./../../../types/object_resume/items/ObjectResumeHtmlListItem";
import { ObjectResumeHtmlTextItem } from "./../../../types/object_resume/items/ObjectResumeHtmlTextItem";
import { ObjectResumeItem } from "./../../../types/object_resume/items/ObjectResumeItem";
import { ObjectResumeListItem } from "./../../../types/object_resume/items/ObjectResumeListItem";
import { ObjectResumeStartEndDateItem } from "./../../../types/object_resume/items/ObjectResumeStartEndDateItem";
import { ObjectResumeTextItem } from "./../../../types/object_resume/items/ObjectResumeTextItem";
import { ObjectResumeTextTitlePairItem } from "./../../../types/object_resume/items/ObjectResumeTextTitlePairItem";
import { objectToListFileResumeHeading1Item } from "./ObjectToListFileResumeHeading1Item";
import { objectToListFileResumeHeading1WithLinkItem } from "./ObjectToListFileResumeHeading1WithLinkItem";
import { objectToListFileResumeHeading2Item } from "./ObjectToListFileResumeHeading2Item";
import { objectToListFileResumeHtmlListItem } from "./ObjectToListFileResumeHtmlListItem";
import { objectToListFileResumeHtmlTextItem } from "./ObjectToListFileResumeHtmlTextItem";
import { objectToListFileResumeListItem } from "./ObjectToListFileResumeListItem";
import { objectToListFileResumeStartEndDateItem } from "./ObjectToListFileResumeStartEndDateItem";
import { objectToListFileResumeTextItem } from "./ObjectToListFileResumeTextItem";
import { objectToListFileResumeTextTitlePairItem } from "./ObjectToListFileResumeTextTitlePairItem";

export const objectToListFileResumeItem = (
    input: ObjectResumeItem,
    itemType: ObjectResumeSubsectionTemplateItem,
    indentLevel = 0,
    indentSize = 4,
    nested = false,
    suffix = "",
): string => {
    switch (itemType.itemType) {
        case "Heading1":
            return objectToListFileResumeHeading1Item(
                input as ObjectResumeHeading1Item,
                indentLevel,
                indentSize,
                nested,
                suffix,
            );
        case "Heading1WithLink":
            return objectToListFileResumeHeading1WithLinkItem(
                input as ObjectResumeHeading1WithLinkItem,
                indentLevel,
                indentSize,
                nested,
                suffix,
            );
        case "Heading2":
            return objectToListFileResumeHeading2Item(
                input as ObjectResumeHeading2Item,
                indentLevel,
                indentSize,
                nested,
                suffix,
            );
        case "StartEndDate":
            return objectToListFileResumeStartEndDateItem(
                input as ObjectResumeStartEndDateItem,
                indentLevel,
                indentSize,
                nested,
                suffix,
            );
        case "Text":
            return objectToListFileResumeTextItem(
                input as ObjectResumeTextItem,
                indentLevel,
                indentSize,
                nested,
                suffix,
            );
        case "HTMLText":
            return objectToListFileResumeHtmlTextItem(
                input as ObjectResumeHtmlTextItem,
                indentLevel,
                indentSize,
                nested,
                suffix,
            );
        case "TextTitlePair":
            return objectToListFileResumeTextTitlePairItem(
                input as ObjectResumeTextTitlePairItem,
                indentLevel,
                indentSize,
                nested,
                suffix,
            );
        case "List":
            return objectToListFileResumeListItem(
                input as ObjectResumeListItem,
                indentLevel,
                indentSize,
                nested,
                suffix,
            );
        case "HTMLList":
            return objectToListFileResumeHtmlListItem(
                input as ObjectResumeHtmlListItem,
                indentLevel,
                indentSize,
                nested,
                suffix,
            );
        default:
            return "";
    }
};
