import { ObjectResumeSubsectionTemplate } from "../../types/object_resume/ObjectResumeSubsectionTemplate";
import { ObjectToListFileResumeOption } from "../../types/object_to_list_file_resume/ObjectToListFileResumeOptions";
import { stringToDirectoryName } from "../file_string_utils/StringToDirectoryName";
import { ObjectResumeSubsectionTemplateItem } from "./../../types/object_resume/ObjectResumeSubsectionTemplateItem";
import { getArrayLiteralLines } from "./../file_string_utils/GetArrayLiteralLines";
import { getExportStatementLine } from "./../file_string_utils/GetExportStatementLine";
import { getImportStatementLine } from "./../file_string_utils/GetImportStatementLine";
import { getStringLiteral } from "./../file_string_utils/GetStringLiteral";
import { getVariableDeclarationStatementLines } from "./../file_string_utils/GetVariableDeclarationStatementLines";
import { newLine } from "./../file_string_utils/NewLine";
import { stringToVariableName } from "./../file_string_utils/StringToVariableName";
import { objectToListFileInternationalizedString } from "./general/ObjectToListFileInternationalizedString";

export const objectToListFileResumeSubsectionTemplate = (
    output: Map<string, string>,
    objectResumeSubsectionTemplate: ObjectResumeSubsectionTemplate,
    subsectionUtilitarianName: string,
    pathCurrentDirectory: string,
    indentLevel: number,
    options: ObjectToListFileResumeOption,
): void => {
    let currentFileOutputString = "";

    currentFileOutputString += getImportStatementLine(
        "{ ListResumeSubsectionTemplate }",
        "../../../../types/list_resume/ListResumeSubsectionTemplate",
    );

    currentFileOutputString += newLine;

    currentFileOutputString += getVariableDeclarationStatementLines(
        `const ${stringToVariableName(
            subsectionUtilitarianName,
        )}Template: ListResumeSubsectionTemplate`,
        getArrayLiteralLines(
            objectResumeSubsectionTemplate.map(
                (
                    objectResumeSubsectionTemplateItem: ObjectResumeSubsectionTemplateItem,
                ) => {
                    return getArrayLiteralLines(
                        [
                            objectResumeSubsectionTemplateItem.uniqueId.toFixed(),
                            getStringLiteral(
                                objectResumeSubsectionTemplateItem.itemType,
                            ),
                            ...(objectResumeSubsectionTemplateItem.additionalParam
                                ? [
                                      objectToListFileInternationalizedString(
                                          objectResumeSubsectionTemplateItem.additionalParam,
                                          indentLevel + 2,
                                          options.indentSize,
                                          true,
                                      ),
                                  ]
                                : []),
                        ],
                        indentLevel + 1,
                        options.indentSize,
                        true,
                    );
                },
            ),
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
        `${stringToVariableName(subsectionUtilitarianName)}Template`,
    );

    output.set(
        pathCurrentDirectory +
            `/${stringToDirectoryName(subsectionUtilitarianName)}_template.ts`,
        currentFileOutputString,
    );
};
