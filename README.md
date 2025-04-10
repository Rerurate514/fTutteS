
# THIS IS PURE JS FRAMEWORK
## fTutteSとは
`fTutteS`とは、TypeScriptで構成されたライブラリです。Flutterのような書き心地でWeb画面をデザインすることができます。`fTutteS`の中には、`core`、`taterials`、`cssKit`、`tiperes`という4つのライブラリを備えています。(後述)

- 現行バージョン -> ftuttes@3.0.1

<h6>公式サイト : https://rerurate514.github.io/fTutteS-Wiki/</h6>

![NPM Version](https://img.shields.io/npm/v/ftuttes)
![NPM Unpacked Size : mjs and js](https://img.shields.io/npm/unpacked-size/ftuttes)
![NPM Last Update](https://img.shields.io/npm/last-update/ftuttes)
![NPM Downloads](https://img.shields.io/npm/dw/ftuttes)
![NPM License](https://img.shields.io/npm/l/ftuttes)
![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/ftuttes)
![GitHub repo size](https://img.shields.io/github/repo-size/rerurate514/ftuttes)
![GitHub branch status](https://img.shields.io/github/checks-status/rerurate514/ftuttes/develop)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/rerurate514/ftuttes)
![GitHub last commit](https://img.shields.io/github/last-commit/rerurate514/ftuttes)
![X (formerly Twitter) URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Fx.com%2Frerurate)

<div align="center">
	</br>
	</br>
	<img src="src/ftuttes-official-logo.svg" width="25%">	
	</br>
	</br>
	<strong>fTutteS</strong>
</div>
</br>
</br>

## 内部ライブラリとその説明
### fTutteS-Core
コンポーネントやウィジェットを作成するために必要な基本的なコード群

### fTutteS-Jaterials
基本的なコンポーネント群が格納されているライブラリ

### fTutteS-CSSKit
Taterialsで定義されているコンポーネントに対して、CSSを簡単に適用することができるライブラリ

### fTutteS-Tiperes
providerによる状態管理と、それを使役するコンポーネントなどのライブラリ

## インストール方法
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
    "build": "rollup -c"
},
```

`type`オプションは`module`に設定してください。
```tson
...

"version": "1.0.0",
"main": "index.js",
"type": "module", //ここを設定
"scripts": {
    "build": "rollup -c"
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
    "incremental": true,                      /* 変更のあったファイルのみをコンパイルし、ビルドを高速化します。*/
    "composite": true,                        /* プロジェクト参照を有効にし、大規模なプロジェクトの管理を容易にします。*/
    "tsBuildInfoFile": "./.tsbuildinfo",      /* インクリメンタルコンパイルのための情報を保存するファイルのパスを指定します。*/

    /* 言語と環境 */
    "target": "es2021",                       /* ターゲットとする ECMAScript のバージョンを指定します。最新の機能を利用する場合は es2021 以降を推奨します。 */
    "lib": [                                  /* ターゲット環境で利用可能な API の型定義を含めます。 */
      "es2021",
      "dom",                                  /* ブラウザ環境で動作する場合 */
      "esnext.asynciterable"                  /* async iterable を使用する場合 */
      // 必要に応じて追加・削除してください (例: "webworker", "node")
    ],
    "esModuleInterop": true,                  /* CommonJS モジュールとの相互運用性を高めます。これにより、default export を持たない CommonJS モジュールを named import としてインポートできるようになります。 */
    "forceConsistentCasingInFileNames": true, /* ファイル名の大文字・小文字の区別を厳密にします。これにより、異なる OS 間での移植性を高めます。 */
    "useDefineForClassFields": true,         /* ECMAScript 標準に準拠したクラスフィールドの挙動を有効にします。 */

    /* モジュール */
    "module": "ESNext",                       /* 生成するモジュールの形式を指定します。モダンな環境では ESNext を推奨します。 */
    "moduleResolution": "node",               /* モジュールの解決方法を指定します。Node.js の方式に準拠します。 */
    "baseUrl": "./",                          /* 非相対モジュール名の解決に使用するベースディレクトリを指定します。 */
    "paths": {                                /* モジュールパスのリマッピングを設定します。エイリアスなどを定義する際に使用します。 */
      // 例: "@components/*": ["./src/components/*"]
    },
    "resolveJsonModule": true,                 /* .json ファイルのインポートを許可します。 */

    /* JavaScript サポート (段階的な移行などに便利) */
    "allowJs": true,                         /* JavaScript ファイルのコンパイルを許可するかどうかを指定します。新規プロジェクトでは false を推奨します。 */
    "checkJs": true,                      /* JavaScript ファイルのエラーチェックを有効にするかどうかを指定します。 */

    /* Emit (出力設定) */
    "outDir": "./dist",                       /* コンパイルされた JavaScript ファイルの出力先ディレクトリを指定します。 */
    "declaration": true,                      /* .d.ts (型定義ファイル) を生成するかどうかを指定します。ライブラリや共有コンポーネントを作成する場合は true にします。 */
    "declarationMap": true,                   /* .d.ts ファイルに対応するソースマップファイルを生成するかどうかを指定します。 */
    "sourceMap": true,                        /* .js ファイルに対応するソースマップファイルを生成するかどうかを指定します。デバッグ時に便利です。 */
    "removeComments": true,                   /* コンパイル後の JavaScript ファイルからコメントを削除します。 */
    "noEmitOnError": true,                    /* 型チェックエラーがある場合に JavaScript ファイルの出力を抑制します。 */
    // "emitDeclarationOnly": true,           /* .d.ts ファイルのみを出力し、.js ファイルは出力しません。 */

    /* 相互運用性の制約 */
    "isolatedModules": true,                  /* 各ファイルを独立したモジュールとしてコンパイルすることを強制します。tree-shaking との相性が良くなります。 */
    "verbatimModuleSyntax": true,             /* 型のみのインポート/エクスポートを削除しません。ランタイムの挙動に影響を与えないことを明確にします。 */

    /* 型チェック */
    "strict": true,                           /* 全ての厳格な型チェックオプションを有効にします。 */
    "noImplicitAny": true,                    /* 型が明示的に指定されていない変数やパラメータに対してエラーを発生させます。 */
    "strictNullChecks": true,                 /* null および undefined の型チェックを厳密に行います。 */
    "strictFunctionTypes": true,              /* 関数型の互換性をより厳密にチェックします。 */
    "strictBindCallApply": true,              /* bind、call、apply の引数の型チェックを厳密に行います。 */
    "strictPropertyInitialization": true,     /* クラスのプロパティがコンストラクタ内で初期化されていることを確認します。 */
    "noImplicitThis": true,                   /* this の型が any になる可能性のある箇所でエラーを発生させます。 */
    "useUnknownInCatchVariables": true,       /* catch 句の変数の型をデフォルトで unknown にします。より安全なコーディングを促します。 */
    "alwaysStrict": true,                     /* 生成される JavaScript に "use strict" を常に含めます。 */
    "noUnusedLocals": true,                   /* 使用されていないローカル変数をエラーとして報告します。コードの可読性を高めます。 */
    "noUnusedParameters": true,               /* 使用されていない関数パラメータをエラーとして報告します。 */
    "noImplicitReturns": true,                /* 関数内で全てのコードパスが値を返すことを保証します。 */
    "noFallthroughCasesInSwitch": true,       /* switch 文の case が意図的に fallthrough しない場合にエラーを報告します。 */
    "noUncheckedIndexedAccess": true,         /* インデックスアクセス時に undefined の可能性を考慮した型にします (例: array[index] は T | undefined)。 */
    "noImplicitOverride": true,               /* override 修飾子がない場合に、基底クラスのメソッドをオーバーライドしているメンバーをエラーとして報告します。 */
    "noPropertyAccessFromIndexSignature": true, /* インデックスシグネチャを持つ型へのプロパティアクセスを禁止し、インデックスアクセスのみを強制します。 */

    /* 完成度 */
    "skipLibCheck": false                     /* .d.ts ファイルの型チェックをスキップするかどうかを指定します。通常は false に設定し、型定義のエラーもチェックするようにします。 */
  },
  "include": [                                /* コンパイルの対象となるファイルを指定します。 */
    "src/**/*"
  ],
  "exclude": [                                /* コンパイルの対象から除外するファイルを指定します。 */
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.spec.ts"
  ],
  "references": [                             /* プロジェクト参照を設定します。composite: true が必要です。 */
    // { "path": "./packages/package1" },
    // { "path": "./packages/package2" }
  ]
}

```

### npm install
`npm install`を使用して`fTutteS`をインストールします。
```bash
npm install fTutteS
```

### rollup
ブラウザがTypeScriptを認識されるようにするために`rollup`と関連ライブラリをインストールします。(他のバンドラを使用することもできます。)
```bash
npm install --save-dev rollup @rollup/plugin-typescript @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-terser
```

ルートディレクトリに`rollup.config.js`ファイルを作成し、以下を貼り付けます。
```ts
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

export default {
    input: 'script.ts', // 利用側の TypeScript エントリーポイント
    output: [
        {
            file: 'dist/bundle.js', // ブラウザ向けの出力ファイル (UMD 形式)
            format: 'umd',
            name: 'MyApp', // 利用側のアプリケーションのグローバル変数名
            sourcemap: true,
        },
        {
            file: 'dist/bundle.esm.js', // ES Modules 形式 (比較的新しいブラウザ向け)
            format: 'es',
            sourcemap: true,
        },
    ],
    plugins: [
        typescript(), // TypeScript をコンパイル
        nodeResolve({
            browser: true, // ブラウザ環境向けの解決を優先
        }),
        commonjs(), // CommonJS モジュールを ES Modules に変換 (ftuttes が CommonJS 形式の場合に必要)
        terser(), // minify
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
`npm run build`を実行してから、VSCodeの拡張機能のLive-serverや実際にデプロイ、`index.html`をブラウザで開く、、などしてページを表示すると、おそらく`てすと`と表示されていると思います。


### ウィジェットの作成
#### Viewの継承
まず、このフレームワークには全てのウィジェットの根幹となる`View`インターフェースが提供されています。
このクラスを継承するのが、ウィジェット作成の第一段階です。
```ts
class SampleWidget extends View {
	...
}
```

#### Viewコンストラクタの呼び出し
そして、`View`クラス側でウィジェットを描画するのに必要な処理を行うために`View`のコンストラクタを呼び出します。
```ts
class SampleWidget extends View {
	constructor(){
		super();
	}
}
```

#### ウィジェットの要素定義
次にこのウィジェットの`HTMLElement`要素を定義します。
これには`View`クラスで定義されている`createWrapView`をオーバーライドして作成します。
これにはJSで使用できる`document.createElement`メソッドを使用して`HTMLElement`を作成できます。
```ts
class SampleWidget extends View {
	constructor(){
		super();
	}

	override createWrapView(){
		let div = document.createElement("div");
		return div;
	}
}
```
もし作成したい要素が`div`ならばオーバーライドする必要はないです。
今回の例ではオーバーライドせずに例を示します。

#### ウィジェットのスタイル定義
`createWrapView`で作成した`HTMLElement`要素に対してスタイルを適用するには`styledView`メソッドをオーバーライドします。
```ts
class SampleWidget extends View {
	constructor(){
		super();
	}

	override styledView(element: HTMLElement): HTMLElement {
		element.className = "sample-widget";

		element.style.backgroundColor = "red";
		element.style.width = "100px";
		element.style.height = "100px";

		return element;
	}
}
```
`styledView`メソッドには引数として、`createWrapView`で作成した`HTMLElement`が渡されます。
スタイルの適用の詳細には`HTMLElement`を参照してください。
このメソッドの最後で必ずスタイルを適用した要素を`return`で返却してください。
返却しない場合、以下のエラーが返されます。
```error
throw new TypeError("styledViewには必ずHTMLElenmentオブジェクトを格納してください。 渡された型:", typeof child);
```

なお、このメソッドに用がない場合、オーバーライドせずに無視してもらっても構いません。
#### embedScriptToView
もしウィジェットに何らかのJSで標準用意されているスクリプトを埋め込みたいなら`embedScriptToView`内で行ってください。
例えば、ラジオボタンのイベントの発火などです。
```ts
override embedScriptToView(element: HTMLLabelElement): HTMLLabelElement {
    this._setEventListenerToRadioBtn(element);
    return element;
}

private _setEventListenerToRadioBtn(radioBtn: HTMLLabelElement): void {
    const radioInput = radioBtn.firstElementChild as HTMLInputElement;
    radioInput.addEventListener("change", (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.checked) {
            //イベントの発火により動作するコード
        }
    });
}
```
このメソッドでも最後に要素を`return`で返却してください。
返却しない場合、以下のエラーが返されます。
```error
throw new TypeError("embedScriptToViewには必ずHTMLElenmentオブジェクトを格納してください。 渡された型:", typeof child);
```

なお、このメソッドに用がない場合、オーバーライドせずに無視してもらっても構いません。

#### ウィジェットの子要素を作成する。
`createWrapView`で作成した要素の中に子要素を入れていくには`build`メソッドをオーバーライドして使用します。
ここには自身で作成したウィジェットや`fTutteS`で用意されているコンポーネントが使用できます。
```ts
class SampleWidget extends View {
	constructor(){
		super();
	}

	override styledView(element){
		element.className = "sample-widget";

		element.style.backgroundColor = "red";
		element.style.width = "100px";
		element.style.height = "100px";

		return element;
	}

    override build() {
        return new Text({
            text: "Hello World"
        })
    }
}
```
ここでは`Text`コンポーネントを使用して文字を表示してみます。
このとき必ず、コンポーネントやウィジェットを`return`で返却してください。
これで一つの基本的なウィジェットを作成することができました。

### ウィジェットに値の受け渡し
例えば、ウィジェットに子要素を渡して、それを子要素でビルドして欲しい時や親要素のプロパティを子要素に渡して表示して欲しい時があるかもしれません。
その際のやり方をこのセクションでは解説します。

まず皆さんが親要素から渡された文字列を`Text`コンポーネントで表示したいとき、このように書くかもしれません。
```ts
class SampleWidget extends View {
    private text: string;

	constructor(text: string){
		super();
		this.text = text;//ここでSampleWidgetのインスタンス変数に格納
	}

	override styledView(element){
		element.className = "sample-widget";

		element.style.backgroundColor = "red";
		element.style.width = "100px";
		element.style.height = "100px";

		return element;
	}

    override build() {
        return new Text({
            text: this.text
        })
    }
}
```

同様に子要素を渡された場合でも、
```ts
class SampleWidget extends View {
    private child: View;

    constructor(child: View) {
        super();
        this.child = child;
    }

	override styledView(element){
		element.className = "sample-widget";

		element.style.backgroundColor = "red";
		element.style.width = "100px";
		element.style.height = "100px";

		return element;
	}

    override build() {
        return new Column({
            children: [
                this.child,
                this.child,
                this.child,
            ]
        })
    }
}
```
と書くことで、簡単に子要素を描画することができます。

### Providerによる状態管理
この`fTutteS`フレームワークには`Tiperes`という状態管理ライブラリが付属しています。
値が変更されたことによって、ウィジェットをリビルド、再描画したい際にはProviderを使用して行います。
#### Providerの作成
Providerを作成するには`Provider`クラスのファクトリメソッド`createProvider()`を使用して行います。
以下に試しに作成してみます。
```ts
const sampleProvider = Provider.createProvider(() => {
	return 0;
})
```
引数には関数オブジェクトを渡し、その中で初期値を`return`で返却します。これはプリミティブな数値を管理、保持、監視するProviderです。ただし、なんの設定もしていないと値の変更の監視はできません。

#### Providerの使用-ProviderScope-read
Providerの値の変更を監視するためにはView単位で行います。
`fTutteS`では、値の変更を自動的に監視し、再描画を行う`ProviderScope`というインターフェースを提供しています。
`ProviderScope`を継承してウィジェットを作成します。
```ts
import { assembleView, Column, ElevatedButton, Provider, ProviderScope, Row, Text, View } from "ftuttes";

const sampleProvider = Provider.createProvider(() => {
    return 0;
});

class SampleWidget extends ProviderScope {
	constructor(private child: View, providers: Provider<any>[]){
		super({
            providers: providers
        });
	}

	override styledView(element: HTMLElement): HTMLElement{
		element.className = "sample-widget";

		element.style.backgroundColor = "yellow";
		element.style.width = "100px";
		element.style.height = "100px";

		return element;
	}

	override build(){
		let num = sampleProvider.read();

		return new Column({
            children: [
                new ElevatedButton({
                    onClick: () => {
                        sampleProvider.update((currentValue) => {
                            return currentValue + 1;
                        })
                    },
                    child: new Text({
                        text: "Click Here!"
                    }),
                }),
                new Row({
                    children: [
                        this.child,
                        new Text({
                            text: num.toString()
                        })
                    ]
                }),
            ]
        });
	}
}

assembleView(
    new SampleWidget(
        new Text({
            text: "value="
        }),
        [
            sampleProvider
        ]
    )
);
```
`ProviderScope`クラスにはコンストラクタとして、三つのプロパティを渡すことができます。
`props`と`watchingProvider`、`child`です。
`props`には`View`と同じ役割を持ちます。
`watchingProvider`には、Providerの配列を渡します。
`ProviderScope`に渡されたProviderは自動的にリッスン状態になり、配列のProviderの一つでも値が変更されると、`ProviderScope`を継承したウィジェットが再ビルドされます。

ここでは`Provider`クラスの`read`メソッドを使用して値を読み取っています。
`read`メソッドはただ値を読み取るためのメソッドです。

#### Providerの使用-ProviderScope-update
Providerの値を変更してウィジェットを再描画するには`Provider`クラスの`update`メソッドを使用します。
今回は`ElevatedButton`を押したら`counter`の値をインクリメントして、`Text`に反映されるコードを作成してみます。
```ts
import { 
    assembleView, 
    Text, 
    Card, 
    Column,
    ElevatedButton,
    BaseCSS,
    SpaceBox,
    Center, 
    TextCSS, 
    FontCSS, 
    Provider, 
    ProviderObserver, 
    ProviderScope,
    ShadowLevel,
} from './node_modules/ftuttes/dist/index.mjs';

const counter = Provider.createProvider((ref) => {
    return 0;
}, "counter");

class ProviderExample extends ProviderScope {
    constructor(){
        super({
            watchingProviders: [ counter ]
        });
    }

    override styledView(element){
        element.style.height = "90vh";

        return element;
    }

    override build(){
        counter.read()

        return new Center(
            new Card({
                radius:"16px",
                padding: "15px",
                background: "wheat",
                elevation: ShadowLevel.LVL5,
                child: new Column({
                    children: [
                        new ElevatedButton({
                            child: new Text("CLICK!"),
                            baseCSS: new BaseCSS({
                                height: "32px",
                            }),
                            onClick: () => {
                                counter.update((value) => {
                                    return value + 1;
                                })
                            }
                        }),
                        new SpaceBox({height: "16px"}),
                        new Text("click count : " + counter.read()),
                    ]
                }),
            })
        );
    }
}

assembleView(
    new ProviderExample()
);
```
`ElevatedButton`コンポーネントの`onClick`プロパティにて`Provider`の`update`を実行しています。
`update`にはその`Provider`の現在の値が渡されるので、その値にインクリメントをして`return`で返却し値を変更しています。
その結果、`ProviderScope`を継承したウィジェット自身が`Provider`内の値の変更を検知し自身を再描画します。

全てのコードを見る場合はこちらから確認することができます。
https://github.com/Rerurate514/fTutteS/blob/main/example-code/providerExample.html

#### Provider例-依存関係
`Provider`クラスには依存関係を管理する機能があります。
ここでは簡単なユーザを管理する`Provider`を作成します。
```ts
//プロバイダーを作成
const userProvider = Provider.createProvider(ref => {
    return { name: "Jhon", age: 25 };
});
```

そして`userProvider`内の`age`を監視するには以下のように`ref`を使用して`provider`を作成します。
```ts
const userAgeProvider = Provider.createProvider(ref => {
    ref.watch(userProvider, (user, currentValue) => {
        return user.age;
    });
    return ref.read(userProvider).age;
});
```
このように記述すると、自動的に`userProvider`がリッスン状態になり、`userProvider`の`age`が変更された際に`userAgeProvider`の値を自動的に変更します。これは`watch`または`ProviderScope`で`userAgeProvider`の変更を監視することができます。

#### LimitedProviderScope
`ProviderScope`インターフェースは`View`を継承しなければならず、さらに`watch`している`provider`の値が変更されるたびに再描画されてパフォーマンスが下がってしまいます。
これを解決するために`fTutteS`はその`rebuild`のスコープを狭めてくれる`LimitedProviderScope`コンポーネントを提供しています。
```ts
import { assembleView, BaseCSS, Center, Column, ElevatedButton, LimitedProviderScope, Provider, SpaceBox, Text, View } from "ftuttes";

const counter = Provider.createProvider(() => {
    return 0;
}, "counter");

class ProviderExample extends View {
    constructor(){
        super();
    }

    override styledView(element: HTMLElement): HTMLElement{
        element.style.height = "90vh";

        return element;
    }

    override build(){
        return new Center({
            child: new Column({
                children: [
                new ElevatedButton({
                    child: new Text({
                        text: "CLICK!"
                    }),
                    baseCSS: new BaseCSS({
                        padding: "32px",
                    }),
                    onClick: () => {
                        counter.update((value: any) => {
                            return value + 1;
                        })
                    }
                }),
                new SpaceBox({height: "16px"}),
                new LimitedProviderScope({
                    providers: [ counter ],
                    builder: (providerValue) => {
                        return new Text({
                            text: "click count : " + providerValue
                        });
                    }
                })
            ]
            }),
        });
    }
}

assembleView(
    new ProviderExample()
);
```
通常の`ProviderScope`を継承したやり方では、この`ProviderExample`ウィジェット全体が再描画されてしまいます。しかし、この`LimitedProviderScope`を使用したやり方では`Text`コンポーネントのみが再描画されます。この`build`関数オブジェクトの引数ですが、`provider`を`providers`で格納した順番でそれぞれの`Provider`の値が格納された配列が返されます。

#### ProviderObserverによる値の変更確認
`Tiperes`には`ProviderObserver`という`Provider`の値の変更履歴や依存関係を記録するクラスが実装されています。

そして、以下のコードを使用してログを確認することができます。  
##### `Provider`の更新時、依存関係構築時にログを出力する。
```ts
new ProviderObserver().outLogs()
```  
  
##### `Provider`の更新履歴  
```ts
console.log(new ProviderObserver().getAllUpdateHistory());
```  
  
##### 特定の`Provider`の更新履歴  
```ts
console.log(new ProviderObserver().getFilteredUpdateHistory(userProvider));
```  
  
##### `Provider`の依存関係を表示  
```ts
console.log(new ProviderObserver().getDependencyGraph());
```

## 用語集
- View(ビュー)：`View`クラスまたはその他UI構築クラスから継承して作成されたUI部品
- コンポーネント：`fTutteS`側から提供されるViewのこと
- ウィジェット：`fTutteS`使用者がコンポーネントを組み合わせて作成したViewのこと
- インターフェース：`fTutteS`が提供している継承することで機能を使用できるクラスのこと。(`View`や`ProviderScope`など)

## 最後に余談
//TODO

## ライセンス
MIT
