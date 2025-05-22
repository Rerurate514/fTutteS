import { View } from "../../core/interface/view";

interface PaddingProps {
    child: View;
    all?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

/**
 * Paddingコンポーネント
 * ## OverView
 * 子要素の内側に余白（パディング）を追加します。
 * 上下左右の個別のパディング、または一括で全てのパディングを設定できます。
 *
 * ## Props
 * @param props - Paddingの設定オプション
 * @param props.child - 必須 パディングを適用する子要素
 * @param props.all - オプション 全ての辺に適用するパディング
 * - 例: `"10px"`, `"1rem"`
 * - `top`, `right`, `bottom`, `left`が個別に指定されている場合、それらが優先されます。
 * @param props.top - オプション 上辺に適用するパディング
 * @param props.right - オプション 右辺に適用するパディング
 * @param props.bottom - オプション 下辺に適用するパディング
 * @param props.left - オプション 左辺に適用するパディング
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * new Padding({
 *   all: "20px",
 *   child: new Card({
 *     baseCSS: new BaseCSS({
 *       backgroundColor: "lightgreen",
 *       width: "100px",
 *       height: "100px",
 *       display: "flex",
 *       justifyContent: "center",
 *       alignItems: "center"
 *     }),
 *     child: new Text({ text: "All 20px" })
 *   })
 * });
 * ```
 *
 * 個別のパディング設定の例
 * @example
 * ```typescript
 * new Padding({
 *   top: "10px",
 *   right: "30px",
 *   bottom: "5px",
 *   left: "20px",
 *   child: new Card({
 *     baseCSS: new BaseCSS({
 *       backgroundColor: "lightcoral",
 *       width: "100px",
 *       height: "100px",
 *       display: "flex",
 *       justifyContent: "center",
 *       alignItems: "center"
 *     }),
 *     child: new Text({ text: "Custom Paddings" })
 *   })
 * });
 * ```
 *
 * 最小限の設定
 * @example
 * ```typescript
 * new Padding({
 *   child: new Text({ text: "No explicit padding" })
 * });
 * ```
 */
export class Padding extends View {
    private paddings;

    constructor(protected props: PaddingProps) {
        const paddings = {
            top: props.top ?? "0px",
            right: props.right ?? "0px",
            bottom: props.bottom ?? "0px",
            left: props.left ?? "0px"
        };

        if (props.all !== undefined) {
            Object.assign(paddings, {
                top: props.all,
                right: props.all,
                bottom: props.all,
                left: props.all
            });
        }

        super();
        this.paddings = paddings;
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.paddingTop = this.paddings.top;
        element.style.paddingRight = this.paddings.right;
        element.style.paddingBottom = this.paddings.bottom;
        element.style.paddingLeft = this.paddings.left;

        return element;
    }

    override build(): View {
        return this.props.child;
    }
}
