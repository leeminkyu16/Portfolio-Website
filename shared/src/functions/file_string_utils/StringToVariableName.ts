export const stringToVariableName = (input: string): string => {
    // Split on any run of non-alphanumeric characters (whitespace, slashes,
    // punctuation) and drop empty tokens, so the result is always a valid
    // identifier body. First word is lower-camel, the rest are capitalized.
    // For alphanumeric, space-separated titles this is identical to a plain
    // whitespace split.
    const variableName = input
        .split(/[^a-zA-Z0-9]+/)
        .filter((word) => word.length > 0)
        .map((word, index) => {
            const first =
                index === 0 ? word[0].toLowerCase() : word[0].toUpperCase();

            return first + word.substring(1);
        })
        .join("");

    // A JS identifier cannot start with a digit; prefix an underscore so a
    // title like "3D Modeling" still produces valid source.
    return /^[0-9]/.test(variableName) ? `_${variableName}` : variableName;
};
