import { ListResumeSubsection } from "../../types/list_resume/ListResumeSubsection";
import { ObjectResumeSubsection } from "../../types/object_resume/ObjectResumeSubsection";
import { objectToListInternationalizedString } from "./general/ObjectToListResumeInternationalizedString";
import { objectToListResumeSubsectionData } from "./ObjectToListResumeSubsectionData";
import { objectToListResumeSubsectionTemplate } from "./ObjectToListResumeSubsectionTemplate";

// Inverse of listToObjectResumeSubsection: produces the ListResume tuple value
// for a subsection.
export const objectToListResumeSubsection = (
    input: ObjectResumeSubsection,
): ListResumeSubsection => {
    return [
        input.uniqueId,
        objectToListInternationalizedString(input.title),
        input.cardSize,
        objectToListResumeSubsectionTemplate(input.template),
        objectToListResumeSubsectionData(input),
    ];
};
