import { ListResumeSubsectionTemplateItem } from "../../../types/list_resume/ListResumeSubsectionTemplateItem";
import { ListResumeHeading1Item } from "../../../types/list_resume/items/ListResumeHeading1Item";
import { ListResumeHeading1WithLinkItem } from "../../../types/list_resume/items/ListResumeHeading1WithLinkItem";
import { ListResumeHeading2Item } from "../../../types/list_resume/items/ListResumeHeading2Item";
import { ListResumeHtmlListItem } from "../../../types/list_resume/items/ListResumeHtmlListItem";
import { ListResumeHtmlTextItem } from "../../../types/list_resume/items/ListResumeHtmlTextItem";
import { ListResumeListItem } from "../../../types/list_resume/items/ListResumeListItem";
import { ListResumeStartEndDateItem } from "../../../types/list_resume/items/ListResumeStartEndDateItem";
import { ListResumeTextItem } from "../../../types/list_resume/items/ListResumeTextItem";
import { ListResumeTextTitlePairItem } from "../../../types/list_resume/items/ListResumeTextTitlePairItem";
import { ListResumeItem } from "./../../../types/list_resume/items/ListResumeItem";
import { ObjectResumeInternationalizedString } from "./../../../types/object_resume/general/ObjectResumeInternationalizedString";
import { ObjectResumeItem } from "./../../../types/object_resume/items/ObjectResumeItem";
import { listToObjectResumeHeading1Item } from "./ListToObjectResumeHeading1Item";
import { listToObjectResumeHeading1WithLinkItem } from "./ListToObjectResumeHeading1WithLinkItem";
import { listToObjectResumeHeading2Item } from "./ListToObjectResumeHeading2Item";
import { listToObjectResumeHtmlListItem } from "./ListToObjectResumeHtmlListItem";
import { listToObjectResumeHtmlTextItem } from "./ListToObjectResumeHtmlTextItem";
import { listToObjectResumeListItem } from "./ListToObjectResumeListItem";
import { listToObjectResumeStartEndDateItem } from "./ListToObjectResumeStartEndDateItem";
import { listToObjectResumeTextItem } from "./ListToObjectResumeTextItem";
import { listToObjectResumeTextTitlePairItem } from "./ListToObjectResumeTextTitlePairItem";

export const listToObjectResumeItem = (
    input: ListResumeItem,
    itemType: ListResumeSubsectionTemplateItem,
): ObjectResumeItem => {
    switch (itemType[1]) {
        case "Heading1":
            return listToObjectResumeHeading1Item(
                input as ListResumeHeading1Item,
            );
        case "Heading1WithLink":
            return listToObjectResumeHeading1WithLinkItem(
                input as ListResumeHeading1WithLinkItem,
            );
        case "Heading2":
            return listToObjectResumeHeading2Item(
                input as ListResumeHeading2Item,
            );
        case "StartEndDate":
            return listToObjectResumeStartEndDateItem(
                input as ListResumeStartEndDateItem,
            );
        case "Text":
            return listToObjectResumeTextItem(input as ListResumeTextItem);
        case "HTMLText":
            return listToObjectResumeHtmlTextItem(
                input as ListResumeHtmlTextItem,
            );
        case "TextTitlePair":
            return listToObjectResumeTextTitlePairItem(
                input as ListResumeTextTitlePairItem,
            );
        case "List":
            return listToObjectResumeListItem(input as ListResumeListItem);
        case "HTMLList":
            return listToObjectResumeHtmlListItem(
                input as ListResumeHtmlListItem,
            );
        default:
            return {
                english: "",
                french: "",
            } as ObjectResumeInternationalizedString;
    }
};
