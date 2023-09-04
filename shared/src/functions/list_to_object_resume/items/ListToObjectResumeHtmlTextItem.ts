import { ListResumeHtmlTextItem } from "./../../../types/list_resume/items/ListResumeHtmlTextItem";
import { ObjectResumeHtmlTextItem } from "./../../../types/object_resume/items/ObjectResumeHtmlTextItem";
import { listToObjectResumeInternationalizedString } from "./../general/ListToObjectInternationalizedString";
export const listToObjectResumeHtmlTextItem = (
    input: ListResumeHtmlTextItem,
): ObjectResumeHtmlTextItem => {
    const output: ObjectResumeHtmlTextItem =
        listToObjectResumeInternationalizedString(input);

    return output;
};
