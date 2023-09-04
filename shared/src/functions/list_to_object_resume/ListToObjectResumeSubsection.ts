import { ListResumeSubsection } from "./../../types/list_resume/ListResumeSubsection";
import { ObjectResumeSubsection } from "./../../types/object_resume/ObjectResumeSubsection";
import { listToObjectResumeUniqueId } from "./general/ListToObjectResumeUniqueId";
import { listToObjectResumeSubsectionCardSize } from "./ListToObjectResumeSubsectionCardSize";
import { listToObjectResumeSubsectionData } from "./ListToObjectResumeSubsectionData";
import { listToObjectResumeSubsectionTemplate } from "./ListToObjectResumeSubsectionTemplate";
import { listToObjectResumeSubsectionTitle } from "./ListToObjectResumeSubsectionTitle";

export const listToObjectResumeSubsection = (
    input: ListResumeSubsection,
): ObjectResumeSubsection => {
    const output: ObjectResumeSubsection = {
        uniqueId: listToObjectResumeUniqueId(input[0]),
        title: listToObjectResumeSubsectionTitle(input[1]),
        cardSize: listToObjectResumeSubsectionCardSize(input[2]),
        template: listToObjectResumeSubsectionTemplate(input[3]),
        data: listToObjectResumeSubsectionData(input[4], input[3]),
    };

    return output;
};
