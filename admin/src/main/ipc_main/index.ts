import { IpcMain } from "electron";
import { createListResumeFiles } from "./functions/create_list_resume_files";

export const setIpcMainListeners: (ipcMain: IpcMain) => void = (ipcMain: IpcMain): void => {
	ipcMain.on("create-list-resume-files", createListResumeFiles);
};
