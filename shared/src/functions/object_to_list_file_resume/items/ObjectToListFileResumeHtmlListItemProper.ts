import { getArrayLiteralLines } from "../../file_string_utils/GetArrayLiteralLines";
import { ObjectResumeHtmlListItemProper } from "./../../../types/object_resume/items/ObjectResumeHtmlListItemProper";
import { objectToListFileInternationalizedString } from "./../general/ObjectToListFileInternationalizedString";
export const objectToListFileResumeHtmlListItemProper = (
    input: ObjectResumeHtmlListItemProper,
    indentLevel = 0,
    indentSize = 4,
    nested = false,
    suffix = "",
): string => {
    return getArrayLiteralLines(
        [
            input.uniqueId.toFixed(),
            objectToListFileInternationalizedString(
                input.htmlText,
                indentLevel + 1,
                indentSize,
                nested,
                suffix,
            ),
        ],
        indentLevel,
        indentSize,
        nested,
        suffix,
    );
};
