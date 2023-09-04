import { ObjectResumeHeading2Item } from "./../../../types/object_resume/items/ObjectResumeHeading2Item";
import { objectToListFileInternationalizedString } from "./../general/ObjectToListFileInternationalizedString";

export const objectToListFileResumeHeading2Item = (
    input: ObjectResumeHeading2Item,
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
