export class HudController {
	private hintTimer: ReturnType<typeof setTimeout> | null = null;
	private backBtnHandler: (() => void) | null = null;

	setBreadcrumb(sectionTitle?: string, cardTitle?: string): void {
		const sectionEl = document.getElementById("galaxy-breadcrumb-section");
		const cardEl = document.getElementById("galaxy-breadcrumb-card");
		if (!sectionEl || !cardEl) return;

		if (sectionTitle) {
			sectionEl.textContent = sectionTitle;
			sectionEl.classList.remove("galaxy-breadcrumb__part--hidden");
		} else {
			sectionEl.classList.add("galaxy-breadcrumb__part--hidden");
		}

		if (cardTitle) {
			cardEl.textContent = cardTitle;
			cardEl.classList.remove("galaxy-breadcrumb__part--hidden");
		} else {
			cardEl.classList.add("galaxy-breadcrumb__part--hidden");
		}
	}

	showBackButton(onClick: () => void): void {
		const btn = document.getElementById("galaxy-back-btn");
		if (!btn) return;

		if (this.backBtnHandler) {
			btn.removeEventListener("click", this.backBtnHandler);
		}
		this.backBtnHandler = onClick;
		btn.addEventListener("click", this.backBtnHandler);
		btn.classList.remove("galaxy-back-btn--hidden");
	}

	hideBackButton(): void {
		const btn = document.getElementById("galaxy-back-btn");
		if (!btn) return;
		btn.classList.add("galaxy-back-btn--hidden");
		if (this.backBtnHandler) {
			btn.removeEventListener("click", this.backBtnHandler);
			this.backBtnHandler = null;
		}
	}

	showHint(message?: string): void {
		const hint = document.getElementById("galaxy-hint");
		if (!hint) return;
		if (message !== undefined) hint.textContent = message;
		hint.classList.remove("galaxy-hint--hidden");
		if (this.hintTimer) clearTimeout(this.hintTimer);
		this.hintTimer = setTimeout(() => this.hideHint(), 5000);
	}

	hideHint(): void {
		const hint = document.getElementById("galaxy-hint");
		if (!hint) return;
		hint.classList.add("galaxy-hint--hidden");
		if (this.hintTimer) {
			clearTimeout(this.hintTimer);
			this.hintTimer = null;
		}
	}

	dimScene(): void {
		document
			.getElementById("galaxy-canvas-wrapper")
			?.classList.add("galaxy-scene--dimmed");
	}

	undimScene(): void {
		document
			.getElementById("galaxy-canvas-wrapper")
			?.classList.remove("galaxy-scene--dimmed");
	}
}
