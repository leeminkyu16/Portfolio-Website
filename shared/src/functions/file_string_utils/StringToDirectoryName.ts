export const stringToDirectoryName = (input: string): string => {
    return input.toLowerCase().replace(" ", "_");
};
