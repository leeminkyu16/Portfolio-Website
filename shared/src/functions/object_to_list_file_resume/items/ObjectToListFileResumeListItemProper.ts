import { getArrayLiteralLines } from "../../file_string_utils/GetArrayLiteralLines";
import { objectToListFileInternationalizedString } from "../general/ObjectToListFileInternationalizedString";
import { ObjectResumeListItemProper } from "./../../../types/object_resume/items/ObjectResumeListItemProper";

export const objectToListFileResumeListItemProper = (
    input: ObjectResumeListItemProper,
    indentLevel = 0,
    indentSize = 4,
    nested = false,
    suffix = "",
): string => {
    return getArrayLiteralLines(
        [
            input.uniqueId.toFixed(),
            objectToListFileInternationalizedString(
                input.text,
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
