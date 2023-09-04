import { ObjectResumeListItemProper } from "../../../types/object_resume/items/ObjectResumeListItemProper";
import { getArrayLiteralLines } from "../../file_string_utils/GetArrayLiteralLines";
import { ObjectResumeListItem } from "./../../../types/object_resume/items/ObjectResumeListItem";
import { objectToListFileResumeListItemProper } from "./ObjectToListFileResumeListItemProper";

export const objectToListFileResumeListItem = (
    input: ObjectResumeListItem,
    indentLevel = 0,
    indentSize = 4,
    nested = false,
    suffix = "",
): string => {
    return getArrayLiteralLines(
        input.map(
            (
                objectResumeListItemProper: ObjectResumeListItemProper,
            ): string => {
                return objectToListFileResumeListItemProper(
                    objectResumeListItemProper,
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
