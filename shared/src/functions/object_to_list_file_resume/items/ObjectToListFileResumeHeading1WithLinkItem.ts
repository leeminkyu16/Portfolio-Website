import { ObjectResumeHeading1WithLinkItem } from "./../../../types/object_resume/items/ObjectResumeHeading1WithLinkItem";
import { getArrayLiteralLines } from "./../../file_string_utils/GetArrayLiteralLines";
import { getStringLiteral } from "./../../file_string_utils/GetStringLiteral";
import { objectToListFileInternationalizedString } from "./../general/ObjectToListFileInternationalizedString";

export const objectToListFileResumeHeading1WithLinkItem = (
    input: ObjectResumeHeading1WithLinkItem,
    indentLevel = 0,
    indentSize = 4,
    nested = false,
    suffix = "",
): string => {
    return getArrayLiteralLines(
        [
            objectToListFileInternationalizedString(
                input.text,
                indentLevel + 1,
                indentSize,
                nested,
                suffix,
            ),
            getStringLiteral(input.link),
        ],
        indentLevel,
        indentSize,
        nested,
        suffix,
    );
};
