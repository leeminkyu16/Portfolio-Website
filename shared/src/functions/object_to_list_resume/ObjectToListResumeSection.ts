import { ListResumeSection } from "../../types/list_resume/ListResumeSection";
import { ObjectResumeSection } from "../../types/object_resume/ObjectResumeSection";
import { objectToListInternationalizedString } from "./general/ObjectToListResumeInternationalizedString";
import { objectToListResumeSubsection } from "./ObjectToListResumeSubsection";

// Inverse of listToObjectResumeSection: produces the ListResume tuple value for
// a section.
export const objectToListResumeSection = (
    input: ObjectResumeSection,
): ListResumeSection => {
    return [
        input.uniqueId,
        objectToListInternationalizedString(input.title),
        input.data.map(objectToListResumeSubsection),
    ];
};
