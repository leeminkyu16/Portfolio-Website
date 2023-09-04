const path = require("path");

const { IgnorePlugin } = require("webpack");

const optionalPlugins = [];
if (process.platform !== "darwin") {
	optionalPlugins.push(new IgnorePlugin({ resourceRegExp: /^fsevents$/ }));
}

module.exports = {
	mode: "development",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		libraryTarget: "umd",
	},
	node: {
		__dirname: false,
		__filename: false,
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".json", ".svg", ".png"],
	},
	externals: {
		fsevents: "require('fsevents')",
	},
	devtool: "source-map",
	plugins: [...optionalPlugins],
	module: {
		rules: [
			{
				test: /\.(gif|png|jpe?g|svg|ico)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name() {
								return process.env.NODE_ENV === "production"
									? "[contenthash].[ext]"
									: "assets/[name].[ext]";
							},
						},
					},
					{
						loader: "image-webpack-loader",
						options: {
							disable: false,
						},
					},
				],
			},
		],
	},
};
