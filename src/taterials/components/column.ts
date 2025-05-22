import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";

interface ColumnProps {
    children: Array<View>;
    baseCSS?: BaseCSS;
    isHorizontalCenter?: boolean
}

/**
 * Columnコンポーネント
 * ## OverView
 * 子要素を縦方向に並べて表示します。
 * Flexboxを使用して要素をカラム形式で配置し、必要に応じて水平方向の中央揃えを適用できます。
 * 
 * ## Props
 * @param props - Columnの設定オプション
 * @param props.children - 必須 縦方向に並べる子要素の配列
 * @param props.baseCSS - オプション 基本的なCSSスタイルを適用するためのクラス
 * @param props.isHorizontalCenter - オプション 子要素を水平方向の中央に配置するかどうか
 * - `true`の場合、`align-items: center`が適用されます。
 * 
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * const myColumn = new Column({
 *     baseCSS: new BaseCSS({
 *       width: "200px",
 *       padding: "10px"
 *     }),
 *     isHorizontalCenter: true
 *   children: [
 *     new Text({
 *       text: "アイテム1",
 *       textCSS: new TextCSS({ fontCSS: new FontCSS({ color: "navy" }) })
 *     }),
 *     new Text({
 *       text: "アイテム2",
 *       textCSS: new TextCSS({ fontCSS: new FontCSS({ color: "green" }) })
 *     }),
 *     new Text({
 *       text: "アイテム3",
 *       textCSS: new TextCSS({ fontCSS: new FontCSS({ color: "purple" }) })
 *     })
 *   ],
 * });
 * ```
 *
 * 最小限の設定
 * @example
 * ```typescript
 * const simpleColumn = new Column({
 *   children: [
 *     new Text({ text: "最初のアイテム" }),
 *     new Text({ text: "次のアイテム" })
 *   ]
 * });
 * ```
 */
export class Column extends View {
    constructor(protected props: ColumnProps){
        super();
    }

    styledView(element: HTMLElement): HTMLElement{
        element.style.display = "flex";
        element.style.flexDirection = "column";

        if(this.props.isHorizontalCenter) element.style.alignItems = "center";

        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element);

        return element; 
    }

    build(): View | Array<View>{
        return this.props.children;
    }
}
