export class PanelController {
	private currentPanelId: string | null = null;

	openPanel(
		sectionArrayIndex: number,
		subsectionArrayIndex: number,
		cardIndex: number,
	): void {
		if (this.currentPanelId) {
			this.closePanel();
		}

		const id = `galaxy-panel-si${sectionArrayIndex}-ssi${subsectionArrayIndex}-ci${cardIndex}`;
		const panel = document.getElementById(id);
		if (!panel) return;

		panel.classList.remove("galaxy-panel--hidden");
		// Force layout so the browser registers translateX(100%) as the start
		// position before the --open class triggers the slide-in transition.
		// Without this, display:none → block + transform change in the same tick
		// produces no animation.
		void panel.offsetHeight;
		panel.classList.add("galaxy-panel--open");
		panel.scrollTop = 0;
		this.currentPanelId = id;
		// Move keyboard focus into the panel so screen-reader / keyboard users
		// can reach the close button and content without tabbing through the HUD.
		const closeBtn = panel.querySelector<HTMLElement>("[data-panel-close]");
		closeBtn?.focus({ preventScroll: true });
	}

	closePanel(): void {
		if (!this.currentPanelId) return;
		const id = this.currentPanelId;
		const panel = document.getElementById(id);
		if (panel) {
			panel.classList.remove("galaxy-panel--open");
			// Hide after the slide-out transition completes. Guard against the race
			// where this panel is re-opened before transitionend fires (same id
			// would be the new currentPanelId).
			panel.addEventListener(
				"transitionend",
				() => {
					if (this.currentPanelId !== id) {
						panel.classList.add("galaxy-panel--hidden");
					}
				},
				{ once: true },
			);
		}
		this.currentPanelId = null;
	}

	isOpen(): boolean {
		return this.currentPanelId !== null;
	}

	getCurrentPanelId(): string | null {
		return this.currentPanelId;
	}
}
