const { merge } = require("webpack-merge");
const { spawn } = require("child_process");

const baseConfig = require("./webpack.renderer.config");

module.exports = merge(baseConfig, {
	resolve: {
		alias: {},
	},
	devServer: {
		port: 2003,
		compress: true,
		devMiddleware: {
			stats: "errors-only",
		},
		hot: true,
		headers: { "Access-Control-Allow-Origin": "*" },
		historyApiFallback: {
			verbose: true,
			disableDotRule: false,
		},
		// webpack-dev-server 5 removed onBeforeSetupMiddleware in favour of
		// setupMiddlewares; spawn the Electron main process on server startup.
		setupMiddlewares(middlewares) {
			if (process.env.START_HOT) {
				console.log("Starting main process");
				spawn("npm", ["run", "start-main-dev"], {
					shell: true,
					env: process.env,
					stdio: "inherit",
				})
					.on("close", (code) => process.exit(code))
					.on("error", (spawnError) => console.error(spawnError));
			}
			return middlewares;
		},
	},
});
