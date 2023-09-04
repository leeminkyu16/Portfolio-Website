import { ObjectResumeInternationalizedString } from "../../../types/object_resume/general/ObjectResumeInternationalizedString";

export const objectResumeSubsectionTitleToUtilitarianName = (
    input: ObjectResumeInternationalizedString,
): string => {
    if (input.english in resumeSubsectionTitleToUtilitarianName) {
        return resumeSubsectionTitleToUtilitarianName[input.english];
    }

    return input.english;
};

const resumeSubsectionTitleToUtilitarianName: Record<string, string> = {
    "": "proper",
    "Programming/Markup Languages": "programming languages",
};
