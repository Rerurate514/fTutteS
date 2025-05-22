import { View } from "../../core/interface/view";
import { BaseCSS } from "../../cssKit/baseCSS";
import { ShadowLevels } from "../enums/shadowLevels";

interface CardProps {
    child: View;
    radius?: string;
    baseCSS?: BaseCSS;
    background?: string;
    elevation?: ShadowLevels;
    // webkitCSS?: WebkitCSS;
}

/**
 * Cardコンポーネント
 * ## OverView
 * 子要素をカードスタイルでラップして表示します。
 * 角丸、背景色、影などの装飾を適用できます。
 * 
 * ## Props
 * @param props - カードの設定オプション
 * @param props.child - **必須** カードの中身となる子要素
 * @param props.radius - **オプション** カードの角の丸み
 *   - 例: `"8px"`, `"1rem"`, `"50%"`
 *   - CSS `border-radius` プロパティに設定されます
 * @param props.baseCSS - **オプション** 基本的なCSSスタイルを適用するためのクラス
 * @param props.background - **オプション** カードの背景色
 *   - 例: `"#ffffff"`, `"rgb(255, 255, 255)"`, `"linear-gradient(...)"`
 *   - CSS `background` プロパティに設定されます
 * @param props.elevation - **オプション** カードの影の強さレベル
 *   - `ShadowLevels` 列挙型の値を指定
 *   - CSS `box-shadow` プロパティに設定されます
 * 
 * ## Examples
 * @example
 * 基本的な使用例
 * ```typescript
 * const card = new Card({
 *   child: myView,
 *   radius: "8px",
 *   background: "#ffffff",
 *   elevation: ShadowLevels.LVL5
 * });
 * ```
 * 
 * @example
 * 最小限の設定
 * ```typescript
 * const simpleCard = new Card({
 *   child: myView
 * });
 * ```
 */
export class Card extends View {
    constructor(protected props: CardProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        if (this.props.radius) element.style.borderRadius = this.props.radius;
        if (this.props.background) element.style.background = this.props.background;
        if (this.props.elevation) element.style.boxShadow = this.props.elevation;

        if (this.props.baseCSS) element = this.props.baseCSS.applyCSS(element);
        // if(this.props.webkitCSS) element = this.props.webkitCSS.applyCSS(element);

        return element;
    }

    override build(): View {
        return this.props.child;
    }
}
