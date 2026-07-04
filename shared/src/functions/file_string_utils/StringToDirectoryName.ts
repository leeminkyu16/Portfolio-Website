export const stringToDirectoryName = (input: string): string => {
    // Lowercase, then collapse every run of non-alphanumeric characters
    // (whitespace, slashes, punctuation) into a single underscore and trim
    // stray leading/trailing underscores. For alphanumeric, space-separated
    // titles this matches the old whitespace-only replacement, but it also
    // keeps directory names safe for titles containing other characters.
    return input
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
};
