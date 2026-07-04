import { SidebarController } from "../ui/SidebarController";

function buildDom(): void {
	document.body.innerHTML = `
    <div id="galaxy-sidebar" class="galaxy-sidebar">
      <ul id="galaxy-sidebar-list-clusters" class="galaxy-sidebar__list">
        <li id="galaxy-sidebar-cluster-si0" class="galaxy-sidebar__item" data-si="0" data-cluster="true"></li>
        <li id="galaxy-sidebar-cluster-si1" class="galaxy-sidebar__item" data-si="1" data-cluster="true"></li>
      </ul>
      <ul id="galaxy-sidebar-list-si0" class="galaxy-sidebar__list galaxy-sidebar__list--hidden">
        <li id="galaxy-sidebar-item-si0-ssi0-ci0" class="galaxy-sidebar__item"></li>
        <li id="galaxy-sidebar-item-si0-ssi0-ci1" class="galaxy-sidebar__item"></li>
      </ul>
      <ul id="galaxy-sidebar-list-si1" class="galaxy-sidebar__list galaxy-sidebar__list--hidden">
        <li id="galaxy-sidebar-item-si1-ssi0-ci0" class="galaxy-sidebar__item"></li>
      </ul>
    </div>
  `;
}

describe("SidebarController", () => {
	let controller: SidebarController;

	beforeEach(() => {
		buildDom();
		controller = new SidebarController();
	});

	describe("showClusterList", () => {
		it("reveals the cluster list", () => {
			controller.showSectionList(0);
			controller.showClusterList();
			expect(
				document
					.getElementById("galaxy-sidebar-list-clusters")!
					.classList.contains("galaxy-sidebar__list--hidden"),
			).toBe(false);
		});

		it("hides section item lists", () => {
			controller.showSectionList(0);
			controller.showClusterList();
			expect(
				document
					.getElementById("galaxy-sidebar-list-si0")!
					.classList.contains("galaxy-sidebar__list--hidden"),
			).toBe(true);
		});
	});

	describe("showSectionList", () => {
		it("reveals only the matching section list", () => {
			controller.showSectionList(0);
			expect(
				document
					.getElementById("galaxy-sidebar-list-si0")!
					.classList.contains("galaxy-sidebar__list--hidden"),
			).toBe(false);
			expect(
				document
					.getElementById("galaxy-sidebar-list-si1")!
					.classList.contains("galaxy-sidebar__list--hidden"),
			).toBe(true);
		});

		it("hides the cluster list", () => {
			controller.showSectionList(0);
			expect(
				document
					.getElementById("galaxy-sidebar-list-clusters")!
					.classList.contains("galaxy-sidebar__list--hidden"),
			).toBe(true);
		});

		it("switches lists when called again for a different section", () => {
			controller.showSectionList(0);
			controller.showSectionList(1);
			expect(
				document
					.getElementById("galaxy-sidebar-list-si0")!
					.classList.contains("galaxy-sidebar__list--hidden"),
			).toBe(true);
			expect(
				document
					.getElementById("galaxy-sidebar-list-si1")!
					.classList.contains("galaxy-sidebar__list--hidden"),
			).toBe(false);
		});
	});

	describe("setActiveCluster", () => {
		it("marks the matching cluster item active", () => {
			controller.setActiveCluster(1);
			expect(
				document
					.getElementById("galaxy-sidebar-cluster-si1")!
					.classList.contains("galaxy-sidebar__item--active"),
			).toBe(true);
		});

		it("clears the previously active cluster", () => {
			controller.setActiveCluster(0);
			controller.setActiveCluster(1);
			expect(
				document
					.getElementById("galaxy-sidebar-cluster-si0")!
					.classList.contains("galaxy-sidebar__item--active"),
			).toBe(false);
		});

		it("is not cleared by setActiveItem", () => {
			controller.setActiveCluster(0);
			controller.setActiveItem(1, 0, 0);
			expect(
				document
					.getElementById("galaxy-sidebar-cluster-si0")!
					.classList.contains("galaxy-sidebar__item--active"),
			).toBe(true);
		});
	});

	describe("setActiveItem", () => {
		it("marks the matching item active", () => {
			controller.setActiveItem(0, 0, 1);
			expect(
				document
					.getElementById("galaxy-sidebar-item-si0-ssi0-ci1")!
					.classList.contains("galaxy-sidebar__item--active"),
			).toBe(true);
		});

		it("clears the previously active item", () => {
			controller.setActiveItem(0, 0, 0);
			controller.setActiveItem(0, 0, 1);
			expect(
				document
					.getElementById("galaxy-sidebar-item-si0-ssi0-ci0")!
					.classList.contains("galaxy-sidebar__item--active"),
			).toBe(false);
		});

		it("is not cleared by setActiveCluster", () => {
			controller.setActiveItem(0, 0, 0);
			controller.setActiveCluster(1);
			expect(
				document
					.getElementById("galaxy-sidebar-item-si0-ssi0-ci0")!
					.classList.contains("galaxy-sidebar__item--active"),
			).toBe(true);
		});

		it("is a no-op when the item does not exist", () => {
			expect(() => controller.setActiveItem(9, 9, 9)).not.toThrow();
		});
	});

	describe("sidebar visibility", () => {
		it("showSidebar adds --open to the sidebar container", () => {
			controller.showSidebar();
			expect(
				document
					.getElementById("galaxy-sidebar")!
					.classList.contains("galaxy-sidebar--open"),
			).toBe(true);
		});

		it("hideSidebar removes --open", () => {
			controller.showSidebar();
			controller.hideSidebar();
			expect(
				document
					.getElementById("galaxy-sidebar")!
					.classList.contains("galaxy-sidebar--open"),
			).toBe(false);
		});

		it("toggleSidebar opens when closed", () => {
			controller.toggleSidebar();
			expect(
				document
					.getElementById("galaxy-sidebar")!
					.classList.contains("galaxy-sidebar--open"),
			).toBe(true);
		});

		it("toggleSidebar closes when open", () => {
			controller.showSidebar();
			controller.toggleSidebar();
			expect(
				document
					.getElementById("galaxy-sidebar")!
					.classList.contains("galaxy-sidebar--open"),
			).toBe(false);
		});

		it("is a no-op when sidebar element does not exist", () => {
			document.body.innerHTML = "";
			expect(() => controller.showSidebar()).not.toThrow();
			expect(() => controller.hideSidebar()).not.toThrow();
			expect(() => controller.toggleSidebar()).not.toThrow();
		});
	});
});
