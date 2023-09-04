import { ListResumeHeading1Item } from "./../../../types/list_resume/items/ListResumeHeading1Item";
import { ObjectResumeHeading1Item } from "./../../../types/object_resume/items/ObjectResumeHeading1Item";
import { listToObjectResumeInternationalizedString } from "./../general/ListToObjectInternationalizedString";

export const listToObjectResumeHeading1Item = (
    input: ListResumeHeading1Item,
): ObjectResumeHeading1Item => {
    const output: ObjectResumeHeading1Item =
        listToObjectResumeInternationalizedString(input);

    return output;
};
