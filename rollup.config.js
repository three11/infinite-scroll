import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/infinite-scroll.js',
	output: {
		file: 'dist/infinite-scroll.min.js',
		name: 'InfiniteScroll',
		format: 'umd'
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
			babelrc: false,
			presets: [['@babel/env', { modules: false }]]
		}),
		resolve(),
		commonJS({
			include: 'node_modules/**'
		}),
		terser()
	]
};
