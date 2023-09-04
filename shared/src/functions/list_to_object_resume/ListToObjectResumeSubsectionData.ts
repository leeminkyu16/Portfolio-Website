import { ObjectResumeItemBundle } from "../../types/object_resume/ObjectResumeItemBundle";
import { ListResumeSubsectionData } from "./../../types/list_resume/ListResumeSubsectionData";
import { ListResumeSubsectionTemplate } from "./../../types/list_resume/ListResumeSubsectionTemplate";
import { ObjectResumeSubsectionData } from "./../../types/object_resume/ObjectResumeSubsectionData";
import { listToObjectResumeItemBundle } from "./ListToObjectResumeItemBundle";

export const listToObjectResumeSubsectionData = (
    input: ListResumeSubsectionData,
    template: ListResumeSubsectionTemplate,
): ObjectResumeSubsectionData => {
    const output: ObjectResumeSubsectionData = input.map(
        (inputItem, index: number): ObjectResumeItemBundle => {
            return listToObjectResumeItemBundle(inputItem, template, index);
        },
    );

    return output;
};
