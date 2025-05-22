import { BorderCSS } from "./borderCSS";

interface BaseCSSProperties {
    width?: string;
    height?: string;
    margin?: string;
    padding?: string;
    background?: string;
    borderCSS?: BorderCSS;
}

/**
 * BaseCSSクラス
 * ## OverView
 * HTML要素に共通して適用される基本的なCSSプロパティをカプセル化します。
 * `width`, `height`, `margin`, `padding`, `background`、および`BorderCSS`のプロパティを設定し、
 * それらをHTMLElementに適用するためのメソッドを提供します。
 *
 * ## Properties
 * @param properties - BaseCSSの設定オプション
 * @param properties.width - オプション 要素の幅 (`string`型, 例: `"100px"`, `"50%"`).
 * @param properties.height - オプション 要素の高さ (`string`型, 例: `"auto"`, `"20vh"`).
 * @param properties.margin - オプション 要素の外側の余白 (`string`型, CSSの`margin`プロパティと同じ, 例: `"10px"`, `"5px 10px"`).
 * @param properties.padding - オプション 要素の内側の余白 (`string`型, CSSの`padding`プロパティと同じ, 例: `"8px"`, `"0 20px"`).
 * @param properties.background - オプション 要素の背景 (`string`型, CSSの`background`プロパティと同じ, 例: `"red"`, `"linear-gradient(to right, blue, green)"`).
 * @param properties.borderCSS - オプション 要素のボーダーを定義するための`BorderCSS`インスタンス。
 *
 * ## Methods
 * @method applyCSS
 * 指定されたHTML要素に、この`BaseCSS`インスタンスで設定されたすべてのCSSプロパティを適用します。
 * `borderCSS`が設定されている場合は、その`applyCSS`メソッドも呼び出されます。
 * @param element - CSSを適用するHTMLElement
 * @returns {HTMLElement} - スタイルが適用されたHTMLElement
 *
 * ## Getters
 * - `width`: 設定された幅を取得します。
 * - `height`: 設定された高さを取得します。
 * - `margin`: 設定されたマージンを取得します。
 * - `padding`: 設定されたパディングを取得します。
 * - `background`: 設定された背景を取得します。
 * - `borderCSS`: 設定されたBorderCSSインスタンスを取得します。
 * - `assembledBorder`: `borderCSS`が存在する場合、その`assembleCSS()`メソッドの結果（ボーダーのCSS文字列）を返します。
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * const myDiv = document.createElement("div");
 * const baseCss = new BaseCSS({
 *   width: "300px",
 *   height: "150px",
 *   margin: "20px auto",
 *   padding: "15px",
 *   background: "#f0f0f0",
 *   borderCSS: new BorderCSS({
 *     borderSize: "2px",
 *     borderProperty: "solid",
 *     color: "blue",
 *     radius: "10px"
 *   })
 * });
 * 
 * myDiv = baseCss.applyCSS(myDiv);
 * // myDivは指定されたスタイルで描画されます
 * ```
 *
 * `BaseCSS`をウィジェットに適用する例 (fTutteSのウィジェット内で使用)
 * @example
 * ```typescript
 * new Card({
 *   baseCSS: new BaseCSS({
 *     width: "200px",
 *     height: "100px",
 *     background: "lightblue",
 *     borderCSS: new BorderCSS({
 *       borderSize: "1px",
 *       borderProperty: "dashed",
 *       color: "darkblue"
 *     })
 *   }),
 *   child: new Text({ text: "スタイル適用済みカード" })
 * });
 * ```
 */
export class BaseCSS {
    constructor(private properties: BaseCSSProperties = {}){ }

    applyCSS(element: HTMLElement): HTMLElement {
        if (this.properties.width) element.style.width = this.properties.width;
        if (this.properties.height) element.style.height = this.properties.height;
        if (this.properties.margin) element.style.margin = this.properties.margin;
        if (this.properties.padding) element.style.padding = this.properties.padding;
        if (this.properties.background) element.style.background = this.properties.background;
        if (this.properties.borderCSS) element = this.properties.borderCSS.applyCSS(element);

        return element;
    }

    get width(): string | undefined {
        return this.properties.width;
    }

    get height(): string | undefined {
        return this.properties.height;
    }

    get margin(): string | undefined {
        return this.properties.margin;
    }

    get padding(): string | undefined {
        return this.properties.padding;
    }

    get background(): string | undefined {
        return this.properties.background;
    }

    get borderCSS(): BorderCSS | undefined {
        return this.properties.borderCSS;
    }

    get assembledBorder(): string | undefined {
        return this.properties.borderCSS?.assembleCSS();
    }
}
