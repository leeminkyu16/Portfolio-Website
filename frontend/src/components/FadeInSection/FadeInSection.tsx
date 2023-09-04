import React from "react";
import "./FadeInSection.scss";
import { FadeInSectionProps } from "./FadeInSectionProps";

const FadeInSection: React.FunctionComponent<FadeInSectionProps> = (
	props: FadeInSectionProps,
): JSX.Element => {
	const divRefs: React.MutableRefObject<(HTMLDivElement | null)[]> =
		React.useRef([]);

	React.useEffect((): (() => void) | undefined => {
		if (props.fadeToggle) {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.className =
							"fade-in-section fade-in-section-is-visible";
					} else {
						entry.target.className = "fade-in-section";
					}
				});
			});
			divRefs.current.forEach(
				(currentElement: HTMLDivElement | null): void => {
					if (currentElement !== null) {
						observer.observe(currentElement);
					}
				},
			);

			return (): void => {
				observer.disconnect();
			};
		} else {
			divRefs.current.forEach(
				(currentElement: HTMLDivElement | null): void => {
					if (currentElement !== null) {
						currentElement.className =
							"fade-in-section fade-in-section-is-visible";
					}
				},
			);
		}
	}, [props.fadeToggle]);

	return (
		<>
			{Array.isArray(props.children) ? (
				props.children.map((child, index: number): JSX.Element => {
					return (
						<div
							key={child.key}
							ref={(
								l: HTMLDivElement | null,
							): HTMLDivElement | null =>
								(divRefs.current[index] = l)
							}
						>
							{child}
						</div>
					);
				})
			) : (
				<div
					ref={(l: HTMLDivElement | null): HTMLDivElement | null =>
						(divRefs.current[0] = l)
					}
				>
					{props.children}
				</div>
			)}
		</>
	);
};

export { FadeInSection };
