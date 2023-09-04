import { ObjectResumeInternationalizedString } from "../../../types/object_resume/general/ObjectResumeInternationalizedString";
import { stringToDirectoryName } from "../../file_string_utils/StringToDirectoryName";
import { objectResumeSubsectionTitleToUtilitarianName } from "./ObjectResumeSubsectionTitleToUtilitarianName";

export const objectResumeSubsectionTitleToDirectoryName = (
    input: ObjectResumeInternationalizedString,
): string => {
    return stringToDirectoryName(
        objectResumeSubsectionTitleToUtilitarianName(input),
    );
};
