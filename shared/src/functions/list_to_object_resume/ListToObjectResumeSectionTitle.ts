import { ListResumeSectionTitle } from "./../../types/list_resume/ListResumeSectionTitle";
import { ObjectResumeSectionTitle } from "./../../types/object_resume/ObjectResumeSectionTitle";
import { listToObjectResumeInternationalizedString } from "./general/ListToObjectInternationalizedString";
export const listToObjectResumeSectionTitle = (
    input: ListResumeSectionTitle,
): ObjectResumeSectionTitle => {
    const output: ObjectResumeSectionTitle =
        listToObjectResumeInternationalizedString(input);

    return output;
};
