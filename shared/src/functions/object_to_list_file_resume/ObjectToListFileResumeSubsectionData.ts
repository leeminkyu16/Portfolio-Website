import { ObjectResumeSubsection } from "../../types/object_resume/ObjectResumeSubsection";
import { ObjectToListFileResumeOption } from "../../types/object_to_list_file_resume/ObjectToListFileResumeOptions";
import { objectToListResumeSubsectionData } from "../object_to_list_resume/ObjectToListResumeSubsectionData";
import { getExportStatementLine } from "./../file_string_utils/GetExportStatementLine";
import { getImportStatementLine } from "./../file_string_utils/GetImportStatementLine";
import { newLine } from "./../file_string_utils/NewLine";
import { objectResumeSubsectionTitleToDirectoryName } from "./utils/ObjectResumeSubsectionTitleToDirectoryName";
import { objectResumeSubsectionTitleToVariableName } from "./utils/ObjectResumeSubsectionTitleToVariableName";

export const objectToListFileResumeSubsectionData = (
    output: Map<string, string>,
    objectResumeSubsection: ObjectResumeSubsection,
    pathCurrentDirectory: string,
    options: ObjectToListFileResumeOption,
): void => {
    const variableName = `${objectResumeSubsectionTitleToVariableName(
        objectResumeSubsection.title,
    )}Data`;
    const value = objectToListResumeSubsectionData(objectResumeSubsection);

    let currentFileOutputString = getImportStatementLine(
        "{ ListResumeSubsectionData }",
        "../../../../types/list_resume/ListResumeSubsectionData",
    );

    currentFileOutputString += newLine;

    currentFileOutputString += `const ${variableName}: ListResumeSubsectionData = ${JSON.stringify(
        value,
        null,
        options.indentSize,
    )};\n`;

    currentFileOutputString += newLine;

    currentFileOutputString += getExportStatementLine(variableName);

    output.set(
        pathCurrentDirectory +
            `/${objectResumeSubsectionTitleToDirectoryName(
                objectResumeSubsection.title,
            )}_data.ts`,
        currentFileOutputString,
    );
};
