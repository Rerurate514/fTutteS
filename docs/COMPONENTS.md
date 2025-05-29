# TATERIALS COMPONENTS WIKI
## OverView
このComponents.mdでは、コンポーネントの使い方などよりも、どのようなコンポーネントが存在するかを示したものになります。仕様は、各コンポーネントのドキュメンテーションコメントにて詳しく示されています。

## Layout Components
### Canvas
[Canvas Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/canvas.ts)
このコンポーネントは、HTMLのキャンバス要素をラップしたものになります。キャンバス要素を`ftuttes`にて使用したい場合に使用されます。

### Center
[Center Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/center.ts)
このコンポーネントは、自動的にこの親コンポーネントと同じ大きさになり、`Center`コンポーネント以下の子コンポーネントを縦横中央に配置します。

### Column
[Column Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/column.ts)
このコンポーネントは、子要素を縦方向（垂直）に配置するためのレイアウトコンポーネントです。
子要素は配列で渡し、配列の順番で子要素が上から描画されていきます。

### Grid
[Grid Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/grid.ts)
このコンポーネントは、子要素をグリッド状（格子状）に配置するためのレイアウトコンポーネントです。
行と列を指定して要素を規則的に並べることができます。

### Row
[Row Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/row.ts)
このコンポーネントは、子要素を横方向（水平）に配置するためのレイアウトコンポーネントです。
子要素は配列で渡し、配列の順番で子要素が左から描画されていきます。

### Scaffold
[Scaffold Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/scaffold.ts)
このコンポーネントは、アプリケーションの基本的な構造を定義するためのレイアウトコンポーネントです。
ヘッダー、ボディ、フッターなどの領域を提供します。
ただ、必ず使用しなければならないわけではなく、ただ領域を示すためのコンポーネントです。

### Stack
[Stack Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/stack.ts)
このコンポーネントは、子要素を重ね合わせて配置するためのレイアウトコンポーネントです。
子要素は配列で渡し、配列の順番で、描画されたコンポーネントの上から描画されていきます。

## Spacing / Margin Components
### Margin
[Margin Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/margin.ts)
このコンポーネントは、要素の外側に余白（マージン）を追加するためのスペーシングコンポーネントです。
上下左右個別または一括での余白設定が可能です。

### Padding
[Padding Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/padding.ts)
このコンポーネントは、要素の内側に余白（パディング）を追加するためのスペーシングコンポーネントです。
上下左右個別または一括での余白設定が可能です。

### SpaceBox
[SpaceBox Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/space_box.ts)
このコンポーネントは、指定したサイズの空間を作成するためのスペーシングコンポーネントです。
レイアウト内での空間制御に使用されます。

### Shrink
[Shrink Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/shrink.ts)
このコンポーネントは、子要素の存在を保持しながら、サイズを0にするためのスペーシングコンポーネントです。

## Position Components
### Position
[Position Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/position.ts)
このコンポーネントは、要素の絶対位置を指定するためのポジショニングコンポーネントです。top、left、right、bottomによる位置制御が可能です。
基本的には`Stack`コンポーネントとセットで使用しますが、なくてもかまいません。

### RelativePosition
[RelativePosition Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/relative_position.ts)
このコンポーネントは、要素の相対位置を指定するためのポジショニングコンポーネントです。
元の位置からの相対的な移動が可能です。
`Center`コンポーネントをより拡張したものと認識してください。

## Interaction Components
### ElevatedButton
[ElevatedButton Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/elevated_button.ts)
このコンポーネントは、立体的な見た目のボタンを作成するためのインタラクションコンポーネントです。
クリック時のアクションやホバーエフェクトが設定可能です。

### Hover
[Hover Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/hover.ts)
このコンポーネントは、マウスクリック時にInkEffectを表示するためのインタラクションコンポーネントです。
基本的に`ElevatedButton`コンポーネントに内蔵されています。

### Link
[Link Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/link.ts)
このコンポーネントは、ハイパーリンクを作成するためのインタラクションコンポーネントです。
外部サイトや内部ページへのナビゲーションが可能です。
ただし、`fTutteS-Taterials`ライブラリを使用していて、ドメイン内でパスから遷移したい場合は`Router`クラスを使用します。

### RadioButton
[RadioButton Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/radio_button.ts)
このコンポーネントは、複数の選択肢から一つを選択するためのインタラクションコンポーネントです。
グループ化された選択肢の中から単一選択が可能です。

### Slider
[Slider Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/slider.ts)
このコンポーネントは、範囲内の値を選択するためのインタラクションコンポーネントです。
ミニマム値からマキシマム値の間での値選択が可能です。

## Contents Components
### Card
[Card Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/card.ts)
このコンポーネントは、カード形式で情報を表示するためのコンテンツコンポーネントです。
影付き(オプション)の矩形領域内にコンテンツを配置できます。

### Header
[Header Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/header.ts)
このコンポーネントは、見出しやタイトルを表示するためのコンテンツコンポーネントです。
基本的に`Scaffold`コンポーネントの`header`プロパティに使用します。

### Image
[Image Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/image.ts)
このコンポーネントは、画像を表示するためのコンテンツコンポーネントです。
サイズ調整やalt属性の設定が可能です。
特に、リソースが存在する場所(ローカル、インターネット etc..)は問いません。

### Text
[Text Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/text.ts)
このコンポーネントは、テキストを表示するためのコンテンツコンポーネントです。
`TextCSS`を介してスタイルなどの設定が可能です。
ただし、フォント関係のCSSを操作する場合には、`TextCSS`に`FontCSS`クラスを渡して設定します。

### TextArea
[TextArea Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/text_area.ts)
このコンポーネントは、複数行のテキスト入力を行うためのコンテンツコンポーネントです。
行数やリサイズ可能性の設定が可能です。

### TextForm
[TextForm Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/text_form.ts)
このコンポーネントは、単一行のテキスト入力フィールドを作成するためのコンテンツコンポーネントです。
バリデーションやプレースホルダーの設定が可能です。

## Trans / Effect Components
### Transform
[Transform Components File](https://github.com/Rerurate514/fTutteS/blob/main/src/taterials/components/transform.ts)
このコンポーネントは、要素の座標変換や視覚効果を適用するためのエフェクトコンポーネントです。回転、拡大縮小、移動、歪みなどの変換処理が可能です。主な機能として、translate（移動）、rotate（回転）、scale（拡大縮小）、skew（歪み）を提供します。
また、指定したタイミングであらかじめ設定したアニメーションを実行する`animate`メソッドも付属しています。
