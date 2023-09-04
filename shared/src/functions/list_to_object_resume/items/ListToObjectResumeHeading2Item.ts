import { ListResumeHeading2Item } from "./../../../types/list_resume/items/ListResumeHeading2Item";
import { ObjectResumeHeading2Item } from "./../../../types/object_resume/items/ObjectResumeHeading2Item";
import { listToObjectResumeInternationalizedString } from "./../general/ListToObjectInternationalizedString";
export const listToObjectResumeHeading2Item = (
    input: ListResumeHeading2Item,
): ObjectResumeHeading2Item => {
    const output: ObjectResumeHeading2Item =
        listToObjectResumeInternationalizedString(input);

    return output;
};
