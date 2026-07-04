import { ListResumeSection, resumeArray } from "portfolio-website-shared";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { GitHubIcon, LinkedInIcon } from "../assets/icons";
import { GalaxyPanel } from "../components/GalaxyPanel/GalaxyPanel";
import { LanguageToggle } from "../components/LanguageToggle/LanguageToggle";
import { getCardLabel, getClusterColor } from "../galaxy/data/cluster-layout";
import "../galaxy/styles/galaxy.scss";
import "./galaxy.scss";

const GalaxyPage: React.FunctionComponent = (): JSX.Element => {
	useEffect(() => {
		// Lock page scrolling only while the galaxy view is mounted. Doing this
		// in JS (rather than a global `html, body { overflow: hidden }` in the
		// page stylesheet) keeps the rule from leaking into the classic page
		// after a client-side navigation, which would break its scrolling.
		const prevHtmlOverflow = document.documentElement.style.overflow;
		const prevBodyOverflow = document.body.style.overflow;
		document.documentElement.style.overflow = "hidden";
		document.body.style.overflow = "hidden";

		let cleanup: (() => void) | undefined;
		import("../galaxy/index").then((m) => {
			cleanup = m.init();
		});
		return () => {
			cleanup?.();
			document.documentElement.style.overflow = prevHtmlOverflow;
			document.body.style.overflow = prevBodyOverflow;
		};
	}, []);

	const galaxyDataJson = JSON.stringify(resumeArray).replace(/</g, "\\u003c");

	return (
		<>
			<Helmet>
				<title>Min-Kyu Lee — Galaxy</title>
				<meta
					name="description"
					content="Min-Kyu Lee (이민규 / 李旻奎) — Android Engineer in NYC, Waterloo/Laurier Double Degree. Explore my portfolio in 3D space."
				/>
			</Helmet>

			{/* Resume data for runtime Three.js scene */}
			<script
				type="application/json"
				id="galaxy-resume-data"
				dangerouslySetInnerHTML={{ __html: galaxyDataJson }}
			/>

			{/* 3D canvas mount — loading indicator removed by init() once Three.js is ready */}
			<div
				id="galaxy-canvas-wrapper"
				className="galaxy-canvas-wrapper"
			>
				<div
					id="galaxy-loading"
					className="galaxy-loading"
				>
					Loading galaxy…
				</div>
			</div>

			{/* Pre-rendered resume panels + panel nav overlay */}
			<div id="galaxy-panels">
				{resumeArray.map((section: ListResumeSection, si: number) => {
					const accentColor = getClusterColor(si);
					const sectionTitle = (section[1] as string[])[0];
					return section[2].map((subsection, ssi) => {
						const subsectionTitle =
							(subsection[1] as string[])[0] ?? "";
						return subsection[4].map((cardBundle, ci) => (
							<GalaxyPanel
								key={`panel-si${si}-ssi${ssi}-ci${ci}`}
								sectionArrayIndex={si}
								subsectionArrayIndex={ssi}
								cardIndex={ci}
								accentColor={accentColor}
								sectionTitle={sectionTitle}
								subsectionTitle={subsectionTitle}
								template={subsection[3]}
								data={cardBundle}
							/>
						));
					});
				})}
				{/* Shared prev/next nav — floats above panels, visible when a card is open */}
				<div
					id="galaxy-panel-nav"
					className="galaxy-panel-nav galaxy-panel-nav--hidden"
				>
					<button
						id="galaxy-panel-prev"
						className="galaxy-panel-nav__btn"
						aria-label="Previous card"
					>
						‹
					</button>
					<span
						id="galaxy-panel-counter"
						className="galaxy-panel-nav__counter"
					/>
					<button
						id="galaxy-panel-next"
						className="galaxy-panel-nav__btn"
						aria-label="Next card"
					>
						›
					</button>
				</div>
			</div>

			{/* HUD overlay */}
			<div
				className="galaxy-hud"
				id="galaxy-hud"
			>
				<div className="galaxy-hud-top-left">
					<button
						id="galaxy-back-btn"
						className="galaxy-back-btn galaxy-back-btn--hidden"
					>
						← Back
					</button>
					<nav
						className="galaxy-breadcrumb"
						aria-label="Galaxy navigation breadcrumb"
					>
						<span className="galaxy-breadcrumb__part">
							Min-Kyu Lee
							<span className="galaxy-breadcrumb__subtitle">
								李旻奎 · Android Engineer
							</span>
						</span>
						<span
							id="galaxy-breadcrumb-section"
							className="galaxy-breadcrumb__part galaxy-breadcrumb__part--hidden"
						/>
						<span
							id="galaxy-breadcrumb-card"
							className="galaxy-breadcrumb__part galaxy-breadcrumb__part--hidden"
						/>
					</nav>
					{/* Mobile-only toggle for the sidebar */}
					<button
						id="galaxy-sidebar-toggle"
						className="galaxy-sidebar-toggle"
						aria-label="Toggle items list"
					>
						☰
					</button>
				</div>
				<div className="galaxy-hud-top-right">
					<LanguageToggle className="galaxy-language-toggle" />
					<div className="galaxy-top-links">
						<a
							href="https://www.linkedin.com/in/leeminkyu16/"
							className="galaxy-icon-link"
							aria-label="LinkedIn profile"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src={LinkedInIcon}
								alt=""
							/>
						</a>
						<a
							href="https://github.com/leeminkyu16"
							className="galaxy-icon-link"
							aria-label="GitHub profile"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src={GitHubIcon}
								alt=""
							/>
						</a>
						<a
							href="/stars"
							className="galaxy-classic-link"
						>
							✧ Sky
						</a>
						<a
							href="/"
							className="galaxy-classic-link"
						>
							← Classic
						</a>
					</div>
				</div>
				<div className="galaxy-hud-bottom-center">
					<p
						id="galaxy-hint"
						className="galaxy-hint"
					>
						Tap or click a cluster to explore
					</p>
				</div>

				{/* Item list — clusters at Overview, cards once inside a cluster.
            Alternative to clicking stars/nebulae directly in 3D. */}
				<div
					id="galaxy-sidebar"
					className="galaxy-sidebar"
				>
					<ul
						id="galaxy-sidebar-list-clusters"
						className="galaxy-sidebar__list"
					>
						{resumeArray.map(
							(section: ListResumeSection, si: number) => {
								const accentColor = getClusterColor(si);
								return (
									<li
										key={`sidebar-cluster-si${si}`}
										id={`galaxy-sidebar-cluster-si${si}`}
										className="galaxy-sidebar__item"
										style={{ borderLeftColor: accentColor }}
										data-si={si}
										data-cluster="true"
										tabIndex={0}
										role="button"
									>
										{(section[1] as string[])[0]}
									</li>
								);
							},
						)}
					</ul>
					{resumeArray.map(
						(section: ListResumeSection, si: number) => {
							const accentColor = getClusterColor(si);
							const items: JSX.Element[] = [];
							section[2].forEach((subsection, ssi) => {
								const template = subsection[3] as Array<
									[number, string, ...unknown[]]
								>;
								const subsectionTitle = (
									subsection[1] as string[]
								)[0];
								if (subsectionTitle) {
									items.push(
										<li
											key={`sidebar-subsec-si${si}-ssi${ssi}`}
											className="galaxy-sidebar__subsection-sep"
										>
											{subsectionTitle}
										</li>,
									);
								}
								subsection[4].forEach((cardBundle, ci) => {
									const label = getCardLabel(
										cardBundle as unknown[],
										template,
									);
									items.push(
										<li
											key={`sidebar-item-si${si}-ssi${ssi}-ci${ci}`}
											id={`galaxy-sidebar-item-si${si}-ssi${ssi}-ci${ci}`}
											className="galaxy-sidebar__item"
											style={{
												borderLeftColor: accentColor,
											}}
											data-si={si}
											data-ssi={ssi}
											data-ci={ci}
											tabIndex={0}
											role="button"
										>
											{label}
										</li>,
									);
								});
							});
							return (
								<ul
									key={`sidebar-list-si${si}`}
									id={`galaxy-sidebar-list-si${si}`}
									className="galaxy-sidebar__list galaxy-sidebar__list--hidden"
								>
									<li
										className="galaxy-sidebar__section-title"
										style={{ color: accentColor }}
									>
										{(section[1] as string[])[0]}
									</li>
									{items}
								</ul>
							);
						},
					)}
				</div>
			</div>
		</>
	);
};

export default GalaxyPage;
