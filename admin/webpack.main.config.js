const webpack = require("webpack");
const { merge } = require("webpack-merge");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
	target: "electron-main",
	entry: {
		main: "./src/main/index.ts",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					cacheDirectory: true,
					babelrc: false,
					presets: [
						["@babel/preset-env", { targets: "maintained node versions" }],
						["@babel/preset-typescript", { onlyRemoveTypeImports: false }],
					],
					plugins: [
						["@babel/plugin-proposal-private-methods", { loose: true }],
						["@babel/plugin-proposal-class-properties", { loose: true }],
						["@babel/plugin-proposal-private-property-in-object", { loose: true }],
					],
				},
			},
		],
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin({
			issue: {
				include: [
					{
						file: "src/main/**/*",
					},
				],
			},
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
		}),
	],
});
