import { ListResumeSubsectionTemplateItem } from "./../../types/list_resume/ListResumeSubsectionTemplateItem";
import { ObjectResumeSubsectionTemplateItem } from "./../../types/object_resume/ObjectResumeSubsectionTemplateItem";
import { listToObjectResumeInternationalizedString } from "./general/ListToObjectInternationalizedString";
import { listToObjectResumeUniqueId } from "./general/ListToObjectResumeUniqueId";
export const listToObjectResumeSubsectionTemplateItem = (
    input: ListResumeSubsectionTemplateItem,
): ObjectResumeSubsectionTemplateItem => {
    const output: ObjectResumeSubsectionTemplateItem = {
        uniqueId: listToObjectResumeUniqueId(input[0]),
        itemType: input[1],
        additionalParam: input[2]
            ? listToObjectResumeInternationalizedString(input[2])
            : null,
    };

    return output;
};
