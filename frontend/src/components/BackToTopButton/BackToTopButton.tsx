import React from "react";
import "./BackToTopButton.scss";

const BackToTopButton: React.FunctionComponent = (): JSX.Element => {
	const scrollToTop = (): void => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<button
			className="background-top-button"
			onClick={scrollToTop}
			aria-label="Back to top"
		>
			<svg
				className="background-top-button__icon"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2.25"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<polyline points="6 15 12 9 18 15" />
			</svg>
		</button>
	);
};

export { BackToTopButton };
