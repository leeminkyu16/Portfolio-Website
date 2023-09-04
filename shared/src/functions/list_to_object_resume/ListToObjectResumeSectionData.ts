import { ListResumeSectionData } from "./../../types/list_resume/ListResumeSectionData";
import { ListResumeSubsection } from "./../../types/list_resume/ListResumeSubsection";
import { ObjectResumeSectionData } from "./../../types/object_resume/ObjectResumeSectionData";
import { listToObjectResumeSubsection } from "./ListToObjectResumeSubsection";
export const listToObjectResumeSectionData = (
    input: ListResumeSectionData,
): ObjectResumeSectionData => {
    const output: ObjectResumeSectionData = input.map(
        (inputItem: ListResumeSubsection) => {
            return listToObjectResumeSubsection(inputItem);
        },
    );

    return output;
};
