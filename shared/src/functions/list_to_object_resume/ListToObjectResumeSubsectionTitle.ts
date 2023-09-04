import { ListResumeSubsectionTitle } from "./../../types/list_resume/ListResumeSubsectionTitle";
import { ObjectResumeSubsectionTitle } from "./../../types/object_resume/ObjectResumeSubsectionTitle";
import { listToObjectResumeInternationalizedString } from "./general/ListToObjectInternationalizedString";

export const listToObjectResumeSubsectionTitle = (
    input: ListResumeSubsectionTitle,
): ObjectResumeSubsectionTitle => {
    const output: ObjectResumeSubsectionTitle =
        listToObjectResumeInternationalizedString(input);

    return output;
};
