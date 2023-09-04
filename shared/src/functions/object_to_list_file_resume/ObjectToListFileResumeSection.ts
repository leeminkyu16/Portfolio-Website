import { ObjectResumeSection } from "../../types/object_resume/ObjectResumeSection";
import { ObjectResumeSubsection } from "../../types/object_resume/ObjectResumeSubsection";
import { ObjectToListFileResumeOption } from "../../types/object_to_list_file_resume/ObjectToListFileResumeOptions";
import { getArrayLiteralLines } from "../file_string_utils/GetArrayLiteralLines";
import { getImportStatementLine } from "../file_string_utils/GetImportStatementLine";
import { getVariableDeclarationStatementLines } from "../file_string_utils/GetVariableDeclarationStatementLines";
import { getExportStatementLine } from "./../file_string_utils/GetExportStatementLine";
import { newLine } from "./../file_string_utils/NewLine";
import { stringToVariableName } from "./../file_string_utils/StringToVariableName";
import { objectToListFileResumeSubsection } from "./ObjectToListFileResumeSubsection";
import { objectToListFileInternationalizedString } from "./general/ObjectToListFileInternationalizedString";
import { objectResumeSubsectionTitleToDirectoryName } from "./utils/ObjectResumeSubsectionTitleToDirectoryName";
import { objectResumeSubsectionTitleToVariableName } from "./utils/ObjectResumeSubsectionTitleToVariableName";

export const objectToListFileResumeSection = (
    output: Map<string, string>,
    objectResumeSection: ObjectResumeSection,
    pathCurrentDirectory: string,
    indentLevel: number,
    options: ObjectToListFileResumeOption,
): void => {
    let currentFileOutputString = "";

    currentFileOutputString += getImportStatementLine(
        "{ ListResumeSection }",
        "../../../types/list_resume/ListResumeSection",
    );
    objectResumeSection.data.forEach(
        (objectResumeSubsection: ObjectResumeSubsection) => {
            const variableName = objectResumeSubsectionTitleToVariableName(
                objectResumeSubsection.title,
            );
            const directoryName = objectResumeSubsectionTitleToDirectoryName(
                objectResumeSubsection.title,
            );

            currentFileOutputString += getImportStatementLine(
                variableName,
                `./${directoryName}`,
            );
        },
    );

    currentFileOutputString += newLine;

    currentFileOutputString += getVariableDeclarationStatementLines(
        `const ${stringToVariableName(
            objectResumeSection.title.english,
        )}: ListResumeSection`,
        getArrayLiteralLines(
            [
                objectResumeSection.uniqueId.toFixed(),
                objectToListFileInternationalizedString(
                    objectResumeSection.title,
                    indentLevel + 1,
                    options.indentSize,
                    true,
                ),
                getArrayLiteralLines(
                    objectResumeSection.data.map(
                        (objectResumeSubsection: ObjectResumeSubsection) => {
                            return objectResumeSubsectionTitleToVariableName(
                                objectResumeSubsection.title,
                            );
                        },
                    ),
                    indentLevel + 1,
                    options.indentSize,
                    true,
                ),
            ],
            indentLevel,
            options.indentSize,
            true,
            ";",
        ),
        indentLevel,
        options.indentSize,
    );

    currentFileOutputString += newLine;

    currentFileOutputString += getExportStatementLine(
        stringToVariableName(objectResumeSection.title.english),
    );

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
                indentLevel,
                options,
            );
        },
    );
};
