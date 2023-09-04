import { ListResumeInternationalizedString } from "../../../types/list_resume/general/ListResumeInternationalizedString";
import { ObjectResumeInternationalizedString } from "../../../types/object_resume/general/ObjectResumeInternationalizedString";

export const listToObjectResumeInternationalizedString = (
    input: ListResumeInternationalizedString,
): ObjectResumeInternationalizedString => {
    const output: ObjectResumeInternationalizedString = {
        english: input[0],
        french: input[1],
    };

    return output;
};
