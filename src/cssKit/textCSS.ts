import { FontCSS } from "./fontCSS";

interface TextCSSProperties {
    fontCSS?: FontCSS;
    letterSpacing?: string;
    textAlign?: string;
    textAlignLast?: string;
    textIndent?: string;
    textTransform?: string;
    lineBreak?: string;
    textOverflow?: string;
    textWrap?: string;
    wordBreak?: string;
    textDecoration?: string;
    textEmphasis?: string;
    textShadow?: string;
    writingMode?: string;
    textCombineUpright?: string;
    textOrientation?: string;
    //webkitCSS?: WebkitCSS;
}

/**
 * TextCSSクラス
 *
 * ## OverView
 * HTML要素に適用されるテキスト関連のCSSプロパティをカプセル化します。
 * 文字間隔、テキストの配置、単語の折り返し、テキストの装飾など、多岐にわたるテキストスタイルを設定できます。
 * また、`FontCSS`インスタンスを内包することで、フォント関連のスタイルも同時に管理できます。
 *
 * ## Properties
 * @param properties - TextCSSの設定オプション
 * @param properties.fontCSS - オプション テキストのフォントスタイルを定義する`FontCSS`インスタンス。
 * @param properties.letterSpacing - オプション 文字間隔 (`string`型, 例: `"1px"`, `"0.1em"`).
 * @param properties.textAlign - オプション テキストの水平方向の配置 (`string`型, 例: `"left"`, `"center"`, `"right"`, `"justify"`).
 * @param properties.textAlignLast - オプション テキストの最終行の水平方向の配置 (`string`型, 例: `"auto"`, `"left"`, `"center"`, `"right"`).
 * @param properties.textIndent - オプション テキストの最初の行のインデント (`string`型, 例: `"20px"`, `"2em"`).
 * @param properties.textTransform - オプション テキストの文字変換 (`string`型, 例: `"none"`, `"uppercase"`, `"lowercase"`, `"capitalize"`).
 * @param properties.lineBreak - オプション 行の折り返しルール (`string`型, 例: `"auto"`, `"loose"`, `"normal"`, `"strict"`).
 * @param properties.textOverflow - オプション コンテンツが要素をオーバーフローした場合の表示方法 (`string`型, 例: `"clip"`, `"ellipsis"`).
 * @param properties.textWrap - オプション テキストの折り返し (`string`型, 例: `"wrap"`, `"nowrap"`, `"balance"`).
 * @param properties.wordBreak - オプション 単語の改行ルール (`string`型, 例: `"normal"`, `"break-all"`, `"keep-all"`).
 * @param properties.textDecoration - オプション テキストの装飾 (`string`型, 例: `"none"`, `"underline"`, `"overline"`, `"line-through"`).
 * @param properties.textEmphasis - オプション テキストの強調マーク (`string`型, 例: `"none"`, `"filled dot"`, `"open circle"`).
 * @param properties.textShadow - オプション テキストの影 (`string`型, CSSの`text-shadow`プロパティと同じ, 例: `"2px 2px 4px #aaa"`).
 * @param properties.writingMode - オプション テキストの書字方向 (`string`型, 例: `"horizontal-tb"`, `"vertical-rl"`, `"vertical-lr"`).
 * @param properties.textCombineUpright - オプション 縦書きにおける横書き文字の結合 (`string`型, 例: `"none"`, `"all"`).
 * @param properties.textOrientation - オプション 縦書きにおける文字の向き (`string`型, 例: `"mixed"`, `"upright"`, `"sideways"`).
 *
 * ## Methods
 * @method applyCSS
 * 指定されたHTML要素に、この`TextCSS`インスタンスで設定されたすべてのテキスト関連のCSSプロパティを適用します。
 * `fontCSS`が設定されている場合は、その`applyCSS`メソッドも呼び出されます。
 * @param element - CSSを適用するHTMLElement
 * @returns {HTMLElement} - スタイルが適用されたHTMLElement
 *
 * ## Getters
 * - `fontCSS`: 設定されたFontCSSインスタンスを取得します。
 * - `letterSpacing`: 設定された文字間隔を取得します。
 * - `textAlign`: 設定されたテキストの水平方向の配置を取得します。
 * - `textAlignLast`: 設定されたテキストの最終行の水平方向の配置を取得します。
 * - `textIndent`: 設定されたテキストの最初の行のインデントを取得します。
 * - `textTransform`: 設定されたテキストの文字変換を取得します。
 * - `lineBreak`: 設定された行の折り返しルールを取得します。
 * - `textOverflow`: 設定されたコンテンツが要素をオーバーフローした場合の表示方法を取得します。
 * - `textWrap`: 設定されたテキストの折り返しを取得します。
 * - `wordBreak`: 設定された単語の改行ルールを取得します。
 * - `textDecoration`: 設定されたテキストの装飾を取得します。
 * - `textEmphasis`: 設定されたテキストの強調マークを取得します。
 * - `textShadow`: 設定されたテキストの影を取得します。
 * - `writingMode`: 設定されたテキストの書字方向を取得します。
 * - `textCombineUpright`: 設定された縦書きにおける横書き文字の結合を取得します。
 * - `textOrientation`: 設定された縦書きにおける文字の向きを取得します。
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * const myParagraph = document.createElement("p");
 * const textCss = new TextCSS({
 *   fontCSS: new FontCSS({
 *     color: "navy",
 *     fontSize: "16px",
 *     fontWeight: "normal"
 *   }),
 *   letterSpacing: "0.5px",
 *   textAlign: "justify",
 *   textTransform: "uppercase",
 *   textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
 * });
 * 
 * myParagraph = textCss.applyCSS(myParagraph);
 * myParagraph.textContent = "This is an example text with various styles applied.";
 * ```
 *
 * `Text`ウィジェットに`TextCSS`を適用する例
 * @example
 * ```typescript
 * new Text({
 *   textCSS: new TextCSS({
 *     fontCSS: new FontCSS({
 *       color: "purple",
 *       fontSize: "20px"
 *     }),
 *     textAlign: "center",
 *     textDecoration: "underline",
 *     wordBreak: "break-word"
 *   }),
 *   text: "Styled Text"
 * });
 * ```
 */
export class TextCSS {
    constructor(private properties: TextCSSProperties = {}){ }

    applyCSS(element: HTMLElement): HTMLElement {
        if (this.properties.letterSpacing) element.style.letterSpacing = this.properties.letterSpacing;
        if (this.properties.textAlign) element.style.textAlign = this.properties.textAlign;
        if (this.properties.textAlignLast) element.style.textAlignLast = this.properties.textAlignLast;
        if (this.properties.textIndent) element.style.textIndent = this.properties.textIndent;
        if (this.properties.textTransform) element.style.textTransform = this.properties.textTransform;
        if (this.properties.lineBreak) element.style.lineBreak = this.properties.lineBreak;
        if (this.properties.textOverflow) element.style.textOverflow = this.properties.textOverflow;
        if (this.properties.textWrap) element.style.textWrap = this.properties.textWrap;
        if (this.properties.wordBreak) element.style.wordBreak = this.properties.wordBreak;
        if (this.properties.textDecoration) element.style.textDecoration = this.properties.textDecoration;
        if (this.properties.textEmphasis) element.style.textEmphasis = this.properties.textEmphasis;
        if (this.properties.textShadow) element.style.textShadow = this.properties.textShadow;
        if (this.properties.writingMode) element.style.writingMode = this.properties.writingMode;
        if (this.properties.textCombineUpright) element.style.textCombineUpright = this.properties.textCombineUpright;
        if (this.properties.textOrientation) element.style.textOrientation = this.properties.textOrientation;

        if (this.properties.fontCSS) this.properties.fontCSS.applyCSS(element);
        //if (this.properties.webkitCSS) this.properties.webkitCSS.applyCSS(element);

        return element;
    }

    get fontCSS(): FontCSS | undefined {
        return this.properties.fontCSS;
    }

    get letterSpacing(): string | undefined {
        return this.properties.letterSpacing;
    }

    get textAlign(): string | undefined {
        return this.properties.textAlign;
    }

    get textAlignLast(): string | undefined {
        return this.properties.textAlignLast;
    }

    get textIndent(): string | undefined {
        return this.properties.textIndent;
    }

    get textTransform(): string | undefined {
        return this.properties.textTransform;
    }

    get lineBreak(): string | undefined {
        return this.properties.lineBreak;
    }

    get textOverflow(): string | undefined {
        return this.properties.textOverflow;
    }

    get textWrap(): string | undefined {
        return this.properties.textWrap;
    }

    get wordBreak(): string | undefined {
        return this.properties.wordBreak;
    }

    get textDecoration(): string | undefined {
        return this.properties.textDecoration;
    }

    get textEmphasis(): string | undefined {
        return this.properties.textEmphasis;
    }

    get textShadow(): string | undefined {
        return this.properties.textShadow;
    }

    get writingMode(): string | undefined {
        return this.properties.writingMode;
    }

    get textCombineUpright(): string | undefined {
        return this.properties.textCombineUpright;
    }

    get textOrientation(): string | undefined {
        return this.properties.textOrientation;
    }

    // get webkitCSS(): WebkitCSS | undefined {
    //     return this.properties.webkitCSS;
    // }
}
