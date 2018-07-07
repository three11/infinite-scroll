const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/infinite-scroll.js',
	output: {
		filename: 'infinite-scroll.min.js',
		library: 'InfiniteScroll',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [new UnminifiedWebpackPlugin()]
};
