import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";

interface RowProps {
    children: View | Array<View> | undefined;
    baseCSS?: BaseCSS;
    isAlignCenter?: boolean;
    isJustifySpaceAround?: boolean;
    isJustifySpaceBetween?: boolean;
    isVerticalCenter?: boolean;
}

/**
 * Rowコンポーネント
 * ## OverView
 * 子要素を横方向（行）に並べて表示します。
 * Flexboxを使用して要素を配置し、水平方向および垂直方向の整列オプションを提供します。
 *
 * ## Props
 * @param props - Rowの設定オプション
 * @param props.children - 必須 横方向に並べる子要素（単一または配列）
 * @param props.baseCSS - オプション 基本的なCSSスタイルを適用するためのクラス
 * @param props.isAlignCenter - オプション 子要素を主軸（横方向）の中央に配置するかどうか
 * - `justify-content: center`が適用されます。`isJustifySpaceAround`や`isJustifySpaceBetween`と同時に設定しないでください。
 * @param props.isJustifySpaceAround - オプション 子要素を主軸（横方向）に均等に配置し、両端にスペースを作成するかどうか
 * - `justify-content: space-around`が適用されます。他の`isJustify`系のプロパティと同時に設定しないでください。
 * @param props.isJustifySpaceBetween - オプション 子要素を主軸（横方向）に均等に配置し、両端にはスペースを作成しないかどうか
 * - `justify-content: space-between`が適用されます。他の`isJustify`系のプロパティと同時に設定しないでください。
 * @param props.isVerticalCenter - オプション 子要素を交差軸（縦方向）の中央に配置するかどうか
 * - `align-items: center`が適用されます。
 * 
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * new Row({
 *   isAlignCenter: true,
 *   isVerticalCenter: true,
 *   baseCSS: new BaseCSS({
 *     background: "lightyellow",
 *     height: "100px",
 *     padding: "10px",
 *     borderCSS: new BorderCSS({ borderSize: "1px", borderProperty: "solid", color: "orange" })
 *   }),
 *   children: [
 *     new Text({ text: "Item 1" }),
 *     new Text({ text: "Item 2" }),
 *     new Text({ text: "Item 3" })
 *   ]
 * });
 * ```
 * 要素間にスペースを配置する例
 * @example
 * ```typescript
 * new Row({
 *   isJustifySpaceBetween: true,
 *   baseCSS: new BaseCSS({
 *     width: "100%",
 *     padding: "10px",
 *     borderCSS: new BorderCSS({ 
 *       borderSize: "1px", 
 *       borderProperty: "solid", 
 *       color: "blue" 
 *     })
 *   }),
 *   children: [
 *     new Text({ text: "Left" }),
 *     new Text({ text: "Right" })
 *   ]
 * });
 * ```
 * 最小限の設定
 * @example
 * ```typescript
 * new Row({
 *   children: [
 *     new Text({ text: "Row Item A" }),
 *     new Text({ text: "Row Item B" })
 *   ]
 * });
 * ```
 */
export class Row extends View {
    constructor(protected props: RowProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.className = "row-container";
        element.style.display = "flex";

        if (this.props.isAlignCenter) element.style.justifyContent = "center";
        if (this.props.isJustifySpaceAround) element.style.justifyContent = "space-around";
        if (this.props.isJustifySpaceBetween) element.style.justifyContent = "space-between";
        if (this.props.isVerticalCenter) element.style.alignItems = "center";

        if (this.props.baseCSS) element = this.props.baseCSS.applyCSS(element);

        return element;
    }

    override build(): View | Array<View> | undefined {
        return this.props.children;
    }
}
