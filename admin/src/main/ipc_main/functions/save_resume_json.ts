import fs from "fs";
import { IpcMainEvent, dialog } from "electron";
import { ObjectResume } from "portfolio-website-shared";

const saveResumeJson = (event: IpcMainEvent, objectResume: ObjectResume): void => {
	try {
		const filePath: string | undefined = dialog.showSaveDialogSync({
			filters: [{ name: "JSON", extensions: ["json"] }],
		});

		if (filePath !== undefined) {
			fs.writeFileSync(filePath, JSON.stringify(objectResume, null, 2));
			event.reply("save-resume-json-reply", { success: true });
		}
	} catch (error) {
		event.reply("save-resume-json-reply", {
			success: false,
			error: String(error),
		});
	}
};

export { saveResumeJson };
