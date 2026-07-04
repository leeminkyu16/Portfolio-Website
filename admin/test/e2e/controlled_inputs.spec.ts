import { _electron as electron, ElectronApplication, Page } from "playwright";
import * as path from "path";

// End-to-end coverage for the controlled-input editing model. Launches the
// production build, edits a section title, and asserts the change flows
// input -> onChange -> immutable dispatch -> store -> LeftBar re-render.
// Any leftover in-place mutation would trip Immer's auto-freeze and surface as
// a page error, which is asserted away.

jest.setTimeout(60000);

const APP_ROOT = path.join(__dirname, "..", "..");
const MAIN = path.join(APP_ROOT, "dist", "main.js");
const TITLE_INPUT = 'input[aria-label="Title (English)"]';

describe("Admin — controlled inputs", () => {
	let app: ElectronApplication;
	let win: Page;
	const pageErrors: string[] = [];
	const consoleErrors: string[] = [];

	beforeAll(async () => {
		app = await electron.launch({
			args: [MAIN],
			cwd: APP_ROOT,
			env: { ...process.env, NODE_ENV: "production" },
		});

		// Window is created with show:false; force-show so it paints for interaction.
		await app.evaluate(({ BrowserWindow }) => {
			const w = BrowserWindow.getAllWindows()[0];
			if (w) w.show();
		});

		win = await app.firstWindow();
		win.on("pageerror", (error: Error) => pageErrors.push(String(error)));
		win.on("console", (message) => {
			if (message.type() === "error") consoleErrors.push(message.text());
		});

		await win.waitForSelector(TITLE_INPUT, { timeout: 20000 });
	});

	afterAll(async () => {
		if (app) await app.close();
	});

	it("binds the typed value and reflects it in the sidebar", async () => {
		const titleInput = win.locator(TITLE_INPUT).first();
		const newTitle = "E2E Controlled Proof";

		await titleInput.fill(newTitle);

		// Value sticks -> input is bound to store, not reset on re-render.
		expect(await titleInput.inputValue()).toBe(newTitle);

		// Sidebar button re-renders from the store -> full round-trip works.
		await win.waitForSelector(`button.section-text__button:has-text("${newTitle}")`, {
			timeout: 5000,
		});
	});

	it("accumulates sequential keystrokes without resetting", async () => {
		const titleInput = win.locator(TITLE_INPUT).first();

		await titleInput.fill("");
		await titleInput.pressSequentially("Hello", { delay: 15 });

		expect(await titleInput.inputValue()).toBe("Hello");
	});

	it("edits without any runtime or Immer-freeze errors", () => {
		expect(pageErrors).toEqual([]);
		expect(consoleErrors).toEqual([]);
	});
});
