import { objectToListFileInternationalizedString } from "../general/ObjectToListFileInternationalizedString";
import { ObjectResumeTextTitlePairItem } from "./../../../types/object_resume/items/ObjectResumeTextTitlePairItem";

export const objectToListFileResumeTextTitlePairItem = (
    input: ObjectResumeTextTitlePairItem,
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
