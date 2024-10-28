const path = require("path");

// this is how we export things in NODEJS
module.exports = {
	mode: "development",
	devServer: {
		static: {
			directory: path.join(__dirname, "/"),
		},
	},
	// where to find our .ts files
	entry: "./src/app.ts",
	// where to output them
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/dist/",
	},
	// for source map files and debugging
	devtool: "inline-source-map",
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
};
