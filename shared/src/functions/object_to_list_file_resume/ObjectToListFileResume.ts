import { ObjectResume } from "../../types/object_resume/ObjectResume";
import { ObjectResumeSection } from "../../types/object_resume/ObjectResumeSection";
import { ObjectToListFileResumeOption } from "../../types/object_to_list_file_resume/ObjectToListFileResumeOptions";
import { getExportStatementLine } from "../file_string_utils/GetExportStatementLine";
import { newLine } from "../file_string_utils/NewLine";
import { stringToDirectoryName } from "../file_string_utils/StringToDirectoryName";
import { stringToVariableName } from "../file_string_utils/StringToVariableName";
import { getImportStatementLine } from "./../file_string_utils/GetImportStatementLine";
import { objectToListFileResumeSection } from "./ObjectToListFileResumeSection";

export const objectToListFileResume = (
    output: Map<string, string>,
    objectResume: ObjectResume,
    pathCurrentDirectory: string,
    options: ObjectToListFileResumeOption,
): void => {
    const sectionVariableNames = objectResume.map(
        (objectResumeSection: ObjectResumeSection) =>
            stringToVariableName(objectResumeSection.title.english),
    );

    let currentFileOutputString = getImportStatementLine(
        "{ ListResume }",
        "../../types/list_resume/ListResume",
    );
    objectResume.forEach((objectResumeSection: ObjectResumeSection) => {
        currentFileOutputString += getImportStatementLine(
            stringToVariableName(objectResumeSection.title.english),
            `./${stringToDirectoryName(objectResumeSection.title.english)}`,
        );
    });

    currentFileOutputString += newLine;

    currentFileOutputString += `const resume: ListResume = [${sectionVariableNames.join(
        ", ",
    )}];\n`;

    currentFileOutputString += newLine;
    currentFileOutputString += getExportStatementLine("resume");

    output.set(pathCurrentDirectory + "/index.ts", currentFileOutputString);

    objectResume.forEach((objectResumeSection: ObjectResumeSection) => {
        objectToListFileResumeSection(
            output,
            objectResumeSection,
            pathCurrentDirectory +
                `/${stringToDirectoryName(objectResumeSection.title.english)}`,
            options,
        );
    });
};
