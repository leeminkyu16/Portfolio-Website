import { getCodeStatementLine } from "./GetCodeStatementLine";
import { getStringLiteral } from "./GetStringLiteral";

export const getImportStatementLine = (
    variableText: string,
    path: string,
): string => {
    return getCodeStatementLine(
        `import ${variableText} from ${getStringLiteral(path)};`,
    );
};
