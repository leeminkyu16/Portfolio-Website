import { ObjectResumeItem } from "../../types/object_resume/items/ObjectResumeItem";
import { ListResumeItem } from "./../../types/list_resume/items/ListResumeItem";
import { ListResumeItemBundle } from "./../../types/list_resume/ListResumeItemBundle";
import { ListResumeSubsectionTemplate } from "./../../types/list_resume/ListResumeSubsectionTemplate";
import { ObjectResumeItemBundle } from "./../../types/object_resume/ObjectResumeItemBundle";
import { listToObjectResumeItem } from "./items/ListToObjectResumeItem";

export const listToObjectResumeItemBundle = (
    input: ListResumeItemBundle,
    template: ListResumeSubsectionTemplate,
    index: number,
): ObjectResumeItemBundle => {
    const output: ObjectResumeItemBundle = {
        uniqueId: index,
        resumeItems: input.map(
            (inputItem: ListResumeItem, index: number): ObjectResumeItem => {
                return listToObjectResumeItem(inputItem, template[index]);
            },
        ),
    };

    return output;
};
