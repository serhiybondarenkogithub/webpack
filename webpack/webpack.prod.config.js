const common = require("./webpack.common.config");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CsMinimizerPlugin = require("css-minimizer-webpack-plugin");
const glob = require("glob");
const path = require("path");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");


module.exports = merge(common, {
	output: {
		filename: "js/[name].[contenthash:12].js",
	},
	mode: "production",
	devtool: "source-map",
	optimization: {
		minimize: true,
		minimizer: [
			`...`,
			new CsMinimizerPlugin({
				minimizerOptions: {
					preset: [
						"default",
						{
							discardComents: { removeAll: true }
						},
					],
				},
			}),
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [
							["imagemin-mozjpeg", { quality: 40 }],
							["imagemin-pngquant", {
								quality: [0.65, 0.90],
								speed: 4,
							}],
							["imagemin-gifsicle", { interlaced: true }],
							["imagemin-svgo", {
								plugins: [
									{
										name: "preset-default",
										params: {
											overrides: {
												removeViewBox: false,
												addAtttributesToSVGElement: {
													params: {
														attributes: [
															{ xmlns: "http://www.w3.org/2000/svg" }
														],
													},
												},
											},
										},
									},
								],
							}],
						],
					},
				},
				generator: [
					{
						type: "asset",
						preset: "webp-custom-name",
						implementation: ImageMinimizerPlugin.imageminGenerate,
						options: {
							plugins: [ "imagemin-webp" ]
						},
					},
				],
			}),
		],
		runtimeChunk: "single",
		splitChunks: {
			chunks: "all",
			maxSize: Infinity,
			minSize: 2_000,
			cacheGroups: {
				bootstrap: {
					test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
					name: "bootstrap",
				},
				node_modules: {
					test: /[\\/]node_modules[\\/]/,
					name: "node_modules",
					chunks: "initial",
				},
				// async: {
				// 	test: /[\\/]node_modules[\\/]/,
				// 	chunks: "async",
				// 	name(module, chunks) {
				// 		return chunks.map(chunk => chunk.name).join("-");
				// 	} 
				// }
			},
		},
		// splitChunks: {
		// 	chunks: "all",
		// 	maxSize: Infinity,
		// 	minSize: 0,
		// 	cacheGroups: {
		// 		node_modules: {
		// 			test: /[\\/]node_modules[\\/]/,
		// 			name(module) {
		// 				const packageName = module.context.match(
		// 					/[\\/]node_modules[\\/](.*?)([\\/]|$)/
		// 				)[1];
		// 				return packageName;
		// 			}
		// 		},
		// 	},
		// },
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [ 
					MiniCssExtractPlugin.loader, 
					"css-loader", 
					"postcss-loader",
					"sass-loader",
				],
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
					filename: "./images/[name].[contenthash:12][ext]",
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash:12].css",
		}),
		new PurgeCSSPlugin({
			paths: glob.sync(
				`${path.join(__dirname, "../src")}/**/*`,
				{ nodir: true }
			),
		}),
	],
});