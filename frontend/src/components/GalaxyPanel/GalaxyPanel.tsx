import {
	ListResumeItemBundle,
	ListResumeSubsectionTemplate,
} from "portfolio-website-shared";
import React from "react";
import { ResumeCard } from "../ResumeCard/ResumeCard";
import "./GalaxyPanel.scss";

interface GalaxyPanelProps {
	sectionArrayIndex: number;
	subsectionArrayIndex: number;
	cardIndex: number;
	accentColor: string;
	sectionTitle: string;
	subsectionTitle: string;
	template: ListResumeSubsectionTemplate;
	data: ListResumeItemBundle;
}

const GalaxyPanel: React.FunctionComponent<GalaxyPanelProps> = ({
	sectionArrayIndex,
	subsectionArrayIndex,
	cardIndex,
	accentColor,
	sectionTitle,
	subsectionTitle,
	template,
	data,
}: GalaxyPanelProps): JSX.Element => {
	const panelId = `galaxy-panel-si${sectionArrayIndex}-ssi${subsectionArrayIndex}-ci${cardIndex}`;
	const keyId = `${sectionArrayIndex}-${subsectionArrayIndex}-${cardIndex}`;
	const contextLabel = subsectionTitle
		? `${sectionTitle} · ${subsectionTitle}`
		: sectionTitle;

	return (
		<article
			id={panelId}
			className="galaxy-panel galaxy-panel--hidden"
			data-accent={accentColor}
			style={{ ["--galaxy-accent" as string]: accentColor }}
		>
			<div className="galaxy-panel__header">
				<span
					className="galaxy-panel__context"
					style={{ color: accentColor }}
				>
					{contextLabel}
				</span>
				<button
					className="galaxy-panel__close"
					aria-label="Close panel"
					data-panel-close="true"
				>
					×
				</button>
			</div>
			<div className="galaxy-panel__content">
				<ResumeCard
					keyId={keyId}
					template={template}
					data={data}
				/>
			</div>
		</article>
	);
};

export { GalaxyPanel };
