import { ObjectResumeSubsectionTemplate } from "../../types/object_resume/ObjectResumeSubsectionTemplate";
import { ObjectToListFileResumeOption } from "../../types/object_to_list_file_resume/ObjectToListFileResumeOptions";
import { stringToDirectoryName } from "../file_string_utils/StringToDirectoryName";
import { objectToListResumeSubsectionTemplate } from "../object_to_list_resume/ObjectToListResumeSubsectionTemplate";
import { getExportStatementLine } from "./../file_string_utils/GetExportStatementLine";
import { getImportStatementLine } from "./../file_string_utils/GetImportStatementLine";
import { newLine } from "./../file_string_utils/NewLine";
import { stringToVariableName } from "./../file_string_utils/StringToVariableName";

export const objectToListFileResumeSubsectionTemplate = (
    output: Map<string, string>,
    objectResumeSubsectionTemplate: ObjectResumeSubsectionTemplate,
    subsectionUtilitarianName: string,
    pathCurrentDirectory: string,
    options: ObjectToListFileResumeOption,
): void => {
    const variableName = `${stringToVariableName(
        subsectionUtilitarianName,
    )}Template`;
    const value = objectToListResumeSubsectionTemplate(
        objectResumeSubsectionTemplate,
    );

    let currentFileOutputString = getImportStatementLine(
        "{ ListResumeSubsectionTemplate }",
        "../../../../types/list_resume/ListResumeSubsectionTemplate",
    );

    currentFileOutputString += newLine;

    currentFileOutputString += `const ${variableName}: ListResumeSubsectionTemplate = ${JSON.stringify(
        value,
        null,
        options.indentSize,
    )};\n`;

    currentFileOutputString += newLine;

    currentFileOutputString += getExportStatementLine(variableName);

    output.set(
        pathCurrentDirectory +
            `/${stringToDirectoryName(subsectionUtilitarianName)}_template.ts`,
        currentFileOutputString,
    );
};
