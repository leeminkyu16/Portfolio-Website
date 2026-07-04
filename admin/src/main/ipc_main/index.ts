import { IpcMain } from "electron";
import { createListResumeFiles } from "./functions/create_list_resume_files";
import { saveResumeJson } from "./functions/save_resume_json";
import { loadResumeJson } from "./functions/load_resume_json";

export const setIpcMainListeners: (ipcMain: IpcMain) => void = (ipcMain: IpcMain): void => {
	ipcMain.on("create-list-resume-files", createListResumeFiles);
	ipcMain.on("save-resume-json", saveResumeJson);
	ipcMain.on("load-resume-json", loadResumeJson);
};
