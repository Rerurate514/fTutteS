
# THIS IS PURE TypeScript FRAMEWORK
## fTutteSとは
`fTutteS`とは、TypeScriptで構成されたライブラリです。Flutterのような書き心地でWeb画面をデザインすることができます。`fTutteS`の中には、`core`、`taterials`、`cssKit`、`tiperes`、`tommand`、`transitus`という6つのライブラリを備えています。(後述)

- 現行バージョン -> ftuttes@0.9.4

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
	<img src="assets/ftuttes-official-logo.svg" width="25%">	
	</br>
	</br>
	<strong>fTutteS</strong>
</div>
</br>
</br>

## 内部ライブラリとその説明
### fTutteS-Core
コンポーネントやウィジェットを作成するために必要な基本的なコード群。
基本的にはレンダリング担当だと考えてもらえればと思います。

### fTutteS-Taterials
基本的なコンポーネント群が格納されているライブラリです。
おおよそFlutterと同じラインナップを目指していますが、現段階でコンポーネントの数はそこまで多くはありません。
ただ、基本的なレイアウトは作成することができます。

### fTutteS-CSSKit
Taterialsで定義されているコンポーネントに対して、CSSを簡単に適用することができるライブラリ。

### fTutteS-Tiperes
providerによる状態管理と、それを使役するコンポーネントのライブラリ。
また、それらproviderへの状態監視も兼ね備えています。
そのうち、別ライブラリに分離するかもしれない...

### fTutteS-Tommand(別ライブラリ)
ftuttesによるnpxコマンド定義ライブラリです。
このライブラリをインストールする必要はありません。
npx経由でftuttesプロジェクトとtransitusプロジェクトをセットアップするためのライブラリです。
- https://github.com/Rerurate514/fTutteS-Tommand
- https://www.npmjs.com/package/tommand

### fTutteS-Transitus(別ライブラリ)
ftuttes専用に構築されたNodeJSウェブルーティングサーバーライブラリです。
このライブラリを使用するには、プロジェクト内で必ずftuttesをインストールする必要があります。
- https://github.com/Rerurate514/fTutteS-Transitus
- https://www.npmjs.com/package/transitus

### fTutteS-Trystalize(別ライブラリ)
fTutteSで作成されたViewなどを静的なファイルに変換するライブラリです。

現在、開発中...
- https://github.com/Rerurate514/fTutteS-Trystalize
- https://www.npmjs.com/package/trystalize

## インストール方法
## npxが使用できる場合
もしnpxを使用できる環境なら以下のコマンドを打つだけでテンプレートプロジェクトが生成されます。
```shell
npx tommand create-ftuttes プロジェクト名
```

さらにtransitusを使用して、Webルーティングを行いたかったり、単体で動作させたい場合は以下のコマンドを使用します。
```shell
npx tommand create-transitus-ftuttes プロジェクト名
```

npxが使用できない場合は[SETUP.md](https://github.com/Rerurate514/fTutteS/blob/main/docs/SETUP.md)を参照してください。
または、[npxパッケージのダウンロード元テンプレート](https://github.com/Rerurate514/fTutteS-Tommand/tree/master/templates/default)からファイルをローカルに落としてください。

## 用語集
- View(ビュー)：`View`クラスまたはその他UI構築クラスから継承して作成されたUI部品
- コンポーネント：`fTutteS`側から提供されるViewのこと
- ウィジェット：`fTutteS`使用者がコンポーネントを組み合わせて作成したViewのこと
- インターフェース：`fTutteS`が提供している継承することで機能を使用できるクラスのこと。(`View`や`ProviderScope`など)

## 実際の使用方法
### ウィジェットの作成
#### Viewの継承
Viewインターフェースの詳細は[VIEW_INTERFACE_USAGE.md](https://github.com/Rerurate514/fTutteS/blob/main/docs/VIEW_INTERFACE_USAGE.md)にも示されています。このREADMEでは基本的で最も小さい形で`View`を説明します。

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
        });
    }
}
```
ここでは`Text`コンポーネントを使用して文字を表示してみます。
このとき必ず、コンポーネントやウィジェットを`return`で返却してください。
これで一つの基本的なウィジェットを作成することができました。

### ウィジェットに値の受け渡し
例えば、ウィジェットに子要素を渡して、それを子要素でビルドして欲しい時や親要素のプロパティを子要素に渡して表示して欲しい時があるかもしれません。
その際のやり方をこのセクションでは解説します。

まず、`ftuttes`では親要素から渡された文字列を`Text`コンポーネントで表示したいとき、このように記述します。
```ts
class SampleWidget extends View {
    private text: string;

    constructor(text: string){
        super();
        this.text = text;//ここでSampleWidgetのインスタンス変数に格納
    }

    override styledView(element: HTMLElement){
        element.className = "sample-widget";

        element.style.backgroundColor = "red";
        element.style.width = "100px";
        element.style.height = "100px";

        return element;
    }

    override build() {
        return new Text({
            text: this.text
        });
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

    override styledView(element: HTMLElement){
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
        });
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
        [ sampleProvider ]
    );
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
} from 'ftuttes';

const counter = Provider.createProvider((ref) => {
    return 0;
}, "counter");

class ProviderExample extends ProviderScope {
    constructor(){
        super({
            watchingProviders: [ counter ]
        });
    }

    override styledView(element: HTMLElement){
        element.style.height = "90vh";

        return element;
    }

    override build(){
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
import { 
    assembleView, 
    BaseCSS, 
    Center, 
    Column, 
    ElevatedButton, 
    LimitedProviderScope, 
    Provider, 
    SpaceBox, 
    Text, 
    View 
} from "ftuttes";

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
                        builder: ([providerValue]) => {
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

## コンポーネントの一覧
現在実装されているコンポーネントの一覧は[COMPONENTS.md](https://github.com/Rerurate514/fTutteS/blob/main/docs/COMPONENTS.md)にて閲覧することができます。

## 最後に余談
//TODO

## ライセンス
MIT
