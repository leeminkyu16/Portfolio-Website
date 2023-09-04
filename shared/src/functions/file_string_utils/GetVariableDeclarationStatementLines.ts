import { getCodeStatementLine } from "./GetCodeStatementLine";

export const getVariableDeclarationStatementLines = (
    variableText: string,
    variableContentLines: string,
    indentLevel = 0,
    indentSize = 4,
): string => {
    let output = "";

    output += getCodeStatementLine(
        variableText + " = ",
        indentLevel,
        indentSize,
        false,
    );
    output += getCodeStatementLine(
        variableContentLines,
        indentLevel,
        indentSize,
    );

    return output;
};
