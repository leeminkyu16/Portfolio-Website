export const getStringLiteral = (input: string): string => {
    // JSON.stringify escapes quotes, backslashes, and control characters,
    // producing a string literal that is valid in both JSON and TypeScript
    // source. A naive `"${input}"` would break the generated file (or allow
    // template-literal injection) whenever the content contained a quote.
    return JSON.stringify(input);
};
