import { ObjectResumeHeading1Item } from "./../../../types/object_resume/items/ObjectResumeHeading1Item";
import { objectToListFileInternationalizedString } from "./../general/ObjectToListFileInternationalizedString";

export const objectToListFileResumeHeading1Item = (
    input: ObjectResumeHeading1Item,
    indentLevel = 0,
    indentSize = 4,
    nested = false,
    suffix = "",
): string => {
    return objectToListFileInternationalizedString(
        input,
        indentLevel,
        indentSize,
        nested,
        suffix,
    );
};
