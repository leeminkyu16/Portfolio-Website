import { ListResumeInternationalizedString } from "../../../types/list_resume/general/ListResumeInternationalizedString";
import { ObjectResumeInternationalizedString } from "../../../types/object_resume/general/ObjectResumeInternationalizedString";

export const objectToListInternationalizedString = (
    input: ObjectResumeInternationalizedString,
): ListResumeInternationalizedString => {
    const output: ListResumeInternationalizedString = [
        input.english,
        input.french,
    ];

    return output;
};
