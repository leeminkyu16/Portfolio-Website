import { ListResumeListItemProper } from "./../../../types/list_resume/items/ListResumeListItemProper";
import { ObjectResumeListItemProper } from "./../../../types/object_resume/items/ObjectResumeListItemProper";
import { listToObjectResumeInternationalizedString } from "./../general/ListToObjectInternationalizedString";
import { listToObjectResumeUniqueId } from "./../general/ListToObjectResumeUniqueId";
export const listToObjectResumeListItemProper = (
    input: ListResumeListItemProper,
): ObjectResumeListItemProper => {
    const output: ObjectResumeListItemProper = {
        uniqueId: listToObjectResumeUniqueId(input[0]),
        text: listToObjectResumeInternationalizedString(input[1]),
    };

    return output;
};
