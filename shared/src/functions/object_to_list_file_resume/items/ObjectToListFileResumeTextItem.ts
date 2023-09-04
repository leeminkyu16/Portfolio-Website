import { ObjectResumeTextItem } from "./../../../types/object_resume/items/ObjectResumeTextItem";
import { objectToListFileInternationalizedString } from "./../general/ObjectToListFileInternationalizedString";

export const objectToListFileResumeTextItem = (
    input: ObjectResumeTextItem,
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
