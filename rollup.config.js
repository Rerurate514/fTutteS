import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const nodeExternals = [
    'commander',
    'events',
    'fs',
    'path',
    'util',
];

// 既存の設定（ライブラリとしての利用）
const libraryConfig = {
    input: 'dist/index.js',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs'
        },
        {
            file: 'dist/index.mjs',
            format: 'es'
        },
        {
            file: 'dist/bundle.js',
            format: 'umd',
            name: 'YourApp',
            sourcemap: true,
        },
        {
            file: 'dist/bundle.esm.js',
            format: 'es',
            sourcemap: true,
        },
        {
            file: 'dist/index.ts',
            format: 'esm',
        },
    ],
    plugins: [
        terser({
            compress: {
                dead_code: true,
                conditionals: true,
                collapse_vars: true
            },
            mangle: {
                keep_classnames: true,
                keep_fnames: true
            },
            format: {
                comments: false,
                beautify: false
            },
            ecma: 2015
        }),
        commonjs(),
        nodeResolve({
            browser: true,
        }),
        typescript({
            declaration: false,
            compilerOptions: {
                target: 'esnext',
                module: 'esnext',
            },
            transformers: [
                service => ({
                    before: [
                        context => node => {
                            return node;
                        }
                    ],
                    after: []
                })
            ]
        }),
    ]
};

export default [libraryConfig];
