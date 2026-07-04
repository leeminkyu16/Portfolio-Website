import { HudController } from "../ui/HudController";

function buildDom(): void {
	document.body.innerHTML = `
    <button id="galaxy-back-btn" class="galaxy-back-btn galaxy-back-btn--hidden">← Back</button>
    <span id="galaxy-breadcrumb-section" class="galaxy-breadcrumb__part galaxy-breadcrumb__part--hidden"></span>
    <span id="galaxy-breadcrumb-card" class="galaxy-breadcrumb__part galaxy-breadcrumb__part--hidden"></span>
    <p id="galaxy-hint" class="galaxy-hint"></p>
    <div id="galaxy-canvas-wrapper" class="galaxy-canvas-wrapper"></div>
  `;
}

describe("HudController", () => {
	let controller: HudController;

	beforeEach(() => {
		jest.useFakeTimers();
		buildDom();
		controller = new HudController();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	describe("showBackButton / hideBackButton", () => {
		it("showBackButton removes --hidden class", () => {
			controller.showBackButton(jest.fn());
			expect(
				document
					.getElementById("galaxy-back-btn")!
					.classList.contains("galaxy-back-btn--hidden"),
			).toBe(false);
		});

		it("hideBackButton adds --hidden class", () => {
			controller.showBackButton(jest.fn());
			controller.hideBackButton();
			expect(
				document
					.getElementById("galaxy-back-btn")!
					.classList.contains("galaxy-back-btn--hidden"),
			).toBe(true);
		});

		it("onClick is called when button is clicked", () => {
			const handler = jest.fn();
			controller.showBackButton(handler);
			document.getElementById("galaxy-back-btn")!.click();
			expect(handler).toHaveBeenCalledTimes(1);
		});

		it("replaces previous click handler on repeated showBackButton calls", () => {
			const first = jest.fn();
			const second = jest.fn();
			controller.showBackButton(first);
			controller.showBackButton(second);
			document.getElementById("galaxy-back-btn")!.click();
			expect(first).not.toHaveBeenCalled();
			expect(second).toHaveBeenCalledTimes(1);
		});
	});

	describe("setBreadcrumb", () => {
		it("shows section span when sectionTitle provided", () => {
			controller.setBreadcrumb("Experience");
			const span = document.getElementById("galaxy-breadcrumb-section")!;
			expect(
				span.classList.contains("galaxy-breadcrumb__part--hidden"),
			).toBe(false);
			expect(span.textContent).toBe("Experience");
		});

		it("shows card span when cardTitle provided", () => {
			controller.setBreadcrumb("Experience", "iOS Developer");
			const span = document.getElementById("galaxy-breadcrumb-card")!;
			expect(
				span.classList.contains("galaxy-breadcrumb__part--hidden"),
			).toBe(false);
			expect(span.textContent).toBe("iOS Developer");
		});

		it("hides both spans when called with no arguments", () => {
			controller.setBreadcrumb("Experience", "iOS Dev");
			controller.setBreadcrumb();
			expect(
				document
					.getElementById("galaxy-breadcrumb-section")!
					.classList.contains("galaxy-breadcrumb__part--hidden"),
			).toBe(true);
			expect(
				document
					.getElementById("galaxy-breadcrumb-card")!
					.classList.contains("galaxy-breadcrumb__part--hidden"),
			).toBe(true);
		});
	});

	describe("hint", () => {
		it("showHint removes --hidden class", () => {
			controller.showHint();
			expect(
				document
					.getElementById("galaxy-hint")!
					.classList.contains("galaxy-hint--hidden"),
			).toBe(false);
		});

		it("showHint with message updates text content", () => {
			controller.showHint("Custom hint text");
			expect(document.getElementById("galaxy-hint")!.textContent).toBe(
				"Custom hint text",
			);
		});

		it("showHint without message does not change text content", () => {
			document.getElementById("galaxy-hint")!.textContent =
				"existing text";
			controller.showHint();
			expect(document.getElementById("galaxy-hint")!.textContent).toBe(
				"existing text",
			);
		});

		it("hint auto-hides after 5000ms", () => {
			controller.showHint();
			jest.advanceTimersByTime(5000);
			expect(
				document
					.getElementById("galaxy-hint")!
					.classList.contains("galaxy-hint--hidden"),
			).toBe(true);
		});

		it("hideHint adds --hidden class immediately", () => {
			controller.showHint();
			controller.hideHint();
			expect(
				document
					.getElementById("galaxy-hint")!
					.classList.contains("galaxy-hint--hidden"),
			).toBe(true);
		});
	});

	describe("dimScene / undimScene", () => {
		it("dimScene adds galaxy-scene--dimmed class", () => {
			controller.dimScene();
			expect(
				document
					.getElementById("galaxy-canvas-wrapper")!
					.classList.contains("galaxy-scene--dimmed"),
			).toBe(true);
		});

		it("undimScene removes galaxy-scene--dimmed class", () => {
			controller.dimScene();
			controller.undimScene();
			expect(
				document
					.getElementById("galaxy-canvas-wrapper")!
					.classList.contains("galaxy-scene--dimmed"),
			).toBe(false);
		});
	});
});
