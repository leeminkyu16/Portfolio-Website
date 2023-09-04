import { ListResumeTextItem } from "./../../../types/list_resume/items/ListResumeTextItem";
import { ObjectResumeTextItem } from "./../../../types/object_resume/items/ObjectResumeTextItem";
import { listToObjectResumeInternationalizedString } from "./../general/ListToObjectInternationalizedString";
export const listToObjectResumeTextItem = (
    input: ListResumeTextItem,
): ObjectResumeTextItem => {
    const output: ObjectResumeTextItem =
        listToObjectResumeInternationalizedString(input);

    return output;
};
