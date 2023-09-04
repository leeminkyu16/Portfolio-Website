import React from "react";
import "./BackgroundSpacer.scss";

const BackgroundSpacer: React.FunctionComponent = (): JSX.Element => {
	return (
		<>
			<h1 className="background-spacer-title">
				{" "}
				Interact with the Background{" "}
			</h1>
			<div className="background-spacer-div"></div>;
		</>
	);
};

export { BackgroundSpacer };
