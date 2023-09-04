import { getCodeStatementLine } from "./GetCodeStatementLine";

export const getArrayLiteralLines = (
    statements: string[],
    indentLevel = 0,
    indentSize = 4,
    nested = false,
    suffix = "",
): string => {
    let output = "";

    output += getCodeStatementLine("[", nested ? 0 : indentLevel, indentSize);

    statements.forEach((statement: string) => {
        output += getCodeStatementLine(
            statement + ",",
            indentLevel + 1,
            indentSize,
        );
    });

    output += getCodeStatementLine(
        `]${suffix}`,
        indentLevel,
        indentSize,
        !nested,
    );

    return output;
};
