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
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			}
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./src/index.html",
		}),
	],
}


module.exports = config;