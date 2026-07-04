import { BrowserWindow } from "electron";
import { join as joinPath } from "path";
import url from "url";

export default function createMainWindow(isPackaged: boolean): BrowserWindow {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		minWidth: 640,
		minHeight: 480,
		title: "Portfolio Website Admin",
		backgroundColor: "#070715",
		show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			devTools: (process.env.NODE_ENV || "production") !== "production" || !isPackaged,
		},
	});

	// Avoid a white flash before the renderer paints; reveal once ready.
	win.once("ready-to-show", () => {
		win.show();
	});

	if (process.env.NODE_ENV !== "production") {
		process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1";
		win.loadURL(`http://localhost:2003`);
	} else {
		win.loadURL(
			url.format({
				pathname: joinPath(__dirname, "index.html"),
				protocol: "file:",
				slashes: true,
			}),
		);
	}

	if (process.env.NODE_ENV !== "production") {
		// Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
		win.webContents.once("dom-ready", () => {
			win!.webContents.openDevTools();
		});
	}

	return win;
}
