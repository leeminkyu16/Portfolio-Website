import React from "react";
import "./Application.scss";

import LeftBar from "./left_bar/LeftBar";
import CenterArea from "./center/center_area/CenterArea";

const Application: () => JSX.Element = (): JSX.Element => {
	return (
		<div className="application-main-top-bottom__div">
			<div className="application-main-left-right__div">
				<LeftBar />
				<CenterArea />
			</div>
		</div>
	);
};

export default Application;
