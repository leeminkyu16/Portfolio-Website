import React from "react";
import { AnglesUpIcon } from "../../assets/icons";
import "./BackToTopButton.scss";

const BackToTopButton: React.FunctionComponent = (): JSX.Element => {
	const scrollToTop = (): void => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<button
			className="background-top-button"
			onClick={scrollToTop}
		>
			<img
				src={AnglesUpIcon}
				alt="Up"
			/>
		</button>
	);
};

export { BackToTopButton };
