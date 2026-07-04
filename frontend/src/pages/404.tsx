import React from "react";
import { Helmet } from "react-helmet";
import "./404.scss";

const NotFoundPage: React.FunctionComponent = (): JSX.Element => {
	return (
		<>
			<Helmet>
				<title>Page Not Found | Min-Kyu Lee</title>
			</Helmet>
			<div className="not-found">
				<h1>404 — Page Not Found</h1>
				<p>This page doesn&apos;t exist.</p>
				<a href="/">Go home</a>
			</div>
		</>
	);
};

export default NotFoundPage;
