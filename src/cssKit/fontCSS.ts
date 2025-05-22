interface FontCSSProperties {
    color?: string;
    fontStyle?: string;
    fontWeight?: string;
    fontSize?: string;
    lineHeight?: string;
    fontFamily?: string;
}

/**
 * FontCSSクラス
 * ## OverView
 * HTML要素に適用されるフォント関連のCSSプロパティをカプセル化します。
 * フォントの色、スタイル、太さ、サイズ、行の高さ、フォントファミリーを設定し、
 * それらをHTMLElementに適用するためのメソッドを提供します。
 *
 * ## Properties
 * @param properties - FontCSSの設定オプション
 * @param properties.color - オプション フォントの色 (`string`型, 例: `"black"`, `"#333"`, `"rgb(255,0,0)"`).
 * @param properties.fontStyle - オプション フォントのスタイル (`string`型, 例: `"normal"`, `"italic"`, `"oblique"`).
 * @param properties.fontWeight - オプション フォントの太さ (`string`型, 例: `"normal"`, `"bold"`, `"lighter"`, `"bolder"`, `"100"`〜`"900"`).
 * @param properties.fontSize - オプション フォントのサイズ (`string`型, 例: `"16px"`, `"1.2rem"`, `"large"`).
 * @param properties.lineHeight - オプション 行の高さ (`string`型, 例: `"1.5"`, `"24px"`, `"normal"`).
 * @param properties.fontFamily - オプション フォントファミリー (`string`型, 例: `"Arial, sans-serif"`, `"メイリオ", "Meiryo", sans-serif`).
 *
 * ## Methods
 * @method applyCSS
 * 指定されたHTML要素に、この`FontCSS`インスタンスで設定されたすべてのフォント関連のCSSプロパティを適用します。
 * @param element - CSSを適用するHTMLElement
 * @returns {HTMLElement} - スタイルが適用されたHTMLElement
 *
 * ## Getters
 * - `color`: 設定されたフォントの色を取得します。
 * - `fontStyle`: 設定されたフォントのスタイルを取得します。
 * - `fontWeight`: 設定されたフォントの太さを取得します。
 * - `fontSize`: 設定されたフォントのサイズを取得します。
 * - `lineHeight`: 設定された行の高さを取得します。
 * - `fontFamily`: 設定されたフォントファミリーを取得します。
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * const mySpan = document.createElement("span");
 * const fontCss = new FontCSS({
 *   color: "blue",
 *   fontSize: "18px",
 *   fontWeight: "bold",
 *   fontFamily: "Verdana, Geneva, sans-serif",
 *   lineHeight: "1.6"
 * });
 * mySpan = fontCss.applyCSS(mySpan);
 * mySpan.textContent = "Styled Text";
 * // mySpan is drawn with the specified font style
 * ```
 *
 * `Text`ウィジェットに`FontCSS`を適用する例
 * @example
 * ```typescript
 * new Text({
 *   textCSS: new TextCSS({
 *     fontCSS: new FontCSS({
 *       color: "green",
 *       fontSize: "22px",
 *       fontStyle: "italic",
 *       fontWeight: "medium"
 *     })
 *   }),
 *   text: "Beautiful Font"
 * });
 * ```
 */
export class FontCSS {
    constructor(private properties: FontCSSProperties = {}){ }

    applyCSS(element: HTMLElement): HTMLElement {
        if (this.properties.color) element.style.color = this.properties.color;
        if (this.properties.fontStyle) element.style.fontStyle = this.properties.fontStyle;
        if (this.properties.fontWeight) element.style.fontWeight = this.properties.fontWeight;
        if (this.properties.fontSize) element.style.fontSize = this.properties.fontSize;
        if (this.properties.lineHeight) element.style.lineHeight = this.properties.lineHeight;
        if (this.properties.fontFamily) element.style.fontFamily = this.properties.fontFamily;

        return element;
    }

    get color(): string | undefined {
        return this.properties.color;
    }

    get fontStyle(): string | undefined {
        return this.properties.fontStyle;
    }

    get fontWeight(): string | undefined {
        return this.properties.fontWeight;
    }

    get fontSize(): string | undefined {
        return this.properties.fontSize;
    }

    get lineHeight(): string | undefined {
        return this.properties.lineHeight;
    }

    get fontFamily(): string | undefined {
        return this.properties.fontFamily;
    }
}
