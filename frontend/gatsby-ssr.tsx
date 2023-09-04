import { GatsbySSR } from "gatsby";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/state";

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({
	element,
}): JSX.Element => {
	return <Provider store={store}>{element}</Provider>;
};
