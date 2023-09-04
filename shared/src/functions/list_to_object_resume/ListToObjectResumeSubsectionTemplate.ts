import { ListResumeSubsectionTemplate } from "./../../types/list_resume/ListResumeSubsectionTemplate";
import { ListResumeSubsectionTemplateItem } from "./../../types/list_resume/ListResumeSubsectionTemplateItem";
import { ObjectResumeSubsectionTemplate } from "./../../types/object_resume/ObjectResumeSubsectionTemplate";
import { listToObjectResumeSubsectionTemplateItem } from "./ListToObjectResumeSubsectionTemplateItem";
export const listToObjectResumeSubsectionTemplate = (
    input: ListResumeSubsectionTemplate,
): ObjectResumeSubsectionTemplate => {
    const output: ObjectResumeSubsectionTemplate = input.map(
        (inputItem: ListResumeSubsectionTemplateItem) => {
            return listToObjectResumeSubsectionTemplateItem(inputItem);
        },
    );

    return output;
};
