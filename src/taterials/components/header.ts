import { View } from "../../core/interface/view";

interface HeaderProps {
    child: View;
    isStickyHeader?: boolean;
}

/**
 * Headerコンポーネント
 * ## OverView
 * ページの上部に表示されるヘッダー領域を定義します。
 * スクロールしても常に上部に固定されるスティッキーヘッダーとして設定することも可能です。
 * ## Props
 * @param props - Headerの設定オプション
 * @param props.child - 必須 ヘッダーの内容となる子要素
 * @param props.isStickyHeader - オプション ヘッダーをスティッキー（固定）にするかどうか
 * - `true`の場合、`position: sticky`と`top: 0`が適用され、常に上部に固定されます。
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * new Header({
 *   isStickyHeader: true,
 *   child: new Text({
 *     text: "Site Title",
 *     textCSS: new TextCSS({
 *       fontCSS: new FontCSS({
 *         fontSize: "24px",
 *         fontWeight: "bold",
 *         color: "white"
 *       })
 *     })
 *   }),
 * });
 * ```
 *
 * 最小限の設定
 * @example
 * ```typescript
 * new Header({
 *   child: new Text({
 *     text: "Simple Header"
 *   })
 * });
 * ```
 */
export class Header extends View {
    constructor(protected props: HeaderProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        if (this.props.isStickyHeader) {
            element.style.position = "sticky";
            element.style.top = "0";
        }
        
        element.style.zIndex = "999";
        
        return element;
    }

    override build(): View {
        return this.props.child;
    }
}
