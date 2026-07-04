import React from "react";
import { TextDecoder, TextEncoder } from "util";

// jsdom in this jest version lacks TextEncoder/TextDecoder, which
// react-dom/server.browser needs. Polyfill before it is required (below).
if (typeof (global as { TextEncoder?: unknown }).TextEncoder === "undefined") {
	(global as { TextEncoder?: unknown }).TextEncoder = TextEncoder;
	(global as { TextDecoder?: unknown }).TextDecoder = TextDecoder;
}

// SSR smoke test: the page must render to static markup without touching
// `window` (the canvas/init lives behind a useEffect + dynamic import). This is
// what Gatsby does at build time, so a pass here means the page is SSR-safe.
describe("StarsPage SSR", () => {
	let html: string;

	beforeAll(async () => {
		// Lazy imports so the TextEncoder polyfill above runs first.
		const { renderToString } = await import("react-dom/server");
		const { Provider } = await import("react-redux");
		const { store } = await import("../../state");
		const StarsPage = (await import("../../pages/stars")).default;
		// Gatsby wraps every page in <Provider> (gatsby-ssr/browser); mirror that
		// here so components that read the store (e.g. LanguageToggle) render.
		html = renderToString(
			<Provider store={store}>
				<StarsPage />
			</Provider>,
		);
	});

	it("renders the canvas mount and data script", () => {
		expect(html).toContain('id="stars-canvas"');
		expect(html).toContain('id="stars-resume-data"');
	});

	it("renders the reused galaxy panels container", () => {
		expect(html).toContain('id="galaxy-panels"');
		expect(html).toContain("galaxy-panel");
	});

	it("renders the three-way view switcher with cross-links", () => {
		expect(html).toContain('href="/galaxy"');
		expect(html).toContain('href="/"');
	});

	it("renders sidebar items carrying section/subsection/card indices", () => {
		expect(html).toContain("stars-sidebar__item");
		expect(html).toMatch(/data-si="0"/);
	});
});
