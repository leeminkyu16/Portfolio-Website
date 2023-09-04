import { getCodeStatementLine } from "./GetCodeStatementLine";

export const getExportStatementLine = (variableText: string): string => {
    return getCodeStatementLine(`export default ${variableText};`);
};
