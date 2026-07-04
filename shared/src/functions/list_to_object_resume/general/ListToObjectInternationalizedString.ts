import { ListResumeInternationalizedString } from "../../../types/list_resume/general/ListResumeInternationalizedString";
import { ObjectResumeInternationalizedString } from "../../../types/object_resume/general/ObjectResumeInternationalizedString";

export const listToObjectResumeInternationalizedString = (
    input: ListResumeInternationalizedString,
): ObjectResumeInternationalizedString => {
    const english = input[0];
    const output: ObjectResumeInternationalizedString = {
        english,
        // `||` (not `??`) so a missing OR empty ("") translation falls back to
        // English, matching how the frontend selects a value.
        french: input[1] || english,
        korean: input[2] || english,
        japanese: input[3] || english,
    };

    return output;
};
