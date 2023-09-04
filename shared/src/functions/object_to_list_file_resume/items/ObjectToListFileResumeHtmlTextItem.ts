import { ObjectResumeHtmlTextItem } from "../../../types/object_resume/items/ObjectResumeHtmlTextItem";
import { objectToListFileInternationalizedString } from "./../general/ObjectToListFileInternationalizedString";

export const objectToListFileResumeHtmlTextItem = (
    input: ObjectResumeHtmlTextItem,
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
