import { ObjectResumeSubsection } from "../../types/object_resume/ObjectResumeSubsection";
import { ObjectToListFileResumeOption } from "../../types/object_to_list_file_resume/ObjectToListFileResumeOptions";
import { ObjectResumeItem } from "./../../types/object_resume/items/ObjectResumeItem";
import { getArrayLiteralLines } from "./../file_string_utils/GetArrayLiteralLines";
import { getExportStatementLine } from "./../file_string_utils/GetExportStatementLine";
import { getImportStatementLine } from "./../file_string_utils/GetImportStatementLine";
import { getVariableDeclarationStatementLines } from "./../file_string_utils/GetVariableDeclarationStatementLines";
import { newLine } from "./../file_string_utils/NewLine";
import { objectToListFileResumeItem } from "./items/ObjectToListFileResumeItem";
import { objectResumeSubsectionTitleToDirectoryName } from "./utils/ObjectResumeSubsectionTitleToDirectoryName";
import { objectResumeSubsectionTitleToVariableName } from "./utils/ObjectResumeSubsectionTitleToVariableName";

export const objectToListFileResumeSubsectionData = (
    output: Map<string, string>,
    objectResumeSubsection: ObjectResumeSubsection,
    pathCurrentDirectory: string,
    indentLevel: number,
    options: ObjectToListFileResumeOption,
): void => {
    let currentFileOutputString = "";

    currentFileOutputString += getImportStatementLine(
        "{ ListResumeSubsectionData }",
        "../../../../types/list_resume/ListResumeSubsectionData",
    );

    currentFileOutputString += newLine;

    currentFileOutputString += getVariableDeclarationStatementLines(
        `const ${objectResumeSubsectionTitleToVariableName(
            objectResumeSubsection.title,
        )}Data: ListResumeSubsectionData`,
        getArrayLiteralLines(
            objectResumeSubsection.data.map((value) => {
                return getArrayLiteralLines(
                    value.resumeItems.map(
                        (
                            objectResumeItem: ObjectResumeItem,
                            index: number,
                        ): string => {
                            return objectToListFileResumeItem(
                                objectResumeItem,
                                objectResumeSubsection.template[index],
                                indentLevel + 2,
                                options.indentSize,
                                true,
                                "",
                            );
                        },
                    ),
                    indentLevel + 1,
                    options.indentSize,
                    true,
                    "",
                );
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

    currentFileOutputString += getExportStatementLine(
        `${objectResumeSubsectionTitleToVariableName(
            objectResumeSubsection.title,
        )}Data`,
    );

    output.set(
        pathCurrentDirectory +
            `/${objectResumeSubsectionTitleToDirectoryName(
                objectResumeSubsection.title,
            )}_data.ts`,
        currentFileOutputString,
    );
};
