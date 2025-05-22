import { View } from "../../core/interface/view";
import { TextCSS } from "../../cssKit/textCSS";

interface TextProps {
    text: string;
    textCSS?: TextCSS;
}

/**
 * Textコンポーネント
 * ## OverView
 * HTMLの`<p>`要素をラップし、テキストコンテンツを表示します。
 * テキストのスタイルを`TextCSS`オブジェクトで詳細に制御できます。
 * デフォルトで`margin: 0`が適用されます。
 *
 * ## Props
 * @param props - Textの設定オプション
 * @param props.text - 必須 表示するテキスト文字列
 * @param props.textCSS - オプション テキストに適用するスタイルを定義する`TextCSS`オブジェクト
 * - 例: フォントの色、サイズ、太さなど
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * new Text({
 *   textCSS: new TextCSS({
 *     fontCSS: new FontCSS({
 *       color: "red",
 *       fontSize: "24px",
 *       fontWeight: "bold",
 *       fontFamily: "Arial, sans-serif"
 *     })
 *   }),
 *   text: "Hello, fTutteS!"
 * });
 * ```
 * 最小限の設定
 * @example
 * ```typescript
 * new Text({
 *   text: "Simple Text"
 * });
 * ```
 */
export class Text extends View {
    constructor(protected props: TextProps) {
        super();
    }

    override createWrapView(): HTMLElement {
        return document.createElement("p");
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.textContent = this.props.text;
        element.style.margin = "0";

        element = (this.props.textCSS || new TextCSS()).applyCSS(element) 

        //if(this.props.textCSS.webkitCSS) element = this.props.textCSS.webkitCSS.applyCSS(element);

        return element;
    }
}
