export const stringToVariableName = (input: string): string => {
    return input
        .split(" ")
        .map((word, index) => {
            switch (index) {
                case 0:
                    return word[0].toLowerCase() + word.substring(1);
                default:
                    return word[0].toUpperCase() + word.substring(1);
            }
        })
        .join("");
};
