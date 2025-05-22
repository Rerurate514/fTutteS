import { View } from "../../core/interface/view";

interface RelativePositionProps {
    child: View;
    relativePositions: {
        applyCSS: (element: HTMLElement) => HTMLElement;
    };
}

/**
 * RelativePositionコンポーネント
 * ## OverView
 * 子要素を親要素に対して相対的に配置します。
 * `relativePositions`プロパティを通じて、具体的な相対位置のスタイルを適用します。
 *
 * ## Props
 * @param props - RelativePositionの設定オプション
 * @param props.child - 必須 相対的に配置する子要素
 * @param props.relativePositions - 必須 位置に関するCSSスタイルを適用するオブジェクト
 * - このオブジェクトは`RelativePositions`を渡す必要があります。
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * new RelativePosition({
 *   relativePositions: RelativePositions.BOTTOM_LEFT,
 *   child: new Card({
 *     baseCSS: new BaseCSS({
 *       background: "lightgray",
 *       width: "100px",
 *       height: "50px"
 *     }),
 *     child: new Text({ text: "lower left" })
 *   })
 * });
 * ```
 *
 * 他のRelativePositionsの例
 * @example
 * ```typescript
 * new RelativePosition({
 *   relativePositions: RelativePositions.CENTER,
 *   child: new Card({
 *     baseCSS: new BaseCSS({
 *       background: "lightgray",
 *       width: "100px",
 *       height: "50px"
 *     }),
 *     child: new Text({ text: "center" })
 *   })
 * });
 * ```
 *
 * 最小限の設定 (注: `relativePositions`は必須です)
 * @example
 * ```typescript
 * new RelativePosition({
 *   relativePositions: RelativePositions.TOP_LEFT, // デフォルトのRelativePositionsを使用
 *   child: new Text({ text: "upper left" })
 * });
 * ```
 */
export class RelativePosition extends View {
    constructor(protected props: RelativePositionProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.width = "100%";
        element.style.height = "100%";

        element.style.textAlign = "center";
        element.style.justifyContent = "center";

        element.style.display = "flex";
        element.style.alignItems = "center";

        element.style.borderRadius = "inherit";

        return element;
    }

    override build(): View {
        return new _RelativePosition(this.props);
    }
}

interface _RelativePositionProps {
    child: View;
    relativePositions: {
        applyCSS: (element: HTMLElement) => HTMLElement;
    };
}

export class _RelativePosition extends View {
    constructor(protected props: _RelativePositionProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.width = "fit-content";
        element.style.height = "fit-content";

        element = this.props.relativePositions.applyCSS(element);

        element.style.borderRadius = "inherit";

        return element;
    }

    override  build(): View {
        return this.props.child;
    }
}
