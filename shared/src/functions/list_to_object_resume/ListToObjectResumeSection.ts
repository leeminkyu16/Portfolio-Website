import { ListResumeSection } from "./../../types/list_resume/ListResumeSection";
import { ObjectResumeSection } from "./../../types/object_resume/ObjectResumeSection";
import { listToObjectResumeUniqueId } from "./general/ListToObjectResumeUniqueId";
import { listToObjectResumeSectionData } from "./ListToObjectResumeSectionData";
import { listToObjectResumeSectionTitle } from "./ListToObjectResumeSectionTitle";
export const listToObjectResumeSection = (
    input: ListResumeSection,
): ObjectResumeSection => {
    const output: ObjectResumeSection = {
        uniqueId: listToObjectResumeUniqueId(input[0]),
        title: listToObjectResumeSectionTitle(input[1]),
        data: listToObjectResumeSectionData(input[2]),
    };

    return output;
};
