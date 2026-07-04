import React from "react";
import { TextDecoder, TextEncoder } from "util";

// jsdom here lacks TextEncoder/TextDecoder, which react-dom/server needs.
if (typeof (global as { TextEncoder?: unknown }).TextEncoder === "undefined") {
	(global as { TextEncoder?: unknown }).TextEncoder = TextEncoder;
	(global as { TextDecoder?: unknown }).TextDecoder = TextDecoder;
}

// Verifies the core i18n wiring: ResumeCard renders the value for the active
// language and falls back to English when a translation is missing.
describe("ResumeCard language selection", () => {
	async function render(data: unknown, language: string): Promise<string> {
		const { renderToString } = await import("react-dom/server");
		const { Provider } = await import("react-redux");
		const { store } = await import("../../../state");
		const { settingsSliceActions } =
			await import("../../../state/SettingsSlice/SettingsSlice");
		const { ResumeCard } = await import("../ResumeCard");
		store.dispatch(settingsSliceActions.setLanguage(language as never));
		return renderToString(
			<Provider store={store}>
				<ResumeCard
					keyId="t"
					template={[[0, "Heading1"]] as never}
					data={data as never}
				/>
			</Provider>,
		);
	}

	const FULL = [
		["Software Engineer", "Ingénieur", "소프트웨어 엔지니어", "エンジニア"],
	];

	it("renders English for the default language", async () => {
		expect(await render(FULL, "english")).toContain("Software Engineer");
	});

	it("renders Korean when Korean is active", async () => {
		expect(await render(FULL, "korean")).toContain("소프트웨어 엔지니어");
	});

	it("renders Japanese when Japanese is active", async () => {
		expect(await render(FULL, "japanese")).toContain("エンジニア");
	});

	it("falls back to English when the active translation is missing", async () => {
		// Only [english, french] present — Japanese index is undefined.
		const partial = [["Software Engineer", "Ingénieur"]];
		expect(await render(partial, "japanese")).toContain(
			"Software Engineer",
		);
	});

	it("renders real resume data translated (Japanese work experience)", async () => {
		const { renderToString } = await import("react-dom/server");
		const { Provider } = await import("react-redux");
		const { store } = await import("../../../state");
		const { settingsSliceActions } =
			await import("../../../state/SettingsSlice/SettingsSlice");
		const { resumeArray } = await import("portfolio-website-shared");
		const { ResumeCard } = await import("../ResumeCard");
		// experience → work_experience → first card (iOS Developer).
		const subsection = resumeArray[0][2][0];
		const template = subsection[3];
		const data = subsection[4][0];
		store.dispatch(settingsSliceActions.setLanguage("japanese" as never));
		const html = renderToString(
			<Provider store={store}>
				<ResumeCard
					keyId="real"
					template={template as never}
					data={data as never}
				/>
			</Provider>,
		);
		expect(html).toContain("iOS 開発者");
	});
});
