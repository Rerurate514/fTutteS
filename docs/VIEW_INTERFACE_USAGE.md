# Viewクラスの実装と使用方法と仕様詳細
## 概要
`View`クラスは、fTutteSフレームワークにおける全てのウィジェットの基底となる抽象クラスです。UI要素の作成、スタイリング、スクリプトの埋め込み、そして子ウィジェットの構築と管理のためのコアなライフサイクルメソッドとロジックを提供します。このクラスは直接インスタンス化することはできず、継承して使用する必要があります。

## 主要な特徴
- **抽象クラス**: 直接インスタンス化不可、継承が必須
- **ライフサイクル管理**: 初期化から破棄まで一貫したライフサイクル
- **デバッグ支援**: `devMode`でのビジュアルデバッグ機能
- **階層構造**: 親子関係を持つView階層の構築と管理
- **再構築機能**: 状態変化に応じたUI更新をサポート

## プロパティ
### 基本プロパティ

| プロパティ | 型 | 説明 |
|------------|-----|------|
| `id` | `string` | このViewインスタンスに割り当てられた一意のUUID |
| `_view` | `HTMLElement` | このViewのルートとなるHTMLElement |
| `viewCache` | `HTMLElement` | スクリプトが埋め込まれた後のViewのDOM要素のキャッシュ |
| `viewChild` | `View \| Array<View> \| undefined` | この View が持つ子 View インスタンス |
| `view` | `HTMLElement` (getter) | このViewのルートHTMLElementへのアクセサ |

## ライフサイクルメソッド
ライフサイクルメソッドは上から順に`assembleView`メソッドの引数として渡された際に自動的に実行されます。
### 初期化フェーズ
#### `initialize()`
- **実行タイミング**: `assemble()`の最初のステップ
- **再実行**: `rebuild()`時には実行されない
- **用途**: Viewの初期化処理
- **オーバーライド**: 可能

#### `preBuild()`
- **実行タイミング**: `build()`メソッドの実行前
- **再実行**: `rebuild()`時にも実行される
- **用途**: UIを構築する前の準備処理
- **オーバーライド**: 可能

### 構築フェーズ
#### `build()`
- **実行タイミング**: View階層の構築時
- **戻り値**: `View | Array<View> | undefined`
- **用途**: 子Viewの定義（Flutterのbuildメソッドと同様）
- **オーバーライド**: 可能（推奨）

#### `postBuild()`
- **実行タイミング**: `build()`メソッドの実行後
- **再実行**: `rebuild()`時にも実行される
- **用途**: UIが構築された後の追加処理
- **オーバーライド**: 可能

### 完了フェーズ
#### `terminate()`
- **実行タイミング**: `assemble()`の最終ステップ
- **再実行**: `rebuild()`時には実行されない
- **用途**: 初期構築の終了処理
- **オーバーライド**: 可能

#### `onAssembleComplete()`
- **実行タイミング**: Viewのビルドが完全に終了した後
- **用途**: DOM要素が完全に利用可能になった後の処理
- **オーバーライド**: 可能

### 破棄フェーズ
#### `onDispose()`
- **実行タイミング**: Viewが完全に破棄される直前
- **用途**: イベントリスナーの解除、リソースのクリーンアップ
- **オーバーライド**: 可能
- **注意点**: 現段階(ftuttes@0.9.4)では実行できる段階として実装されていません。

## DOM操作メソッド
### `createWrapView()`
- **戻り値**: `HTMLElement`
- **用途**: このViewのルートとなるHTMLElement作成
- **デフォルト**: `document.createElement("div")`
- **オーバーライド**: 可能
- **備考**: もし、div要素をラッパーにしたいならオーバーライドをしなくてもよい

### `styledView(element: HTMLElement)`
- **引数**: スタイルを適用するHTMLElement
- **戻り値**: スタイルが適用されたHTMLElement
- **用途**: CSSスタイルの適用
- **オーバーライド**: 可能

### `embedScriptToView(element: HTMLElement)`
- **引数**: スクリプトを埋め込むHTMLElement
- **戻り値**: スクリプトが埋め込まれたHTMLElement
- **用途**: イベントリスナーなどのスクリプト埋め込み
- **オーバーライド**: 可能

## 公開メソッド(開発者から呼び出してもよい)
### `rebuild()`
- **用途**: Viewとその子孫Viewの再構築
- **使用場面**: 状態変化に応じたUI更新
- **実行内容**: `initialize()`と`terminate()`以外のライフサイクルメソッドを再実行

### `updateStyle(stylePatch: Partial<CSSStyleDeclaration>)`
- **引数**: 更新したいCSSプロパティのオブジェクト
- **用途**: 部分的なスタイル更新（再レンダリング回避）
- **前提条件**: ViewがDOMにアタッチされていること

## 公開メソッド(`assembleView`内で自動的に実行される)
### `assemble()`
- **戻り値**: `HTMLElement`
- **用途**: Viewのレンダリングプロセスの開始
- **実行順序**:
  1. `initialize()`
  2. `preBuild()`
  3. `build()`
  4. `postBuild()`
  5. `terminate()`
  6. DOM要素の組み立て
  7. 子Viewの構築と追加

### `assembleComplete()`
- **用途**: 子孫Viewの`assembleComplete()`と`onAssembleComplete()`を再帰的に実行
- **実行タイミング**: 初回レンダリングまたは再ビルド完了後

## デバッグ機能
`devMode`が有効な場合、各Viewのコンテナには以下が追加されます。
- ウィジェットの名前表示
- ランダムな背景色
- 視覚的な識別のためのインジケーター

## 使用例
### 基本的なカスタムView
```typescript
class MyCustomView extends View {
  constructor(private message: string) {
    super();
  }

  // なくともよい
  override createWrapView(): HTMLElement {
    return document.createElement("div");
  }

  override styledView(element: HTMLElement): HTMLElement {
    element.style.border = "1px solid blue";
    element.style.padding = "10px";
    element.style.backgroundColor = "#e6f7ff";
    return element;
  }

  override embedScriptToView(element: HTMLElement): HTMLElement {
    element.addEventListener("click", () => {
      alert(`Message: ${this.message}`);
    });
    return element;
  }

  override build(): View {
    return new Text({
      textCSS: new TextCSS({
        fontCSS: new FontCSS({
          color: "darkblue",
          fontWeight: "bold"
        })
      }),
      text: this.message
    });
  }
}
```

## 内部実装詳細
### View階層の管理
- **単一子View**: `assembleSingleView()`で処理
- **複数子View**: `assembleMultiView()`で配列として処理
- **子Viewなし**: ラッパー要素のみ使用

### IDとデータセット属性
- 各ViewにはユニークなUUIDが自動割り当て
- `data-view-class-name`属性にクラス名が設定
- デバッグ時の要素特定に活用

### エラーハンドリング
- HTMLElement型チェック
- 抽象クラスの直接インスタンス化防止
- DOM接続状態の確認（`updateStyle`時）

## 注意事項
1. **抽象クラス**: 直接`new View()`はできません
2. **HTMLElement検証**: DOM操作メソッドは必ずHTMLElementを返す必要があります
3. **ライフサイクル遵守**: オーバーライド時も適切な戻り値を返してください
4. **メモリ管理**: `onDispose()`でリソースの適切なクリーンアップを行ってください

## 拡張時のベストプラクティス
1. **コンストラクタ**: 必ず`super()`を呼び出す
2. **build()**: 子Viewの構造を明確に定義
3. **スタイル分離**: CSSロジックは`styledView()`に集約、または`BaseCSS`などを利用する
4. **イベント管理**: `embedScriptToView()`でイベントリスナー設定
5. **クリーンアップ**: `onDispose()`でリソース解放を忘れずにしてください
