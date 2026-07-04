import fs from "fs";
import { IpcMainEvent, dialog } from "electron";

const loadResumeJson = (event: IpcMainEvent): void => {
	try {
		const filePaths: string[] | undefined = dialog.showOpenDialogSync({
			filters: [{ name: "JSON", extensions: ["json"] }],
			properties: ["openFile"],
		});

		if (filePaths !== undefined && filePaths.length === 1) {
			const content = fs.readFileSync(filePaths[0], "utf-8");
			const parsedJson: unknown = JSON.parse(content);
			event.reply("load-resume-json-reply", { success: true, data: parsedJson });
		}
	} catch (error) {
		event.reply("load-resume-json-reply", {
			success: false,
			error: String(error),
		});
	}
};

export { loadResumeJson };
