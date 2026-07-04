const CLUSTER_LIST_ID = "galaxy-sidebar-list-clusters";

export class SidebarController {
	showClusterList(): void {
		this.hideAllLists();
		document
			.getElementById(CLUSTER_LIST_ID)
			?.classList.remove("galaxy-sidebar__list--hidden");
	}

	showSectionList(sectionArrayIndex: number): void {
		this.hideAllLists();
		document
			.getElementById(`galaxy-sidebar-list-si${sectionArrayIndex}`)
			?.classList.remove("galaxy-sidebar__list--hidden");
	}

	setActiveCluster(sectionArrayIndex: number): void {
		this.clearActiveCluster();
		document
			.getElementById(`galaxy-sidebar-cluster-si${sectionArrayIndex}`)
			?.classList.add("galaxy-sidebar__item--active");
	}

	clearActiveCluster(): void {
		document
			.querySelectorAll(
				`#${CLUSTER_LIST_ID} .galaxy-sidebar__item--active`,
			)
			.forEach((el) => {
				el.classList.remove("galaxy-sidebar__item--active");
			});
	}

	setActiveItem(
		sectionArrayIndex: number,
		subsectionArrayIndex: number,
		cardIndex: number,
	): void {
		this.clearActiveItem();
		const id = `galaxy-sidebar-item-si${sectionArrayIndex}-ssi${subsectionArrayIndex}-ci${cardIndex}`;
		document
			.getElementById(id)
			?.classList.add("galaxy-sidebar__item--active");
	}

	clearActiveItem(): void {
		document
			.querySelectorAll(
				`.galaxy-sidebar__list:not(#${CLUSTER_LIST_ID}) .galaxy-sidebar__item--active`,
			)
			.forEach((el) => {
				el.classList.remove("galaxy-sidebar__item--active");
			});
	}

	showSidebar(): void {
		document
			.getElementById("galaxy-sidebar")
			?.classList.add("galaxy-sidebar--open");
		const toggle = document.getElementById("galaxy-sidebar-toggle");
		if (toggle) toggle.textContent = "✕";
	}

	hideSidebar(): void {
		document
			.getElementById("galaxy-sidebar")
			?.classList.remove("galaxy-sidebar--open");
		const toggle = document.getElementById("galaxy-sidebar-toggle");
		if (toggle) toggle.textContent = "☰";
	}

	toggleSidebar(): void {
		const sidebar = document.getElementById("galaxy-sidebar");
		if (!sidebar) return;
		if (sidebar.classList.contains("galaxy-sidebar--open")) {
			this.hideSidebar();
		} else {
			this.showSidebar();
		}
	}

	private hideAllLists(): void {
		document.querySelectorAll(".galaxy-sidebar__list").forEach((el) => {
			el.classList.add("galaxy-sidebar__list--hidden");
		});
	}
}
