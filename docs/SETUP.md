# SET UP TUTORIAL without npm
## 方法
### npm
npmそのもののインストールは省略します。
ルートディレクトリで`npm init`をターミナルで打ちます。
```bash
npm init
```
その後に表示されるオプションは自由に設定してください。
作成された`package.json`ファイルの中にある、`scripts`は以下から
```tson
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
},
```
これに置き換えてください。
```tson
"scripts": {
    "build": "npm run clean && npm run build:ts && npm run bundle",
    "clean": "rimraf dist",
    "build:ts": "tsc --build",
    "bundle": "rollup -c",
    "prepare": "npm run build",
    "ot": "npm run build && npm link"
},
```

`type`オプションは`module`に設定してください。
```tson
...

"version": "1.0.0",
"main": "index.js",
"type": "module", //ここを設定
"scripts": {
    "build": "npm run clean && npm run build:ts && npm run bundle",
    "clean": "rimraf dist",
    "build:ts": "tsc --build",
    "bundle": "rollup -c",
    "prepare": "npm run build",
    "ot": "npm run build && npm link"
},
"author": "",

...
```

### install ts
typescriptをインストールします。
```bash
npm install typescript tslib
```

tsconfigファイルを作成します。
```bash
npx tsc --init
```

作成された`tsconfig.ts`を以下に置き換えます。これは私がテスト用で作成したコンフィグなので、エラーが起きない限り、自由に設定して下さい。
```ts
{
  "compilerOptions": {
    /* プロジェクト設定 */
    "incremental": true,
    "composite": true,
    "tsBuildInfoFile": "./.tsbuildinfo",

    /* 言語と環境 */
    "target": "es2021",
    "lib": [
      "es2021",
      "dom",
      "esnext.asynciterable"
    ],
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "useDefineForClassFields": true,

    /* モジュール */
    "module": "ESNext",
    "moduleResolution": "node",
    "baseUrl": "./",
    "resolveJsonModule": true,

    /* JavaScript サポート */
    "allowJs": true,
    "checkJs": true,

    /* Emit (出力設定) */
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true,
    "noEmitOnError": true,

    /* 相互運用性の制約 */
    "isolatedModules": true,
    "verbatimModuleSyntax": true,

    /* 型チェック */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,

    /* 完成度 */
    "skipLibCheck": false
  },
  "include": [
    "src/**/*",
    "*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

### npm install
`npm install`を使用して`fTutteS`をインストールします。
```bash
npm install ftuttes
```

### rollup
ブラウザがTypeScriptを認識されるようにするために`rollup`と関連ライブラリをインストールします。(他のバンドラを使用することもできます。)
```bash
npm install --save-dev rollup @rollup/plugin-typescript @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-terser
```

ルートディレクトリに`rollup.config.js`ファイルを作成し、以下を貼り付けます。
```js
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/script.ts',
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
    ],
};
```

### ファイル作成
実際にファイルを作成していきます。
まず、htmlファイルを作成します。
そこに`id`が`fTutteS-Container`である`div`を作成します。
後々、使用するために`script`に`dist/bundle.js`を設定します。
```html
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
```

次に実際のTypeScriptファイルを作成します。
名前は`tsconfig.ts`の`include`内で記述されているファイルにして下さい。
今回の例では`script.ts`を使用するので、その名前で作成してください。
中身はこんな感じにします。
```ts
import { assembleView, Text } from "ftuttes";

assembleView(
    new Text({
        text: "てすと"
    })
)
```

### 実際に表示
`npm run build`を実行してから、VSCodeの拡張機能の`Live-server`や実際にデプロイ、`index.html`をブラウザで開く、、などしてページを表示すると、おそらく`てすと`と表示されていると思います。
