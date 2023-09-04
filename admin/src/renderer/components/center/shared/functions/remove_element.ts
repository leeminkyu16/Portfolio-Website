const removeElement = <T>(
	inputArray: T[],
	updateArray: (newArray: T[]) => void,
	inputIndex: number,
): void => {
	if (inputIndex >= 0 && inputIndex < inputArray.length) {
		const inputArrayCopy = inputArray.filter((element, index): boolean => {
			return index !== inputIndex;
		});

		updateArray(inputArrayCopy);
	}
};

export { removeElement };
