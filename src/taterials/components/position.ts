import { View } from "../../core/interface/view";

interface PositionProps {
    child: View;
    top?: number;
    left?: number;
}

interface _PositionChildProps {
    child: View;
    top: number;
    left: number;
}

/**
 * Positionコンポーネント
 * ## OverView
 * 子要素を相対的に配置します。
 * 親要素に対する上端（top）と左端（left）からのオフセットをピクセル単位で指定できます。
 *
 * ## Props
 * @param props - Positionの設定オプション
 * @param props.child - 必須 配置する子要素
 * @param props.top - オプション 親要素の上端からのオフセット（ピクセル単位）。デフォルトは`0`。
 * @param props.left - オプション 親要素の左端からのオフセット（ピクセル単位）。デフォルトは`0`。
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * new Position({
 *   top: 50,
 *   left: 30,
 *   child: new Card({
 *     baseCSS: new BaseCSS({
 *       background: "lightyellow",
 *       width: "100px",
 *       height: "100px",
 *     }),
 *     child: new Text({ text: "Offset Card" })
 *   })
 * });
 * ```
 *
 * 最小限の設定
 * @example
 * ```typescript
 * new Position({
 *   child: new Text({ text: "Default Position" })
 * });
 * ```
 */
export class Position extends View {
    constructor(protected props: PositionProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.className = "pos-wrapper";
        element.style.width = "100%";
        element.style.height = "100%";
        return element;
    }

    override build(): View {
        return new _PositionChild({
            child: this.props.child,
            top: this.props.top ?? 0,
            left: this.props.left ?? 0
        });
    }
}

class _PositionChild extends View {
    constructor(protected props: _PositionChildProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.className = "pos-wrapper";
        element.style.width = "100%";
        element.style.height = "100%";

        element.style.position = "relative";
        element.className = "pos";
        element.style.top = `${this.props.top}px`;
        element.style.left = `${this.props.left}px`;

        return element;
    }

    override build(): View {
        return this.props.child;
    }
}
