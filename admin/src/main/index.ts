import { app, BrowserWindow, ipcMain } from "electron";

import { installExtensions } from "./helpers";
import { setIpcMainListeners } from "./ipc_main";
import createMainWindow from "./windows/mainwindow";

try {
	require("electron-reloader")(module);
	// eslint-disable-next-line no-empty
} catch {}

let win: BrowserWindow | null;

const createWindow = async () => {
	if (process.env.NODE_ENV !== "production") await installExtensions();

	win = createMainWindow(app.isPackaged);

	if (win) {
		win.on("closed", () => {
			win = null;
		});
	}
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
	if (win === null) createWindow();
});

setIpcMainListeners(ipcMain);
