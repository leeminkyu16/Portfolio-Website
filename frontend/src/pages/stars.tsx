import { ListResumeSection, resumeArray } from "portfolio-website-shared";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { GitHubIcon, LinkedInIcon } from "../assets/icons";
import { GalaxyPanel } from "../components/GalaxyPanel/GalaxyPanel";
import { LanguageToggle } from "../components/LanguageToggle/LanguageToggle";
import { getCardLabel, getClusterColor } from "../galaxy/data/cluster-layout";
import "../stars/styles/stars.scss";
import "./stars.scss";

const StarsPage: React.FunctionComponent = (): JSX.Element => {
	useEffect(() => {
		// Lock scrolling only while mounted (same reasoning as galaxy.tsx: a
		// global overflow rule leaks into the classic page after client-side nav).
		const prevHtmlOverflow = document.documentElement.style.overflow;
		const prevBodyOverflow = document.body.style.overflow;
		document.documentElement.style.overflow = "hidden";
		document.body.style.overflow = "hidden";

		let cleanup: (() => void) | undefined;
		import("../stars/index").then((m) => {
			cleanup = m.init();
		});
		return () => {
			cleanup?.();
			document.documentElement.style.overflow = prevHtmlOverflow;
			document.body.style.overflow = prevBodyOverflow;
		};
	}, []);

	const starsDataJson = JSON.stringify(resumeArray).replace(/</g, "\\u003c");

	return (
		<>
			<Helmet>
				<title>Min-Kyu Lee — Star Sky</title>
				<meta
					name="description"
					content="Min-Kyu Lee (이민규 / 李旻奎) — Android Engineer in NYC. 旻奎 means 'sky of the 奎 constellation'; this portfolio maps my career onto a parallax night sky."
				/>
			</Helmet>

			{/* Resume data for the runtime canvas scene */}
			<script
				type="application/json"
				id="stars-resume-data"
				dangerouslySetInnerHTML={{ __html: starsDataJson }}
			/>

			{/* Parallax sky canvas mount */}
			<div
				id="stars-sky"
				className="stars-sky"
			>
				<canvas id="stars-canvas" />
				<div
					id="stars-loading"
					className="stars-loading"
				>
					Drawing the sky…
				</div>
			</div>

			{/* Floating hover tooltip */}
			<div
				id="stars-tooltip"
				className="stars-tooltip"
				aria-hidden="true"
			/>

			{/* Pre-rendered resume panels (reused verbatim from Galaxy) + nav */}
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
				<div
					id="stars-panel-nav"
					className="stars-panel-nav stars-panel-nav--hidden"
				>
					<button
						id="stars-panel-prev"
						className="stars-panel-nav__btn"
						aria-label="Previous star"
					>
						‹
					</button>
					<span
						id="stars-panel-counter"
						className="stars-panel-nav__counter"
					/>
					<button
						id="stars-panel-next"
						className="stars-panel-nav__btn"
						aria-label="Next star"
					>
						›
					</button>
				</div>
			</div>

			{/* HUD overlay */}
			<div className="stars-hud">
				<div className="stars-hud-top-left">
					<button
						id="stars-back-btn"
						className="stars-back-btn stars-back-btn--hidden"
					>
						← Back
					</button>
					<nav
						className="stars-breadcrumb"
						aria-label="Star sky breadcrumb"
					>
						<span className="stars-breadcrumb__part">
							Min-Kyu Lee
							<span className="stars-breadcrumb__subtitle">
								旻奎 · a sky of stars
							</span>
						</span>
						<span
							id="stars-breadcrumb-card"
							className="stars-breadcrumb__part stars-breadcrumb__part--hidden"
						/>
					</nav>
					<button
						id="stars-sidebar-toggle"
						className="stars-sidebar-toggle"
						aria-label="Toggle items list"
					>
						☰
					</button>
				</div>
				<div className="stars-hud-top-right">
					<LanguageToggle className="stars-language-toggle" />
					<div className="stars-top-links">
						<a
							href="https://www.linkedin.com/in/leeminkyu16/"
							className="stars-icon-link"
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
							className="stars-icon-link"
							aria-label="GitHub profile"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src={GitHubIcon}
								alt=""
							/>
						</a>
						<div
							className="stars-theme-switcher"
							role="navigation"
							aria-label="View switcher"
						>
							<a href="/">Classic</a>
							<a href="/galaxy">Galaxy</a>
							<span
								className="stars-theme-switcher__active"
								aria-current="page"
							>
								Sky
							</span>
						</div>
					</div>
				</div>
				<div className="stars-hud-bottom-center">
					<p
						id="stars-hint"
						className="stars-hint"
					>
						Every star is a card — hover to read, click to open
					</p>
				</div>

				{/* Item list — every card, grouped by section constellation. */}
				<div
					id="stars-sidebar"
					className="stars-sidebar"
				>
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
											key={`stars-subsec-si${si}-ssi${ssi}`}
											className="stars-sidebar__subsection-sep"
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
											key={`stars-item-si${si}-ssi${ssi}-ci${ci}`}
											id={`stars-sidebar-item-si${si}-ssi${ssi}-ci${ci}`}
											className="stars-sidebar__item"
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
									key={`stars-list-si${si}`}
									className="stars-sidebar__list"
								>
									<li
										className="stars-sidebar__section-title"
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

export default StarsPage;
