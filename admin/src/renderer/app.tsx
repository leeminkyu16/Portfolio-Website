import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Application from "./components/Application";
import store from "./store";

try {
	require("electron-reloader")(module);
	// eslint-disable-next-line no-empty
} catch {}

// Create main element
const mainElement = document.createElement("div");
document.body.appendChild(mainElement);

const root = ReactDOM.createRoot(mainElement)
// Render component
root.render(
	<Provider store={store}>
		<Application />
	</Provider>,
);
