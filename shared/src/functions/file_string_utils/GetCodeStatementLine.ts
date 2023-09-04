export const getCodeStatementLine = (
    input: string,
    indentLevel = 0,
    indentSize = 4,
    withNewLine = true,
): string => {
    return (
        " ".repeat(indentLevel * indentSize) + input + (withNewLine ? "\n" : "")
    );
};
