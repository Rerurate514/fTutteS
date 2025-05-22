import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";

interface StackProps {
    children: Array<View>;
    baseCSS?: BaseCSS;
}

/**
 * Stackコンポーネント
 * ## OverView
 * 子要素を重ねて（スタックして）表示します。
 * 各子要素は絶対位置指定（`position: absolute`）が適用され、親要素に対して重ねて配置されます。
 * これにより、要素をZ軸方向に重ねたり、特定の場所に配置したりするのに役立ちます。
 *
 * ## Props
 * @param props - Stackの設定オプション
 * @param props.children - 必須 重ねて表示する子要素の配列
 * @param props.baseCSS - オプション Stack全体の基本的なCSSスタイルを適用するためのクラス
 * - Stackの `position` は `relative` に固定されます。
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * new Stack({
 *   baseCSS: new BaseCSS({
 *     width: "300px",
 *     height: "200px",
 *     borderCSS: new BorderCSS({
 *       borderSize: "2px",
 *       borderProperty: "dashed",
 *       color: "blue"
 *     })
 *   }),
 *   children: [
 *     new Card({
 *       baseCSS: new BaseCSS({
 *         background: "red",
 *         width: "100px",
 *         height: "100px",
 *         top: "10px", // Stack's child elements are absolute, so they can be positioned directly
 *         left: "10px"
 *       }),
 *       child: new Text({ text: "Bottom" })
 *     }),
 *     new Card({
 *       baseCSS: new BaseCSS({
 *         background: "green",
 *         width: "80px",
 *         height: "80px",
 *       }),
 *       child: new Text({ text: "Middle" })
 *     }),
 *     new Card({
 *       baseCSS: new BaseCSS({
 *         background "blue",
 *         width: "60px",
 *         height: "60px",
 *       }),
 *       child: new Text({ text: "Top" })
 *     })
 *   ]
 * });
 * ```
 * 最小限の設定
 * @example
 * ```typescript
 * new Stack({
 *   children: [
 *     new Text({ text: "Text A" }),
 *     new Text({ text: "Text B" })
 *   ]
 * });
 * ```
 */
export class Stack extends View {
    constructor(protected props: StackProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.position = "relative";

        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element);

        return element;
    }

    override preBuild(): void {
        this.props.children.forEach((com: View) => {
            com.view.style.position = "absolute";
        });
    }

    override build(): View[] {
        return this.props.children;
    }
}
