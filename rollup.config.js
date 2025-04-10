import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
    {
        input: [
            'src/index.ts',
            'src/core/index.ts',
            'src/taterials/index.ts',
            'src/cssKit/index.ts',
            'src/tiperes/index.ts'
        ],
        output: {
            dir: './dist',
            format: 'cjs', // CommonJS 形式
            preserveModules: true,
            preserveModulesRoot: 'src',
            paths: {
                '@core': './dist/core',
                '@taterials': './dist/taterials',
                '@cssKit': './dist/cssKit',
                '@tiperes': './dist/tiperes'
            },
            sourcemap: true, // 必要に応じて
            entryFileNames: '[name].js' // CommonJS の出力ファイル名
        },
        plugins: [
            typescript({
                tsconfig: './tsconfig.json',
                moduleResolution: 'node',
                rootDir: './src'
            }),
            nodeResolve(),
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
            })
        ]
    },
    {
        input: [
            'src/index.ts',
            'src/core/index.ts',
            'src/taterials/index.ts',
            'src/cssKit/index.ts',
            'src/tiperes/index.ts'
        ],
        output: {
            dir: './dist',
            format: 'es', // ES Modules 形式
            preserveModules: true,
            preserveModulesRoot: 'src',
            paths: {
                '@core': './dist/core',
                '@taterials': './dist/taterials',
                '@cssKit': './dist/cssKit',
                '@tiperes': './dist/tiperes'
            },
            sourcemap: true, // 必要に応じて
            entryFileNames: '[name].mjs' // ES Modules の出力ファイル名
        },
        plugins: [
            typescript({
                tsconfig: './tsconfig.json',
                moduleResolution: 'node',
                rootDir: './src'
            }),
            nodeResolve(),
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
            })
        ]
    }
];
