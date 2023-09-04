import { ObjectResumeInternationalizedString } from "../../../types/object_resume/general/ObjectResumeInternationalizedString";
import { stringToVariableName } from "../../file_string_utils/StringToVariableName";
import { objectResumeSubsectionTitleToUtilitarianName } from "./ObjectResumeSubsectionTitleToUtilitarianName";

export const objectResumeSubsectionTitleToVariableName = (
    input: ObjectResumeInternationalizedString,
): string => {
    return stringToVariableName(
        objectResumeSubsectionTitleToUtilitarianName(input),
    );
};
