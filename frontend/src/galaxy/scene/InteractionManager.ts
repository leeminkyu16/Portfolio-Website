import { Mesh, Raycaster, Vector2 } from "three";
import { HudController } from "../ui/HudController";
import { PanelController } from "../ui/PanelController";
import { SidebarController } from "../ui/SidebarController";
import { CameraController, CameraState } from "./CameraController";
import { ClusterData, ClusterManager } from "./ClusterManager";
import { GalaxyScene } from "./GalaxyScene";
import { StarData, StarManager } from "./StarManager";

export class InteractionManager {
	private galaxyScene: GalaxyScene;
	private clusterManager: ClusterManager;
	private starManager: StarManager;
	private cameraController: CameraController;
	private panelController: PanelController;
	private hudController: HudController;
	private sidebarController: SidebarController;

	private raycaster = new Raycaster();
	private mouse = new Vector2();
	private hoveredStar: StarData | null = null;
	private hoveredCluster: ClusterData | null = null;
	private currentOpenStar: StarData | null = null;
	private sectionStars: StarData[] = [];
	private currentStarIndex = 0;
	private touchStartX = 0;
	private touchStartY = 0;
	private lastTouchHandledMs = 0;

	private boundOnMouseMove: (e: MouseEvent) => void;
	private boundOnClick: (e: MouseEvent) => void;
	private boundOnKeyDown: (e: KeyboardEvent) => void;
	private boundOnTouchStart: (e: TouchEvent) => void;
	private boundOnTouchEnd: (e: TouchEvent) => void;
	private boundOnPanelTouchStart: (e: TouchEvent) => void;
	private boundOnPanelTouchEnd: (e: TouchEvent) => void;
	private boundOnPanelClick: (e: MouseEvent) => void;
	private boundOnSidebarClick: (e: MouseEvent) => void;
	private boundOnSidebarKeyDown: (e: KeyboardEvent) => void;
	private boundOnCssClick: (e: MouseEvent) => void;
	private boundOnSidebarToggle: () => void;
	private boundOnPanelNav: (e: MouseEvent) => void;

	constructor(
		galaxyScene: GalaxyScene,
		clusterManager: ClusterManager,
		starManager: StarManager,
		cameraController: CameraController,
		panelController: PanelController,
		hudController: HudController,
		sidebarController: SidebarController,
	) {
		this.galaxyScene = galaxyScene;
		this.clusterManager = clusterManager;
		this.starManager = starManager;
		this.cameraController = cameraController;
		this.panelController = panelController;
		this.hudController = hudController;
		this.sidebarController = sidebarController;

		this.boundOnMouseMove = this.onMouseMove.bind(this);
		this.boundOnClick = this.onClick.bind(this);
		this.boundOnKeyDown = this.onKeyDown.bind(this);
		this.boundOnTouchStart = this.onTouchStart.bind(this);
		this.boundOnTouchEnd = this.onTouchEnd.bind(this);
		this.boundOnPanelTouchStart = this.onPanelTouchStart.bind(this);
		this.boundOnPanelTouchEnd = this.onPanelTouchEnd.bind(this);
		this.boundOnPanelClick = this.onPanelClick.bind(this);
		this.boundOnSidebarClick = this.onSidebarClick.bind(this);
		this.boundOnSidebarKeyDown = this.onSidebarKeyDown.bind(this);
		this.boundOnCssClick = this.onCssClick.bind(this);
		this.boundOnSidebarToggle = (): void =>
			this.sidebarController.toggleSidebar();
		this.boundOnPanelNav = this.onPanelNav.bind(this);

		galaxyScene.addUpdateCallback((delta) => {
			cameraController.updateAutoOrbit(delta);
		});
	}

	attach(): void {
		const canvas = this.galaxyScene.webglRenderer.domElement;
		canvas.addEventListener("mousemove", this.boundOnMouseMove);
		canvas.addEventListener("click", this.boundOnClick);
		window.addEventListener("keydown", this.boundOnKeyDown);
		canvas.addEventListener("touchstart", this.boundOnTouchStart, {
			passive: true,
		});
		canvas.addEventListener("touchend", this.boundOnTouchEnd, {
			passive: true,
		});

		// Panel touch: swipe down closes the mobile bottom sheet; swipe right
		// closes the desktop side panel.
		document
			.getElementById("galaxy-panels")
			?.addEventListener("touchstart", this.boundOnPanelTouchStart, {
				passive: true,
			});
		document
			.getElementById("galaxy-panels")
			?.addEventListener("touchend", this.boundOnPanelTouchEnd, {
				passive: true,
			});
		// Close button inside panels
		document
			.getElementById("galaxy-panels")
			?.addEventListener("click", this.boundOnPanelClick);
		document
			.getElementById("galaxy-sidebar")
			?.addEventListener("click", this.boundOnSidebarClick);
		document
			.getElementById("galaxy-sidebar")
			?.addEventListener("keydown", this.boundOnSidebarKeyDown);
		// CSS3D cluster labels have pointer-events: auto and sit on the overlay,
		// so clicks on them don't reach the WebGL canvas listener. Handle them here.
		this.galaxyScene.css3dRenderer.domElement.addEventListener(
			"click",
			this.boundOnCssClick,
		);
		document
			.getElementById("galaxy-sidebar-toggle")
			?.addEventListener("click", this.boundOnSidebarToggle);
		document
			.getElementById("galaxy-panel-nav")
			?.addEventListener("click", this.boundOnPanelNav);
	}

	detach(): void {
		const canvas = this.galaxyScene.webglRenderer.domElement;
		canvas.removeEventListener("mousemove", this.boundOnMouseMove);
		canvas.removeEventListener("click", this.boundOnClick);
		window.removeEventListener("keydown", this.boundOnKeyDown);
		canvas.removeEventListener("touchstart", this.boundOnTouchStart);
		canvas.removeEventListener("touchend", this.boundOnTouchEnd);
		document
			.getElementById("galaxy-panels")
			?.removeEventListener("touchstart", this.boundOnPanelTouchStart);
		document
			.getElementById("galaxy-panels")
			?.removeEventListener("touchend", this.boundOnPanelTouchEnd);
		document
			.getElementById("galaxy-panels")
			?.removeEventListener("click", this.boundOnPanelClick);
		document
			.getElementById("galaxy-sidebar")
			?.removeEventListener("click", this.boundOnSidebarClick);
		document
			.getElementById("galaxy-sidebar")
			?.removeEventListener("keydown", this.boundOnSidebarKeyDown);
		this.galaxyScene.css3dRenderer.domElement.removeEventListener(
			"click",
			this.boundOnCssClick,
		);
		document
			.getElementById("galaxy-sidebar-toggle")
			?.removeEventListener("click", this.boundOnSidebarToggle);
		document
			.getElementById("galaxy-panel-nav")
			?.removeEventListener("click", this.boundOnPanelNav);
	}

	private onPanelClick(e: MouseEvent): void {
		const target = e.target as HTMLElement;
		if (target.dataset.panelClose === "true") {
			this.closePanel();
		}
	}

	private onPanelTouchStart(e: TouchEvent): void {
		if (e.touches.length === 0) return;
		this.touchStartX = e.touches[0].clientX;
		this.touchStartY = e.touches[0].clientY;
	}

	private onPanelTouchEnd(e: TouchEvent): void {
		if (
			e.changedTouches.length === 0 ||
			this.cameraController.state !== CameraState.Reading
		)
			return;
		const touch = e.changedTouches[0];
		const dx = touch.clientX - this.touchStartX;
		const dy = touch.clientY - this.touchStartY;
		// Bottom sheet on mobile → dismiss with a downward swipe; right side
		// panel on desktop → dismiss with a rightward swipe.
		if (InteractionManager.isMobile()) {
			if (dy > 70 && Math.abs(dx) < 120) {
				this.closePanel();
			}
		} else if (dx > 60 && Math.abs(dy) < 120) {
			this.closePanel();
		}
	}

	private onCssClick(e: MouseEvent): void {
		if (this.cameraController.state !== CameraState.Overview) return;
		const label = (e.target as HTMLElement).closest(
			".galaxy-cluster-label",
		) as HTMLElement | null;
		if (!label) return;
		const si = Number(label.dataset.sectionArrayIndex);
		const cluster = this.clusterManager
			.getClusters()
			.find((c) => c.sectionArrayIndex === si);
		if (cluster) this.enterCluster(cluster);
	}

	private onPanelNav(e: MouseEvent): void {
		const btn = (e.target as HTMLElement).closest(
			"button",
		) as HTMLButtonElement | null;
		if (!btn) return;
		if (btn.id === "galaxy-panel-prev") {
			const prev =
				(this.currentStarIndex - 1 + this.sectionStars.length) %
				this.sectionStars.length;
			this.openCardByIndex(prev);
		} else if (btn.id === "galaxy-panel-next") {
			const next = (this.currentStarIndex + 1) % this.sectionStars.length;
			this.openCardByIndex(next);
		}
	}

	private updatePanelNav(index: number, total: number): void {
		const nav = document.getElementById("galaxy-panel-nav");
		const counter = document.getElementById("galaxy-panel-counter");
		if (!nav || !counter) return;
		counter.textContent = `${index + 1} / ${total}`;
		if (total > 1) {
			nav.classList.remove("galaxy-panel-nav--hidden");
		} else {
			nav.classList.add("galaxy-panel-nav--hidden");
		}
	}

	private hidePanelNav(): void {
		document
			.getElementById("galaxy-panel-nav")
			?.classList.add("galaxy-panel-nav--hidden");
	}

	private static isMobile(): boolean {
		return window.matchMedia("(max-width: 767px)").matches;
	}

	private onSidebarClick(e: MouseEvent): void {
		const item = (e.target as HTMLElement).closest(
			".galaxy-sidebar__item",
		) as HTMLElement | null;
		if (!item) return;

		if (item.dataset.cluster === "true") {
			const si = Number(item.dataset.si);
			const cluster = this.clusterManager
				.getClusters()
				.find((c) => c.sectionArrayIndex === si);
			if (cluster) this.enterCluster(cluster);
			return;
		}

		const si = Number(item.dataset.si);
		const ssi = Number(item.dataset.ssi);
		const ci = Number(item.dataset.ci);
		const star = this.sectionStars.find(
			(s) =>
				s.sectionArrayIndex === si &&
				s.subsectionArrayIndex === ssi &&
				s.cardIndex === ci,
		);
		if (star) this.openCard(star);
	}

	private onSidebarKeyDown(e: KeyboardEvent): void {
		if (e.key !== "Enter" && e.key !== " ") return;
		e.preventDefault(); // Space would otherwise scroll the page
		(e.target as HTMLElement).click();
	}

	private setMouse(clientX: number, clientY: number): void {
		this.mouse.x = (clientX / window.innerWidth) * 2 - 1;
		this.mouse.y = -(clientY / window.innerHeight) * 2 + 1;
	}

	private onMouseMove(e: MouseEvent): void {
		this.setMouse(e.clientX, e.clientY);
		this.cameraController.updateParallax(this.mouse.x, this.mouse.y);

		if (this.cameraController.state === CameraState.Overview) {
			this.checkClusterHover();
		} else if (this.cameraController.state === CameraState.Cluster) {
			this.checkStarHover();
		}
	}

	private onTouchStart(e: TouchEvent): void {
		if (e.touches.length === 0) return;
		this.touchStartX = e.touches[0].clientX;
		this.touchStartY = e.touches[0].clientY;
	}

	private onTouchEnd(e: TouchEvent): void {
		if (e.changedTouches.length === 0) return;
		const touch = e.changedTouches[0];
		const dx = touch.clientX - this.touchStartX;
		const dy = touch.clientY - this.touchStartY;
		// Swipe right to close the open card panel
		if (
			this.cameraController.state === CameraState.Reading &&
			dx > 60 &&
			Math.abs(dy) < 120
		) {
			this.closePanel();
			return;
		}
		this.setMouse(touch.clientX, touch.clientY);
		this.lastTouchHandledMs = Date.now();
		this.handleClickAt();
	}

	private onClick(): void {
		// Suppress the synthetic click browsers fire after touchend — without
		// this guard, a tap fires both touchend AND click, calling handleClickAt twice.
		if (Date.now() - this.lastTouchHandledMs < 500) return;
		this.handleClickAt();
	}

	private handleClickAt(): void {
		const state = this.cameraController.state;

		if (state === CameraState.Reading) {
			this.closePanel();
			return;
		}

		if (state === CameraState.Overview) {
			this.checkClusterClick();
			return;
		}

		if (state === CameraState.Cluster) {
			const hitStar = this.getHoveredStar();
			if (hitStar) {
				this.openCard(hitStar);
			} else {
				this.goBackToOverview();
			}
		}
	}

	private checkClusterClick(): void {
		this.raycaster.setFromCamera(this.mouse, this.galaxyScene.camera);
		const meshes = this.clusterManager.getHitMeshes();
		const hits = this.raycaster.intersectObjects(meshes);
		if (hits.length === 0) return;

		const hitMesh = hits[0].object;
		const cluster = this.clusterManager
			.getClusters()
			.find((c) => c.hitMesh === hitMesh);
		if (!cluster) return;

		this.enterCluster(cluster);
	}

	private enterCluster(cluster: ClusterData): void {
		// Reset the swell on whichever cluster we were hovering before diving in.
		this.clusterManager.setClusterHover(cluster.sectionArrayIndex, false);
		this.hoveredCluster = null;
		this.galaxyScene.webglRenderer.domElement.style.cursor = "default";
		this.clusterManager.dimAllExcept(cluster.sectionArrayIndex);
		this.clusterManager.scatterParticles(cluster.sectionArrayIndex);
		this.sectionStars = this.starManager.getStarsForSection(
			cluster.sectionArrayIndex,
		);
		this.starManager.showLabelsForSection(cluster.sectionArrayIndex);
		this.sidebarController.showSectionList(cluster.sectionArrayIndex);
		this.sidebarController.setActiveCluster(cluster.sectionArrayIndex);
		if (InteractionManager.isMobile()) {
			this.sidebarController.showSidebar();
		}

		this.cameraController.goToCluster(
			cluster.position,
			cluster.sectionArrayIndex,
			() => {
				// camera has arrived
			},
		);

		this.hudController.setBreadcrumb(cluster.title);
		this.hudController.showBackButton(() => this.goBackToOverview());
		this.hudController.showHint(
			"Click a star to open it · click background to go back",
		);
	}

	private checkClusterHover(): void {
		this.raycaster.setFromCamera(this.mouse, this.galaxyScene.camera);
		const hits = this.raycaster.intersectObjects(
			this.clusterManager.getHitMeshes(),
		);
		const hit =
			hits.length > 0
				? (this.clusterManager
						.getClusters()
						.find((c) => c.hitMesh === hits[0].object) ?? null)
				: null;
		if (hit !== this.hoveredCluster) {
			if (this.hoveredCluster) {
				this.clusterManager.setClusterHover(
					this.hoveredCluster.sectionArrayIndex,
					false,
				);
			}
			if (hit) {
				this.clusterManager.setClusterHover(
					hit.sectionArrayIndex,
					true,
				);
			}
			this.hoveredCluster = hit;
			this.galaxyScene.webglRenderer.domElement.style.cursor = hit
				? "pointer"
				: "default";
		}
	}

	private checkStarHover(): void {
		const hitStar = this.getHoveredStar();
		if (hitStar !== this.hoveredStar) {
			if (this.hoveredStar) {
				this.starManager.setStarHighlight(this.hoveredStar, false);
			}
			if (hitStar) {
				this.starManager.setStarHighlight(hitStar, true);
			}
			this.hoveredStar = hitStar;
			this.galaxyScene.webglRenderer.domElement.style.cursor = hitStar
				? "pointer"
				: "default";
		}
	}

	private getHoveredStar(): StarData | null {
		this.raycaster.setFromCamera(this.mouse, this.galaxyScene.camera);
		const meshes = this.sectionStars.map((s) => s.hitMesh);
		const hits = this.raycaster.intersectObjects(meshes);
		if (hits.length === 0) return null;
		const hitMesh = hits[0].object as Mesh;
		return this.sectionStars.find((s) => s.hitMesh === hitMesh) ?? null;
	}

	private openCardByIndex(index: number): void {
		const star = this.sectionStars[index];
		if (!star) return;
		this.currentStarIndex = index;
		this.openCard(star);
	}

	private openCard(star: StarData): void {
		if (this.currentOpenStar && this.currentOpenStar !== star) {
			this.starManager.setStarHighlight(this.currentOpenStar, false);
		}
		this.currentOpenStar = star;
		this.currentStarIndex = this.sectionStars.indexOf(star);
		this.cameraController.setReadingMode();
		this.panelController.openPanel(
			star.sectionArrayIndex,
			star.subsectionArrayIndex,
			star.cardIndex,
		);
		this.hudController.dimScene();

		const cluster =
			this.clusterManager.getClusters()[star.sectionArrayIndex];
		this.hudController.setBreadcrumb(cluster?.title, star.label);
		this.hudController.showBackButton(() => this.closePanel());
		this.starManager.setStarHighlight(star, true);
		this.sidebarController.setActiveItem(
			star.sectionArrayIndex,
			star.subsectionArrayIndex,
			star.cardIndex,
		);
		if (InteractionManager.isMobile()) {
			this.sidebarController.hideSidebar();
		}
		this.updatePanelNav(this.currentStarIndex, this.sectionStars.length);
	}

	private closePanel(): void {
		this.panelController.closePanel();
		this.hudController.undimScene();
		this.cameraController.exitReadingMode();
		this.hidePanelNav();
		this.sidebarController.clearActiveItem();

		const si = this.cameraController.activeSectionArrayIndex;
		const cluster =
			si !== null ? this.clusterManager.getClusters()[si] : null;
		this.hudController.setBreadcrumb(cluster?.title);
		this.hudController.showBackButton(() => this.goBackToOverview());

		if (this.hoveredStar) {
			this.starManager.setStarHighlight(this.hoveredStar, false);
			this.hoveredStar = null;
		}
		this.galaxyScene.webglRenderer.domElement.style.cursor = "default";
	}

	private goBackToOverview(): void {
		if (this.cameraController.state === CameraState.Reading) {
			this.panelController.closePanel();
			this.hudController.undimScene();
			this.sidebarController.clearActiveItem();
		}

		const si = this.cameraController.activeSectionArrayIndex;
		if (si !== null) {
			this.clusterManager.implodeParticles(si);
		}

		if (this.currentOpenStar) {
			this.starManager.setStarHighlight(this.currentOpenStar, false);
			this.currentOpenStar = null;
		}
		this.starManager.hideAllLabels();
		this.clusterManager.resetOpacity();
		this.hudController.hideBackButton();
		this.hudController.setBreadcrumb();
		this.sidebarController.showClusterList();
		this.sidebarController.clearActiveCluster();
		if (InteractionManager.isMobile()) {
			this.sidebarController.hideSidebar();
		}
		this.hidePanelNav();
		this.sectionStars = [];
		this.hoveredStar = null;
		this.galaxyScene.webglRenderer.domElement.style.cursor = "default";
		this.hudController.showHint("Click or tap a cluster to explore");

		this.cameraController.returnToOverview(() => {
			// overview reached
		});
	}

	private onKeyDown(e: KeyboardEvent): void {
		if (e.key === "Escape") {
			if (this.cameraController.state === CameraState.Reading) {
				this.closePanel();
			} else if (this.cameraController.state === CameraState.Cluster) {
				this.goBackToOverview();
			}
			return;
		}

		if (
			this.cameraController.state === CameraState.Reading &&
			this.sectionStars.length > 0
		) {
			if (e.key === "ArrowRight" || e.key === "ArrowDown") {
				e.preventDefault();
				const next =
					(this.currentStarIndex + 1) % this.sectionStars.length;
				this.openCardByIndex(next);
			} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
				e.preventDefault();
				const prev =
					(this.currentStarIndex - 1 + this.sectionStars.length) %
					this.sectionStars.length;
				this.openCardByIndex(prev);
			}
		}
	}
}
