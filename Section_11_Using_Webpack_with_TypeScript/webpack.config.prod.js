const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

// this is how we export things in NODEJS
module.exports = {
	mode: "production",
	// where to find our .ts files
	entry: "./src/app.ts",
	// where to output them
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	// for source map files and debugging
	devtool: false,
	// basically telling WebPack what to do with our .ts files
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	// tell WebPack which file extensions to add to imports it finds
	resolve: {
		extensions: [".ts", ".js"],
	},
	// this is needed to clear the old .dist folder before writin any new code to it
	plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
