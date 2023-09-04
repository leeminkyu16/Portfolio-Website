import { getArrayLiteralLines } from "../../file_string_utils/GetArrayLiteralLines";
import { objectToListFileInternationalizedString } from "../general/ObjectToListFileInternationalizedString";
import { ObjectResumeStartEndDateItem } from "./../../../types/object_resume/items/ObjectResumeStartEndDateItem";

export const objectToListFileResumeStartEndDateItem = (
    input: ObjectResumeStartEndDateItem,
    indentLevel = 0,
    indentSize = 4,
    nested = false,
    suffix = "",
): string => {
    return getArrayLiteralLines(
        [
            objectToListFileInternationalizedString(
                input.startDate,
                indentLevel + 1,
                indentSize,
                nested,
                suffix,
            ),
            objectToListFileInternationalizedString(
                input.endDate,
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
