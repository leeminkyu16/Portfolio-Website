import { getArrayLiteralLines } from "../../file_string_utils/GetArrayLiteralLines";
import { getStringLiteral } from "../../file_string_utils/GetStringLiteral";
import { objectToListInternationalizedString } from "../../object_to_list_resume/general/ObjectToListResumeInternationalizedString";
import { ObjectResumeInternationalizedString } from "./../../../types/object_resume/general/ObjectResumeInternationalizedString";

export const objectToListFileInternationalizedString = (
    input: ObjectResumeInternationalizedString,
    indentLevel = 0,
    indentSize = 4,
    nested = false,
    suffix = "",
): string => {
    return getArrayLiteralLines(
        objectToListInternationalizedString(input).map((displayString) => {
            return getStringLiteral(displayString);
        }),
        indentLevel,
        indentSize,
        nested,
        suffix,
    );
};
