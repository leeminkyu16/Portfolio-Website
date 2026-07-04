import { ListResumeItem } from "../../../types/list_resume/items/ListResumeItem";
import { ObjectResumeSubsectionTemplateItemType } from "../../../types/object_resume/ObjectResumeSubsectionTemplateItemType";
import { ObjectResumeInternationalizedString } from "../../../types/object_resume/general/ObjectResumeInternationalizedString";
import { ObjectResumeHeading1WithLinkItem } from "../../../types/object_resume/items/ObjectResumeHeading1WithLinkItem";
import { ObjectResumeHtmlListItem } from "../../../types/object_resume/items/ObjectResumeHtmlListItem";
import { ObjectResumeItem } from "../../../types/object_resume/items/ObjectResumeItem";
import { ObjectResumeListItem } from "../../../types/object_resume/items/ObjectResumeListItem";
import { ObjectResumeStartEndDateItem } from "../../../types/object_resume/items/ObjectResumeStartEndDateItem";
import { objectToListInternationalizedString } from "../general/ObjectToListResumeInternationalizedString";

// Inverse of listToObjectResumeItem: turns a runtime ObjectResumeItem back into
// the ListResume tuple value. Returns a plain data value (arrays/strings/
// numbers) so callers can serialize it with JSON.stringify.
export const objectToListResumeItem = (
    input: ObjectResumeItem,
    itemType: ObjectResumeSubsectionTemplateItemType,
): ListResumeItem => {
    switch (itemType) {
        case "Heading1":
        case "Heading2":
        case "Text":
        case "HTMLText":
        case "TextTitlePair":
            return objectToListInternationalizedString(
                input as ObjectResumeInternationalizedString,
            ) as ListResumeItem;
        case "Heading1WithLink": {
            const item = input as ObjectResumeHeading1WithLinkItem;

            return [
                objectToListInternationalizedString(item.text),
                item.link,
            ] as ListResumeItem;
        }
        case "StartEndDate": {
            const item = input as ObjectResumeStartEndDateItem;

            return [
                objectToListInternationalizedString(item.startDate),
                objectToListInternationalizedString(item.endDate),
            ] as ListResumeItem;
        }
        case "List":
            return (input as ObjectResumeListItem).map((proper) => [
                proper.uniqueId,
                objectToListInternationalizedString(proper.text),
            ]) as ListResumeItem;
        case "HTMLList":
            return (input as ObjectResumeHtmlListItem).map((proper) => [
                proper.uniqueId,
                objectToListInternationalizedString(proper.htmlText),
            ]) as ListResumeItem;
        default:
            throw new Error(
                `objectToListResumeItem: unknown item type "${itemType}"`,
            );
    }
};
