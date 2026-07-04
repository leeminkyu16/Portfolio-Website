import { PanelController } from "../ui/PanelController";

function buildDom(): void {
	document.body.innerHTML = `
    <div id="galaxy-panels">
      <article id="galaxy-panel-si0-ssi0-ci0"
        class="galaxy-panel galaxy-panel--hidden"
        data-accent="#6366f1"
        style="--galaxy-accent:#6366f1">
      </article>
      <article id="galaxy-panel-si1-ssi0-ci0"
        class="galaxy-panel galaxy-panel--hidden"
        data-accent="#10b981"
        style="--galaxy-accent:#10b981">
      </article>
    </div>
  `;
}

function fireTransitionEnd(el: HTMLElement): void {
	el.dispatchEvent(new Event("transitionend"));
}

describe("PanelController", () => {
	let controller: PanelController;

	beforeEach(() => {
		buildDom();
		controller = new PanelController();
	});

	it("isOpen returns false initially", () => {
		expect(controller.isOpen()).toBe(false);
	});

	it("openPanel removes --hidden and adds --open", () => {
		controller.openPanel(0, 0, 0);
		const panel = document.getElementById("galaxy-panel-si0-ssi0-ci0")!;
		expect(panel.classList.contains("galaxy-panel--hidden")).toBe(false);
		expect(panel.classList.contains("galaxy-panel--open")).toBe(true);
	});

	it("openPanel resets scroll position", () => {
		const panel = document.getElementById("galaxy-panel-si0-ssi0-ci0")!;
		Object.defineProperty(panel, "scrollTop", {
			writable: true,
			value: 200,
		});
		controller.openPanel(0, 0, 0);
		expect(panel.scrollTop).toBe(0);
	});

	it("openPanel sets isOpen to true", () => {
		controller.openPanel(0, 0, 0);
		expect(controller.isOpen()).toBe(true);
	});

	it("closePanel removes --open immediately", () => {
		controller.openPanel(0, 0, 0);
		controller.closePanel();
		const panel = document.getElementById("galaxy-panel-si0-ssi0-ci0")!;
		expect(panel.classList.contains("galaxy-panel--open")).toBe(false);
	});

	it("closePanel adds --hidden after transitionend", () => {
		controller.openPanel(0, 0, 0);
		controller.closePanel();
		const panel = document.getElementById("galaxy-panel-si0-ssi0-ci0")!;
		expect(panel.classList.contains("galaxy-panel--hidden")).toBe(false); // not yet
		fireTransitionEnd(panel);
		expect(panel.classList.contains("galaxy-panel--hidden")).toBe(true);
	});

	it("closePanel sets isOpen to false", () => {
		controller.openPanel(0, 0, 0);
		controller.closePanel();
		expect(controller.isOpen()).toBe(false);
	});

	it("opening a second panel immediately removes --open from the first", () => {
		controller.openPanel(0, 0, 0);
		controller.openPanel(1, 0, 0);
		expect(
			document
				.getElementById("galaxy-panel-si0-ssi0-ci0")!
				.classList.contains("galaxy-panel--open"),
		).toBe(false);
		expect(
			document
				.getElementById("galaxy-panel-si1-ssi0-ci0")!
				.classList.contains("galaxy-panel--open"),
		).toBe(true);
	});

	it("first panel gets --hidden after transitionend when second is opened", () => {
		controller.openPanel(0, 0, 0);
		controller.openPanel(1, 0, 0);
		const panel0 = document.getElementById("galaxy-panel-si0-ssi0-ci0")!;
		fireTransitionEnd(panel0);
		expect(panel0.classList.contains("galaxy-panel--hidden")).toBe(true);
	});

	it("re-opening a panel does not apply --hidden after its transitionend", () => {
		controller.openPanel(0, 0, 0);
		controller.closePanel();
		controller.openPanel(0, 0, 0); // re-open before transitionend
		const panel = document.getElementById("galaxy-panel-si0-ssi0-ci0")!;
		fireTransitionEnd(panel);
		expect(panel.classList.contains("galaxy-panel--hidden")).toBe(false);
		expect(panel.classList.contains("galaxy-panel--open")).toBe(true);
	});

	it("getCurrentPanelId returns null when closed", () => {
		expect(controller.getCurrentPanelId()).toBeNull();
	});

	it("getCurrentPanelId returns correct id when open", () => {
		controller.openPanel(0, 0, 0);
		expect(controller.getCurrentPanelId()).toBe(
			"galaxy-panel-si0-ssi0-ci0",
		);
	});

	it("closePanel is a no-op when already closed", () => {
		expect(() => controller.closePanel()).not.toThrow();
	});
});
