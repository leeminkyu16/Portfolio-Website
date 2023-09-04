import { ListResumeTextTitlePairItem } from "./../../../types/list_resume/items/ListResumeTextTitlePairItem";
import { ObjectResumeTextTitlePairItem } from "./../../../types/object_resume/items/ObjectResumeTextTitlePairItem";
import { listToObjectResumeInternationalizedString } from "./../general/ListToObjectInternationalizedString";
export const listToObjectResumeTextTitlePairItem = (
    input: ListResumeTextTitlePairItem,
): ObjectResumeTextTitlePairItem => {
    const output: ObjectResumeTextTitlePairItem =
        listToObjectResumeInternationalizedString(input);

    return output;
};
