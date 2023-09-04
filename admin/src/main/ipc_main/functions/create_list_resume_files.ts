import fs from "fs";
import path from "path";
import { IpcMainEvent, dialog } from "electron";
import { objectToListFileResume, ObjectResume } from "portfolio-website-shared";

const createListResumeFiles = (event: IpcMainEvent, objectResume: ObjectResume): void => {
	const filePath: string[] | undefined = dialog.showOpenDialogSync({
		title: "Select a Directory to Save Object Resume Files To.",
		buttonLabel: "Select",
		properties: ["openDirectory", "createDirectory"],
	});

	if (filePath !== undefined && filePath.length === 1) {
		const outputMap = new Map();
		objectToListFileResume(outputMap, objectResume, filePath[0], 0, {
			indentSize: 4,
		});

		outputMap.forEach((value, key): void => {
			const pathDirectory = path.parse(key).dir;

			if (!fs.existsSync(pathDirectory)) {
				fs.mkdirSync(pathDirectory, { recursive: true });
			}
			fs.writeFileSync(key, value);
		});
	}
};

export { createListResumeFiles };
