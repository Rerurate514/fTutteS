import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export const initCommand = new Command('init')
    .description('Initialize my-npx-config.json')
    .action(() => {
        installPackage("rollup @rollup/plugin-typescript @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-terser");
        createRollupConfigFile();
        createDefaultHTMLFile();
        createDefaultTsFile();
    });

const rollUpConfigJsCode = `
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

export default {
    input: 'script.ts',
    output: [
        {
            file: 'dist/bundle.js',
            format: 'umd',
            name: 'MyApp',
            sourcemap: true,
        },
        {
            file: 'dist/bundle.esm.js',
            format: 'es',
            sourcemap: true,
        },
    ],
    plugins: [
        typescript(),
        nodeResolve({
            browser: true,
        }),
        commonjs(),
        terser(),
    ],
};
`;

const templateHTMLFile = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>テスト</title>
</head>
<body>
    <div id="fJutteS-Container"></div>
    <script type="module" src="dist/bundle.js"></script>
</body>
</html>
`;

const templateTsFile = `
import { assembleView, Text } from "ftuttes";

assembleView(
    new Text({
        text: "てすと"
    })
)
`;
    

function createRollupConfigFile() {
    console.log(`creating rollup config file...`);

    const filePath = path.resolve(process.cwd(), 'rollup.config.js');

    if (fs.existsSync(filePath)) {
        console.error('rollup.config.js already exists.');
        return;
    }

    fs.writeFileSync(filePath, rollUpConfigJsCode, 'utf-8');
    console.log('rollup.config.js has been created successfully.');
}

function createDefaultHTMLFile() {
    console.log(`creating default HTML template file...`);

    const filePath = path.resolve(process.cwd(), 'index.html');

    if (fs.existsSync(filePath)) {
        console.error('index.html already exists.');
        return;
    }

    fs.writeFileSync(filePath, templateHTMLFile, 'utf-8');
    console.log('index.html has been created successfully.');
}

function createDefaultTsFile() {
    console.log(`creating default ts template file...`);

    const filePath = path.resolve(process.cwd(), 'script.ts');

    if (fs.existsSync(filePath)) {
        console.error('script.ts already exists.');
        return;
    }

    fs.writeFileSync(filePath, templateTsFile, 'utf-8');
    console.log('script.ts has been created successfully.');
}


function installPackage(packageName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        console.log(`Installing package: ${packageName}...`);

        exec(`npm install --save-dev ${packageName}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error installing package: ${error.message}`);
                reject(error);
                return;
            }

            if (stderr) {
                console.warn(`Warning during installation: ${stderr}`);
            }

            console.log(`Package ${packageName} installed successfully`);
            resolve(stdout);
        });
    });
}
