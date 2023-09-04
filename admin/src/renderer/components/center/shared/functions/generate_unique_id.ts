const generateUniqueId = (uniqueIdArray: number[]): number => {
	let candidateUniqueId: number =
		uniqueIdArray.length > 0 ? uniqueIdArray[uniqueIdArray.length - 1] : 0;

	for (;;) {
		let isNotInList = true;
		const candidateUniqueIdCopy: number = candidateUniqueId;

		uniqueIdArray.forEach((uniqueIdElement: number): void => {
			isNotInList = isNotInList && uniqueIdElement !== candidateUniqueIdCopy;
		});

		if (isNotInList) {
			return candidateUniqueId;
		}

		candidateUniqueId += 1;
	}
};

export { generateUniqueId };
