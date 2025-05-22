interface BorderCSSProperties {
    borderSize?: string;
    borderProperty?: string;
    color?: string;
    radius?: string;
    isTop?: boolean;
    isLeft?: boolean;
    isRight?: boolean;
    isBottom?: boolean;
}

/**
 * BorderCSSクラス
 * ## OverView
 * HTML要素のボーダー（境界線）スタイルを定義するためのクラスです。
 * ボーダーのサイズ、プロパティ（solid, dashedなど）、色、角の丸み（radius）を設定できます。
 * また、上下左右の個別のボーダーを適用することも可能です。
 *
 * ## Properties
 * @param properties - BorderCSSの設定オプション
 * @param properties.borderSize - オプション ボーダーの太さ (`string`型, 例: `"1px"`, `"medium"`).
 * @param properties.borderProperty - オプション ボーダーのスタイル (`string`型, 例: `"solid"`, `"dashed"`, `"dotted"`).
 * @param properties.color - オプション ボーダーの色 (`string`型, 例: `"red"`, `"#ccc"`, `"rgba(0,0,0,0.5)"`).
 * @param properties.radius - オプション ボーダーの角の丸み (`string`型, CSSの`border-radius`プロパティと同じ, 例: `"5px"`, `"50%"`).
 * @param properties.isTop - オプション 上辺にボーダーを適用するかどうか。`true`の場合、`border-top`が設定されます。
 * @param properties.isLeft - オプション 左辺にボーダーを適用するかどうか。`true`の場合、`border-left`が設定されます。
 * @param properties.isRight - オプション 右辺にボーダーを適用するかどうか。`true`の場合、`border-right`が設定されます。
 * @param properties.isBottom - オプション 下辺にボーダーを適用するかどうか。`true`の場合、`border-bottom`が設定されます。
 *
 * ## Methods
 * @method assembleCSS
 * `borderSize`, `borderProperty`, `color`を結合してCSSの`border`プロパティの文字列を生成します。
 * 例: `"1px solid red"`
 * @returns {string} - 生成されたボーダーCSS文字列
 *
 * @method applyCSS
 * 指定されたHTML要素に、この`BorderCSS`インスタンスで設定されたボーダー関連のCSSプロパティを適用します。
 * 個別の辺にボーダーが設定されている場合はそれらを優先し、`radius`も適用します。
 * @param element - CSSを適用するHTMLElement
 * @returns {HTMLElement} - スタイルが適用されたHTMLElement
 *
 * ## Getters
 * - `borderSize`: 設定されたボーダーの太さを取得します。
 * - `borderProperty`: 設定されたボーダーのスタイルを取得します。
 * - `color`: 設定されたボーダーの色を取得します。
 * - `radius`: 設定されたボーダーの角の丸みを取得します。
 * - `isTop`: 上辺にボーダーが設定されているかを取得します。
 * - `isLeft`: 左辺にボーダーが設定されているかを取得します。
 * - `isRight`: 右辺にボーダーが設定されているかを取得します。
 * - `isBottom`: 下辺にボーダーが設定されているかを取得します。
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * const myDiv = document.createElement("div");
 * const borderCss = new BorderCSS({
 *   borderSize: "2px",
 *   borderProperty: "solid",
 *   color: "green",
 *   radius: "8px"
 * });
 * borderCss.applyCSS(myDiv);
 * // myDiv is drawn with a 2px solid green border and 8px rounded corners
 * ```
 *
 * 個別の辺にボーダーを適用する例
 * @example
 * ```typescript
 * const anotherDiv = document.createElement("div");
 * const borderCssPartial = new BorderCSS({
 *   borderSize: "3px",
 *   borderProperty: "dashed",
 *   color: "purple",
 *   isBottom: true,
 *   isLeft: true
 * });
 * 
 * anotherDiv = borderCssPartial.applyCSS(anotherDiv);
 * // The otherDiv is drawn with a 3px purple dashed border on the bottom and left sides
 * ```
 *
 * `BaseCSS`と組み合わせてウィジェットに適用する例
 * @example
 * ```typescript
 * new Card({
 *   baseCSS: new BaseCSS({
 *     width: "150px",
 *     height: "70px",
 *     backgroundColor: "lightyellow",
 *     borderCSS: new BorderCSS({
 *       borderSize: "1px",
 *       borderProperty: "solid",
 *       color: "#ccc",
 *       radius: "5px"
 *     })
 *   }),
 *   child: new Text({ text: "border card" })
 * });
 * ```
 */
export class BorderCSS {
    constructor(private properties: BorderCSSProperties = {}){ }

    assembleCSS(): string {
        return `${this.properties.borderSize} ${this.properties.borderProperty} ${this.properties.color}`;
    }

    applyCSS(element: HTMLElement): HTMLElement {
        const borderValue = this.assembleCSS();
        
        if (this.properties.isTop) element.style.borderTop = borderValue;
        if (this.properties.isRight) element.style.borderRight = borderValue;
        if (this.properties.isBottom) element.style.borderBottom = borderValue;
        if (this.properties.isLeft) element.style.borderLeft = borderValue;
        
        if (this.properties.radius) element.style.borderRadius = this.properties.radius;
        
        return element;
    }

    get borderSize(): string | undefined {
        return this.properties.borderSize;
    }

    get borderProperty(): string | undefined {
        return this.properties.borderProperty;
    }

    get color(): string | undefined {
        return this.properties.color;
    }

    get radius(): string | undefined {
        return this.properties.radius;
    }

    get isTop(): boolean | undefined {
        return this.properties.isTop;
    }

    get isLeft(): boolean | undefined {
        return this.properties.isLeft;
    }

    get isRight(): boolean | undefined {
        return this.properties.isRight;
    }

    get isBottom(): boolean | undefined {
        return this.properties.isBottom;
    }
}
