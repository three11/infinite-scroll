import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: 'src/infinite-scroll.ts',
	output: {
		dir: 'dist',
		name: 'InfiniteScroll',
		format: 'umd',
		exports: 'named',
		sourcemap: true
	},
	plugins: [typescript(), commonjs(), nodeResolve()]
};
