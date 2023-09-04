import { ListResumeListItem } from "./../../../types/list_resume/items/ListResumeListItem";
import { ListResumeListItemProper } from "./../../../types/list_resume/items/ListResumeListItemProper";
import { ObjectResumeListItem } from "./../../../types/object_resume/items/ObjectResumeListItem";
import { listToObjectResumeListItemProper } from "./ListToObjectResumeListItemProper";
export const listToObjectResumeListItem = (
    input: ListResumeListItem,
): ObjectResumeListItem => {
    const output: ObjectResumeListItem = input.map(
        (inputItem: ListResumeListItemProper) => {
            return listToObjectResumeListItemProper(inputItem);
        },
    );

    return output;
};
