export const booleanToString = (input: boolean): string => {
	return input ? "true" : "false";
};

export const stringToBoolean = (
	input: string | null,
	defaultValue = false,
): boolean => {
	if (input === "true") {
		return true;
	} else if (input === "false") {
		return false;
	}
	return defaultValue;
};
