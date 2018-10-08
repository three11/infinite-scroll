import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
	input: 'src/infinite-scroll.js',
	output: {
		file: 'dist/infinite-scroll.min.js',
		name: 'InfiniteScroll',
		format: 'iife'
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
			babelrc: false,
			presets: [
				['@babel/env', { 'modules': false }]
			]
		}),
		uglify()
	]
};
