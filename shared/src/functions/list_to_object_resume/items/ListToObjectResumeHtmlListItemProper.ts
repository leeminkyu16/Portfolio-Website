import { ListResumeHtmlListItemProper } from "./../../../types/list_resume/items/ListResumeHtmlListItemProper";
import { ObjectResumeHtmlListItemProper } from "./../../../types/object_resume/items/ObjectResumeHtmlListItemProper";
import { listToObjectResumeInternationalizedString } from "./../general/ListToObjectInternationalizedString";
import { listToObjectResumeUniqueId } from "./../general/ListToObjectResumeUniqueId";
export const listToObjectResumeHtmlListItemProper = (
    input: ListResumeHtmlListItemProper,
): ObjectResumeHtmlListItemProper => {
    const output: ObjectResumeHtmlListItemProper = {
        uniqueId: listToObjectResumeUniqueId(input[0]),
        htmlText: listToObjectResumeInternationalizedString(input[1]),
    };

    return output;
};
