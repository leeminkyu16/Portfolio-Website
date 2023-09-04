import { ObjectResumeSubsection } from "../../types/object_resume/ObjectResumeSubsection";
import { ObjectToListFileResumeOption } from "../../types/object_to_list_file_resume/ObjectToListFileResumeOptions";
import { getArrayLiteralLines } from "../file_string_utils/GetArrayLiteralLines";
import { getImportStatementLine } from "../file_string_utils/GetImportStatementLine";
import { getVariableDeclarationStatementLines } from "../file_string_utils/GetVariableDeclarationStatementLines";
import { getExportStatementLine } from "./../file_string_utils/GetExportStatementLine";
import { getStringLiteral } from "./../file_string_utils/GetStringLiteral";
import { newLine } from "./../file_string_utils/NewLine";
import { objectToListFileResumeSubsectionData } from "./ObjectToListFileResumeSubsectionData";
import { objectToListFileResumeSubsectionTemplate } from "./ObjectToListFileResumeSubsectionTemplate";
import { objectToListFileInternationalizedString } from "./general/ObjectToListFileInternationalizedString";
import { objectResumeSubsectionTitleToDirectoryName } from "./utils/ObjectResumeSubsectionTitleToDirectoryName";
import { objectResumeSubsectionTitleToUtilitarianName } from "./utils/ObjectResumeSubsectionTitleToUtilitarianName";
import { objectResumeSubsectionTitleToVariableName } from "./utils/ObjectResumeSubsectionTitleToVariableName";

export const objectToListFileResumeSubsection = (
    output: Map<string, string>,
    objectResumeSubsection: ObjectResumeSubsection,
    pathCurrentDirectory: string,
    indentLevel: number,
    options: ObjectToListFileResumeOption,
): void => {
    let currentFileOutputString = "";

    currentFileOutputString += getImportStatementLine(
        "{ ListResumeSubsection }",
        "../../../../types/list_resume/ListResumeSubsection",
    );

    currentFileOutputString += getImportStatementLine(
        `${objectResumeSubsectionTitleToVariableName(
            objectResumeSubsection.title,
        )}Template`,
        `./${objectResumeSubsectionTitleToDirectoryName(
            objectResumeSubsection.title,
        )}_template`,
    );
    currentFileOutputString += getImportStatementLine(
        `${objectResumeSubsectionTitleToVariableName(
            objectResumeSubsection.title,
        )}Data`,
        `./${objectResumeSubsectionTitleToDirectoryName(
            objectResumeSubsection.title,
        )}_data`,
    );

    currentFileOutputString += newLine;

    currentFileOutputString += getVariableDeclarationStatementLines(
        `const ${objectResumeSubsectionTitleToVariableName(
            objectResumeSubsection.title,
        )}: ListResumeSubsection`,
        getArrayLiteralLines(
            [
                objectResumeSubsection.uniqueId.toFixed(),
                objectToListFileInternationalizedString(
                    objectResumeSubsection.title,
                    indentLevel + 1,
                    options.indentSize,
                    true,
                ),
                getStringLiteral(objectResumeSubsection.cardSize),
                `${objectResumeSubsectionTitleToVariableName(
                    objectResumeSubsection.title,
                )}Template`,
                `${objectResumeSubsectionTitleToVariableName(
                    objectResumeSubsection.title,
                )}Data`,
            ],
            indentLevel,
            options.indentSize,
            true,
        ),
        indentLevel,
        options.indentSize,
    );

    currentFileOutputString += newLine;

    currentFileOutputString += getExportStatementLine(
        objectResumeSubsectionTitleToVariableName(objectResumeSubsection.title),
    );

    output.set(pathCurrentDirectory + "/index.ts", currentFileOutputString);

    objectToListFileResumeSubsectionTemplate(
        output,
        objectResumeSubsection.template,
        objectResumeSubsectionTitleToUtilitarianName(
            objectResumeSubsection.title,
        ),
        pathCurrentDirectory,
        indentLevel,
        options,
    );

    objectToListFileResumeSubsectionData(
        output,
        objectResumeSubsection,
        pathCurrentDirectory,
        indentLevel,
        options,
    );
};
