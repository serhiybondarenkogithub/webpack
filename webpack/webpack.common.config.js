const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


const config = {
	entry: "./src/js/index.js",
	output: {
		path: path.resolve(__dirname, "../dist"),
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [ "html-loader" ],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./src/index.html",
		}),
		new CleanWebpackPlugin(),
	],
}


module.exports = config;