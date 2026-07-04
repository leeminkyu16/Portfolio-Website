import { PanelController } from "../../galaxy/ui/PanelController";
import { StarPoint } from "../data/star-layout";
import { StarSky } from "./StarSky";

// Wires pointer / touch / keyboard / sidebar input to the sky renderer and the
// (reused) galaxy PanelController. The star view is a flat sky — no drill-down —
// so a card opens directly, and prev/next cycles within the clicked star's
// section constellation.
export class StarInteraction {
	private sky: StarSky;
	private panel: PanelController;
	private stars: StarPoint[];
	private canvas: HTMLCanvasElement;

	private currentIndex: number | null = null;
	private lastTouchMs = 0;
	private indexByKey = new Map<string, number>();

	private boundMove: (e: PointerEvent) => void;
	private boundDown: (e: PointerEvent) => void;
	private boundUp: (e: PointerEvent) => void;
	private boundKey: (e: KeyboardEvent) => void;
	private boundSidebarClick: (e: MouseEvent) => void;
	private boundSidebarKey: (e: KeyboardEvent) => void;
	private boundPanelClick: (e: MouseEvent) => void;
	private boundNavClick: (e: MouseEvent) => void;
	private boundBack: () => void;
	private downX = 0;
	private downY = 0;

	constructor(
		canvas: HTMLCanvasElement,
		sky: StarSky,
		panel: PanelController,
		stars: StarPoint[],
	) {
		this.canvas = canvas;
		this.sky = sky;
		this.panel = panel;
		this.stars = stars;
		stars.forEach((s, i) => {
			this.indexByKey.set(
				`${s.sectionArrayIndex}-${s.subsectionArrayIndex}-${s.cardIndex}`,
				i,
			);
		});

		this.boundMove = this.onMove.bind(this);
		this.boundDown = this.onDown.bind(this);
		this.boundUp = this.onUp.bind(this);
		this.boundKey = this.onKey.bind(this);
		this.boundSidebarClick = this.onSidebarClick.bind(this);
		this.boundSidebarKey = this.onSidebarKey.bind(this);
		this.boundPanelClick = this.onPanelClick.bind(this);
		this.boundNavClick = this.onNavClick.bind(this);
		this.boundBack = (): void => this.close();
	}

	attach(): void {
		this.canvas.addEventListener("pointermove", this.boundMove, {
			passive: true,
		});
		this.canvas.addEventListener("pointerdown", this.boundDown, {
			passive: true,
		});
		this.canvas.addEventListener("pointerup", this.boundUp, {
			passive: true,
		});
		window.addEventListener("keydown", this.boundKey);
		document
			.getElementById("stars-sidebar")
			?.addEventListener("click", this.boundSidebarClick);
		document
			.getElementById("stars-sidebar")
			?.addEventListener("keydown", this.boundSidebarKey);
		document
			.getElementById("galaxy-panels")
			?.addEventListener("click", this.boundPanelClick);
		document
			.getElementById("stars-panel-nav")
			?.addEventListener("click", this.boundNavClick);
		document
			.getElementById("stars-back-btn")
			?.addEventListener("click", this.boundBack);
		document
			.getElementById("stars-sidebar-toggle")
			?.addEventListener("click", this.boundToggleSidebar);
	}

	detach(): void {
		this.canvas.removeEventListener("pointermove", this.boundMove);
		this.canvas.removeEventListener("pointerdown", this.boundDown);
		this.canvas.removeEventListener("pointerup", this.boundUp);
		window.removeEventListener("keydown", this.boundKey);
		document
			.getElementById("stars-sidebar")
			?.removeEventListener("click", this.boundSidebarClick);
		document
			.getElementById("stars-sidebar")
			?.removeEventListener("keydown", this.boundSidebarKey);
		document
			.getElementById("galaxy-panels")
			?.removeEventListener("click", this.boundPanelClick);
		document
			.getElementById("stars-panel-nav")
			?.removeEventListener("click", this.boundNavClick);
		document
			.getElementById("stars-back-btn")
			?.removeEventListener("click", this.boundBack);
		document
			.getElementById("stars-sidebar-toggle")
			?.removeEventListener("click", this.boundToggleSidebar);
	}

	private boundToggleSidebar = (): void => {
		document
			.getElementById("stars-sidebar")
			?.classList.toggle("stars-sidebar--open");
	};

	private onMove(e: PointerEvent): void {
		if (this.panel.isOpen()) return;
		const idx = this.sky.hitTest(e.clientX, e.clientY);
		this.sky.setHovered(idx);
		this.canvas.style.cursor = idx === null ? "default" : "pointer";
		this.updateTooltip(idx, e.clientX, e.clientY);
	}

	private updateTooltip(idx: number | null, x: number, y: number): void {
		const tip = document.getElementById("stars-tooltip");
		if (!tip) return;
		if (idx === null) {
			tip.classList.remove("stars-tooltip--visible");
			return;
		}
		const star = this.stars[idx];
		tip.replaceChildren();
		const title = document.createElement("strong");
		title.textContent = star.label;
		tip.appendChild(title);
		if (star.meta) {
			const meta = document.createElement("span");
			meta.textContent = star.meta;
			tip.appendChild(meta);
		}
		tip.style.setProperty("--tip-color", star.color);
		tip.style.left = `${x + 16}px`;
		tip.style.top = `${y + 16}px`;
		tip.classList.add("stars-tooltip--visible");
	}

	private onDown(e: PointerEvent): void {
		this.downX = e.clientX;
		this.downY = e.clientY;
	}

	private onUp(e: PointerEvent): void {
		// Ignore drags — only treat near-stationary taps/clicks as selection.
		if (
			Math.abs(e.clientX - this.downX) > 8 ||
			Math.abs(e.clientY - this.downY) > 8
		) {
			return;
		}
		if (e.pointerType === "touch") this.lastTouchMs = Date.now();
		const idx = this.sky.hitTest(e.clientX, e.clientY);
		if (idx !== null) {
			this.openCard(idx);
		} else if (this.panel.isOpen()) {
			this.close();
		}
	}

	private sectionIndices(index: number): number[] {
		const si = this.stars[index].sectionArrayIndex;
		const out: number[] = [];
		this.stars.forEach((s, i) => {
			if (s.sectionArrayIndex === si) out.push(i);
		});
		return out;
	}

	private openCard(index: number): void {
		const star = this.stars[index];
		this.currentIndex = index;
		this.sky.setHovered(index);
		this.sky.select(index);
		this.panel.openPanel(
			star.sectionArrayIndex,
			star.subsectionArrayIndex,
			star.cardIndex,
		);
		this.setBreadcrumb(star.label);
		this.showBack(true);
		this.setActiveSidebarItem(star);
		this.hideHint();

		const group = this.sectionIndices(index);
		this.updateNav(group.indexOf(index), group.length);
		const tip = document.getElementById("stars-tooltip");
		tip?.classList.remove("stars-tooltip--visible");
		if (this.compact()) this.closeSidebar();
	}

	private close(): void {
		this.panel.closePanel();
		this.sky.select(null);
		this.sky.setHovered(null);
		this.currentIndex = null;
		this.setBreadcrumb(null);
		this.showBack(false);
		this.clearActiveSidebarItem();
		this.updateNav(0, 0);
	}

	private step(dir: number): void {
		if (this.currentIndex === null) return;
		const group = this.sectionIndices(this.currentIndex);
		const pos = group.indexOf(this.currentIndex);
		const next = group[(pos + dir + group.length) % group.length];
		this.openCard(next);
	}

	private onNavClick(e: MouseEvent): void {
		const btn = (e.target as HTMLElement).closest("button");
		if (!btn) return;
		if (btn.id === "stars-panel-prev") this.step(-1);
		else if (btn.id === "stars-panel-next") this.step(1);
	}

	private onPanelClick(e: MouseEvent): void {
		if ((e.target as HTMLElement).dataset.panelClose === "true") {
			this.close();
		}
	}

	private onKey(e: KeyboardEvent): void {
		if (e.key === "Escape" && this.panel.isOpen()) {
			this.close();
		} else if (this.panel.isOpen() && this.currentIndex !== null) {
			if (e.key === "ArrowRight" || e.key === "ArrowDown") {
				e.preventDefault();
				this.step(1);
			} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
				e.preventDefault();
				this.step(-1);
			}
		}
	}

	private onSidebarClick(e: MouseEvent): void {
		const item = (e.target as HTMLElement).closest(
			".stars-sidebar__item",
		) as HTMLElement | null;
		if (!item) return;
		const key = `${item.dataset.si}-${item.dataset.ssi}-${item.dataset.ci}`;
		const idx = this.indexByKey.get(key);
		if (idx !== undefined) this.openCard(idx);
	}

	private onSidebarKey(e: KeyboardEvent): void {
		if (e.key !== "Enter" && e.key !== " ") return;
		e.preventDefault();
		(e.target as HTMLElement).click();
	}

	// --- Small HUD helpers (stars- prefixed DOM) ----------------------------

	private setBreadcrumb(cardTitle: string | null): void {
		const el = document.getElementById("stars-breadcrumb-card");
		if (!el) return;
		if (cardTitle) {
			el.textContent = cardTitle;
			el.classList.remove("stars-breadcrumb__part--hidden");
		} else {
			el.classList.add("stars-breadcrumb__part--hidden");
		}
	}

	private showBack(show: boolean): void {
		document
			.getElementById("stars-back-btn")
			?.classList.toggle("stars-back-btn--hidden", !show);
	}

	private hideHint(): void {
		document
			.getElementById("stars-hint")
			?.classList.add("stars-hint--hidden");
	}

	private updateNav(index: number, total: number): void {
		const nav = document.getElementById("stars-panel-nav");
		const counter = document.getElementById("stars-panel-counter");
		if (!nav || !counter) return;
		counter.textContent = `${index + 1} / ${total}`;
		nav.classList.toggle("stars-panel-nav--hidden", total <= 1);
	}

	private setActiveSidebarItem(star: StarPoint): void {
		this.clearActiveSidebarItem();
		document
			.getElementById(
				`stars-sidebar-item-si${star.sectionArrayIndex}-ssi${star.subsectionArrayIndex}-ci${star.cardIndex}`,
			)
			?.classList.add("stars-sidebar__item--active");
	}

	private clearActiveSidebarItem(): void {
		document
			.querySelectorAll(".stars-sidebar__item--active")
			.forEach((el) =>
				el.classList.remove("stars-sidebar__item--active"),
			);
	}

	private closeSidebar(): void {
		document
			.getElementById("stars-sidebar")
			?.classList.remove("stars-sidebar--open");
	}

	private compact(): boolean {
		return window.matchMedia("(max-width: 767px)").matches;
	}
}
