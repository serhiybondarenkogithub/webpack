const common = require("./webpack.common.config");
const { merge } = require("webpack-merge");
const path = require("path");


module.exports = merge(common, {
	mode: "development",
	output: {
		filename: "bundle.js",
	},
	devtool: "eval-source-map",
	devServer: {
		port: 9000,
		static: {
			directory: path.resolve(__dirname, ".."),
		},
		devMiddleware: {
			index: "index.html",
			writeToDisk: true,
		},
		client: {
			overlay: true,
		},
		liveReload: false,
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [ "style-loader", "css-loader", "sass-loader" ],
			},
			{
				test: /\.(png|jpg|svg)/,
				type: "asset",
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024,
					},
				},
				generator: {
					filename: "./images/[name][ext]",
				},
			},
		],
	},
});