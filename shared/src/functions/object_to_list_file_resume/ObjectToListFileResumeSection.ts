import { ObjectResumeSection } from "../../types/object_resume/ObjectResumeSection";
import { ObjectResumeSubsection } from "../../types/object_resume/ObjectResumeSubsection";
import { ObjectToListFileResumeOption } from "../../types/object_to_list_file_resume/ObjectToListFileResumeOptions";
import { getImportStatementLine } from "../file_string_utils/GetImportStatementLine";
import { getExportStatementLine } from "./../file_string_utils/GetExportStatementLine";
import { newLine } from "./../file_string_utils/NewLine";
import { stringToVariableName } from "./../file_string_utils/StringToVariableName";
import { objectToListFileResumeSubsection } from "./ObjectToListFileResumeSubsection";
import { objectResumeSubsectionTitleToDirectoryName } from "./utils/ObjectResumeSubsectionTitleToDirectoryName";
import { objectResumeSubsectionTitleToVariableName } from "./utils/ObjectResumeSubsectionTitleToVariableName";

export const objectToListFileResumeSection = (
    output: Map<string, string>,
    objectResumeSection: ObjectResumeSection,
    pathCurrentDirectory: string,
    options: ObjectToListFileResumeOption,
): void => {
    const variableName = stringToVariableName(
        objectResumeSection.title.english,
    );
    const indent = " ".repeat(options.indentSize);
    const subsectionVariableNames = objectResumeSection.data.map(
        (objectResumeSubsection: ObjectResumeSubsection) =>
            objectResumeSubsectionTitleToVariableName(
                objectResumeSubsection.title,
            ),
    );

    let currentFileOutputString = getImportStatementLine(
        "{ ListResumeSection }",
        "../../../types/list_resume/ListResumeSection",
    );
    objectResumeSection.data.forEach(
        (objectResumeSubsection: ObjectResumeSubsection) => {
            currentFileOutputString += getImportStatementLine(
                objectResumeSubsectionTitleToVariableName(
                    objectResumeSubsection.title,
                ),
                `./${objectResumeSubsectionTitleToDirectoryName(
                    objectResumeSubsection.title,
                )}`,
            );
        },
    );

    currentFileOutputString += newLine;

    // Array elements: uniqueId, inline title tuple, then an array of references
    // to the subsection variables imported above.
    const subsectionList = `[${subsectionVariableNames.join(", ")}]`;
    const elements = [
        String(objectResumeSection.uniqueId),
        JSON.stringify([
            objectResumeSection.title.english,
            objectResumeSection.title.french,
        ]),
        subsectionList,
    ];
    currentFileOutputString += `const ${variableName}: ListResumeSection = [\n${elements
        .map((element) => `${indent}${element},`)
        .join("\n")}\n];\n`;

    currentFileOutputString += newLine;

    currentFileOutputString += getExportStatementLine(variableName);

    output.set(pathCurrentDirectory + "/index.ts", currentFileOutputString);

    objectResumeSection.data.forEach(
        (objectResumeSubsection: ObjectResumeSubsection) => {
            objectToListFileResumeSubsection(
                output,
                objectResumeSubsection,
                pathCurrentDirectory +
                    `/${objectResumeSubsectionTitleToDirectoryName(
                        objectResumeSubsection.title,
                    )}`,
                options,
            );
        },
    );
};
