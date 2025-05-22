import { View } from "../../core/interface/view";

interface MarginProps {
    child: View;
    all?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

/**
 * Marginコンポーネント
 * ## OverView
 * 子要素の周囲に余白（マージン）を追加します。
 * 上下左右の個別のマージン、または一括で全てのマージンを設定できます。
 *
 * ## Props
 * @param props - Marginの設定オプション
 * @param props.child - 必須 余白を適用する子要素
 * @param props.all - オプション 全ての辺に適用するマージン
 * - 例: `"10px"`, `"1rem"`, `"auto"`
 * - `top`, `right`, `bottom`, `left`が個別に指定されている場合、それらが優先されます。
 * @param props.top - オプション 上辺に適用するマージン
 * @param props.right - オプション 右辺に適用するマージン
 * @param props.bottom - オプション 下辺に適用するマージン
 * @param props.left - オプション 左辺に適用するマージン
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * new Margin({
 *   all: "20px",
 *   child: new Card({
 *     baseCSS: new BaseCSS({
 *       background: "lightgreen",
 *       width: "100px",
 *       height: "100px",
 *     }),
 *     child: new Text({ text: "All 20px" })
 *   })
 * });
 * ```
 *
 * 個別のマージン設定の例
 * @example
 * ```typescript
 * new Margin({
 *   top: "10px",
 *   right: "30px",
 *   bottom: "5px",
 *   left: "20px",
 *   child: new Card({
 *     baseCSS: new BaseCSS({
 *       background: "lightcoral",
 *       width: "100px",
 *       height: "100px",
 *     }),
 *     child: new Text({ text: "Custom Margins" })
 *   })
 * });
 * ```
 *
 * 最小限の設定
 * @example
 * ```typescript
 * new Margin({
 *   child: new Text({ text: "No explicit margin" })
 * });
 * ```
 */
export class Margin extends View {
    private margins;

    constructor(protected props: MarginProps) {
        const margins = {
            top: props.top ?? "0px",
            right: props.right ?? "0px",
            bottom: props.bottom ?? "0px",
            left: props.left ?? "0px"
        };

        if (props.all !== undefined) {
            Object.assign(margins, {
                top: props.all,
                right: props.all,
                bottom: props.all,
                left: props.all
            });
        }

        super();

        this.margins = margins;
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.marginTop = this.margins.top;
        element.style.marginRight = this.margins.right;
        element.style.marginBottom = this.margins.bottom;
        element.style.marginLeft = this.margins.left;

        return element;
    }

    override build(): View {
        return this.props.child;
    }
}
