import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
    input: [
        'src/index.ts',
        'src/core/index.ts',
        'src/taterials/index.ts',
        'src/cssKit/index.ts',
        'src/tiperes/index.ts'
    ],
    output: {
        dir: './dist',
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
        paths: {
            '@core': './dist/core',
            '@taterials': './dist/taterials',
            '@cssKit': './dist/cssKit',
            '@tiperes': './dist/tiperes'
        }
    },
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
            moduleResolution: 'node',
            rootDir: './src'
        }),
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
};
