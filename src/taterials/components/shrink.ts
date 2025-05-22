import { View } from "../../core/interface/view";

interface ShrinkProps {
    child: View;
}

/**
 * Shrinkコンポーネント
 * ## OverView
 * 子要素を非表示にするために、その幅と高さを `0` に設定し、内容を `overflow: hidden` でクリップします。
 * 要素を DOM から完全に削除せずに一時的に隠したい場合に利用できます。
 *
 * ## Props
 * @param props - Shrinkの設定オプション
 * @param props.child - 必須 非表示にする子要素
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * new Column({
 *   children: [
 *     new Text({ text: "Visible text" }),
 *     new Shrink({
 *       child: new Text({ text: "This text will be hidden" })
 *     }),
 *     new Text({ text: "Another visible text" })
 *   ]
 * });
 * ```
 * 最小限の設定
 * @example
 * ```typescript
 * new Shrink({
 *   child: new Card({
 *     baseCSS: new BaseCSS({
 *       background: "red",
 *       width: "50px",
 *       height: "50px"
 *     }),
 *     child: new Text({ text: "Hidden" })
 *   })
 * });
 * ```
 */
export class Shrink extends View {
    constructor(protected props: ShrinkProps) {
        super();
    }

    createWrapView(): HTMLElement {
        return document.createElement("div");
    }

    styledView(element: HTMLElement): HTMLElement {
        element.style.width = "0px";
        element.style.height = "0px";
        element.style.overflow = "hidden";
        return element;
    }

    build(): View {
        return this.props.child;
    }
}
