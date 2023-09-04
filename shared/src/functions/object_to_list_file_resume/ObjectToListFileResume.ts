import { ObjectResume } from "../../types/object_resume/ObjectResume";
import { ObjectResumeSection } from "../../types/object_resume/ObjectResumeSection";
import { ObjectToListFileResumeOption } from "../../types/object_to_list_file_resume/ObjectToListFileResumeOptions";
import { getArrayLiteralLines } from "../file_string_utils/GetArrayLiteralLines";
import { getExportStatementLine } from "../file_string_utils/GetExportStatementLine";
import { getVariableDeclarationStatementLines } from "../file_string_utils/GetVariableDeclarationStatementLines";
import { newLine } from "../file_string_utils/NewLine";
import { stringToDirectoryName } from "../file_string_utils/StringToDirectoryName";
import { stringToVariableName } from "../file_string_utils/StringToVariableName";
import { getImportStatementLine } from "./../file_string_utils/GetImportStatementLine";
import { objectToListFileResumeSection } from "./ObjectToListFileResumeSection";

export const objectToListFileResume = (
    output: Map<string, string>,
    objectResume: ObjectResume,
    pathCurrentDirectory: string,
    indentLevel: number,
    options: ObjectToListFileResumeOption,
): void => {
    let currentFileOutputString = "";

    currentFileOutputString += getImportStatementLine(
        "{ ListResume }",
        "../../types/list_resume/ListResume",
    );
    objectResume.forEach((objectResumeSection: ObjectResumeSection) => {
        const variableName = stringToVariableName(
            objectResumeSection.title.english,
        );
        const directoryName = stringToDirectoryName(
            objectResumeSection.title.english,
        );

        currentFileOutputString += getImportStatementLine(
            variableName,
            `./${directoryName}`,
        );
    });

    currentFileOutputString += newLine;

    currentFileOutputString += getVariableDeclarationStatementLines(
        "const resume: ListResume",
        getArrayLiteralLines(
            objectResume.map((objectResumeSection: ObjectResumeSection) => {
                return stringToVariableName(objectResumeSection.title.english);
            }),
            indentLevel,
            options.indentSize,
            true,
            ";",
        ),
        indentLevel,
        options.indentSize,
    );

    currentFileOutputString += newLine;
    currentFileOutputString += getExportStatementLine("resume");

    output.set(pathCurrentDirectory + "/index.ts", currentFileOutputString);

    objectResume.forEach((objectResumeSection: ObjectResumeSection) => {
        objectToListFileResumeSection(
            output,
            objectResumeSection,
            pathCurrentDirectory +
                `/${stringToDirectoryName(objectResumeSection.title.english)}`,
            indentLevel,
            options,
        );
    });
};
