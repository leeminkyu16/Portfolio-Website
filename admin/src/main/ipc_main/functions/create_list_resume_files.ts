import fs from "fs";
import path from "path";
import { IpcMainEvent, dialog } from "electron";
import { objectToListFileResume, ObjectResume } from "portfolio-website-shared";
import { validateObjectResume } from "./validate_object_resume";

const createListResumeFiles = (event: IpcMainEvent, objectResume: ObjectResume): void => {
	const filePath: string[] | undefined = dialog.showOpenDialogSync({
		title: "Select a Directory to Save Object Resume Files To.",
		buttonLabel: "Select",
		properties: ["openDirectory", "createDirectory"],
	});

	if (filePath !== undefined && filePath.length === 1) {
		const validationError = validateObjectResume(objectResume);
		if (validationError !== null) {
			event.reply("create-list-resume-files-reply", {
				success: false,
				error: `Validation failed: ${validationError}`,
			});
			return;
		}

		try {
			const outputMap = new Map();
			objectToListFileResume(outputMap, objectResume, filePath[0], {
				indentSize: 4,
			});

			outputMap.forEach((value, key): void => {
				const pathDirectory = path.parse(key).dir;

				if (!fs.existsSync(pathDirectory)) {
					fs.mkdirSync(pathDirectory, { recursive: true });
				}
				fs.writeFileSync(key, value);
			});

			event.reply("create-list-resume-files-reply", { success: true });
		} catch (err) {
			event.reply("create-list-resume-files-reply", {
				success: false,
				error: (err as Error).message,
			});
		}
	}
};

export { createListResumeFiles };
