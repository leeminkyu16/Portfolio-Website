import { ListResumeHtmlListItem } from "./../../../types/list_resume/items/ListResumeHtmlListItem";
import { ListResumeHtmlListItemProper } from "./../../../types/list_resume/items/ListResumeHtmlListItemProper";
import { ObjectResumeHtmlListItem } from "./../../../types/object_resume/items/ObjectResumeHtmlListItem";
import { listToObjectResumeHtmlListItemProper } from "./ListToObjectResumeHtmlListItemProper";
export const listToObjectResumeHtmlListItem = (
    input: ListResumeHtmlListItem,
): ObjectResumeHtmlListItem => {
    const output: ObjectResumeHtmlListItem = input.map(
        (inputItem: ListResumeHtmlListItemProper) => {
            return listToObjectResumeHtmlListItemProper(inputItem);
        },
    );

    return output;
};
