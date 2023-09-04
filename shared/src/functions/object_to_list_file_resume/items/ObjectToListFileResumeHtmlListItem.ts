import { ObjectResumeHtmlListItem } from "./../../../types/object_resume/items/ObjectResumeHtmlListItem";
import { ObjectResumeHtmlListItemProper } from "./../../../types/object_resume/items/ObjectResumeHtmlListItemProper";
import { getArrayLiteralLines } from "./../../file_string_utils/GetArrayLiteralLines";
import { objectToListFileResumeHtmlListItemProper } from "./ObjectToListFileResumeHtmlListItemProper";

export const objectToListFileResumeHtmlListItem = (
    input: ObjectResumeHtmlListItem,
    indentLevel = 0,
    indentSize = 4,
    nested = false,
    suffix = "",
): string => {
    return getArrayLiteralLines(
        input.map(
            (
                objectResumeHtmlListItemProper: ObjectResumeHtmlListItemProper,
            ): string => {
                return objectToListFileResumeHtmlListItemProper(
                    objectResumeHtmlListItemProper,
                    indentLevel + 1,
                    indentSize,
                    nested,
                    suffix,
                );
            },
        ),
        indentLevel,
        indentSize,
        nested,
        suffix,
    );
};
