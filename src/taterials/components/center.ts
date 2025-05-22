import { View } from "../../core/interface/view";

interface CenterProps {
    child: View;
}

/**
 * Centerコンポーネント
 * ## OverView
 * 子要素を親要素の中央に配置します。
 * 幅と高さが`100%`に設定され、flexboxプロパティが適用され、内容が中央揃えになります。
 * ## Props
 * @param props - Centerの設定オプション
 * @param props.child - 必須 中央に配置する子要素
 * 
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * const centeredText = new Center({
 *   child: new Text({
 *     text: "このテキストは中央に表示されます",
 *     textCSS: new TextCSS({
 *       fontCSS: new FontCSS({
 *         color: "black",
 *         fontSize: "20px"
 *       })
 *     })
 *   })
 * });
 * ```
 * 
 * 最小限の設定
 * @example
 * ```typescript
 * const simpleCenteredText = new Center({
 *   child: new Text({
 *     text: "中央のテキスト"
 *   })
 * });
 * ```
 */
export class Center extends View {
    constructor(protected props: CenterProps) {
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
        return new _Center({
            child: this.props.child
        });
    }
}

interface _CenterProps {
    child: View;
}

export class _Center extends View {
    constructor(protected props: _CenterProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.width = "fit-content";
        element.style.height = "fit-content";
        element.style.margin = "auto";
        element.style.borderRadius = "inherit";
        return element;
    }

    override build(): View {
        return this.props.child;
    }
}
