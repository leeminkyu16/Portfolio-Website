import { ObjectResumeSubsection } from "../../types/object_resume/ObjectResumeSubsection";
import { ObjectToListFileResumeOption } from "../../types/object_to_list_file_resume/ObjectToListFileResumeOptions";
import { getExportStatementLine } from "./../file_string_utils/GetExportStatementLine";
import { getImportStatementLine } from "./../file_string_utils/GetImportStatementLine";
import { newLine } from "./../file_string_utils/NewLine";
import { objectToListFileResumeSubsectionData } from "./ObjectToListFileResumeSubsectionData";
import { objectToListFileResumeSubsectionTemplate } from "./ObjectToListFileResumeSubsectionTemplate";
import { objectResumeSubsectionTitleToDirectoryName } from "./utils/ObjectResumeSubsectionTitleToDirectoryName";
import { objectResumeSubsectionTitleToUtilitarianName } from "./utils/ObjectResumeSubsectionTitleToUtilitarianName";
import { objectResumeSubsectionTitleToVariableName } from "./utils/ObjectResumeSubsectionTitleToVariableName";

export const objectToListFileResumeSubsection = (
    output: Map<string, string>,
    objectResumeSubsection: ObjectResumeSubsection,
    pathCurrentDirectory: string,
    options: ObjectToListFileResumeOption,
): void => {
    const variableName = objectResumeSubsectionTitleToVariableName(
        objectResumeSubsection.title,
    );
    const directoryName = objectResumeSubsectionTitleToDirectoryName(
        objectResumeSubsection.title,
    );
    const indent = " ".repeat(options.indentSize);

    let currentFileOutputString = getImportStatementLine(
        "{ ListResumeSubsection }",
        "../../../../types/list_resume/ListResumeSubsection",
    );
    currentFileOutputString += getImportStatementLine(
        `${variableName}Template`,
        `./${directoryName}_template`,
    );
    currentFileOutputString += getImportStatementLine(
        `${variableName}Data`,
        `./${directoryName}_data`,
    );

    currentFileOutputString += newLine;

    // Array elements: uniqueId, inline title tuple, cardSize, then references
    // to the template and data variables imported above.
    const elements = [
        String(objectResumeSubsection.uniqueId),
        JSON.stringify([
            objectResumeSubsection.title.english,
            objectResumeSubsection.title.french,
        ]),
        JSON.stringify(objectResumeSubsection.cardSize),
        `${variableName}Template`,
        `${variableName}Data`,
    ];
    currentFileOutputString += `const ${variableName}: ListResumeSubsection = [\n${elements
        .map((element) => `${indent}${element},`)
        .join("\n")}\n];\n`;

    currentFileOutputString += newLine;

    currentFileOutputString += getExportStatementLine(variableName);

    output.set(pathCurrentDirectory + "/index.ts", currentFileOutputString);

    objectToListFileResumeSubsectionTemplate(
        output,
        objectResumeSubsection.template,
        objectResumeSubsectionTitleToUtilitarianName(
            objectResumeSubsection.title,
        ),
        pathCurrentDirectory,
        options,
    );

    objectToListFileResumeSubsectionData(
        output,
        objectResumeSubsection,
        pathCurrentDirectory,
        options,
    );
};
