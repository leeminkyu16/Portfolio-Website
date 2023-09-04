const switchElements = <T>(
	inputArray: T[],
	updateArray: (newArray: T[]) => void,
	index1: number,
	index2: number,
): void => {
	if (index1 >= 0 && index1 < inputArray.length && index2 >= 0 && index2 < inputArray.length) {
		const inputArrayCopy: T[] = [...inputArray];

		inputArrayCopy[index1] = inputArray[index2];
		inputArrayCopy[index2] = inputArray[index1];

		updateArray(inputArrayCopy);
	}
};

export { switchElements };
