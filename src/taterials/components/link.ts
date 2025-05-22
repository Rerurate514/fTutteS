import { View } from "../../core/interface/view";

interface LinkProps {
    child: View;
    href: string;
    rel?: string;
    target?: string;
    isDownload?: boolean;
    isShownUnderline?: boolean;
}

/**
 * Linkコンポーネント
 * ## OverView
 * HTMLの`<a>`要素をラップし、ハイパーリンクを作成します。
 * リンク先、ダウンロード属性、`rel`属性、`target`属性を設定でき、下線の表示/非表示も制御可能です。
 *
 * ## Props
 * @param props - Linkの設定オプション
 * @param props.child - 必須 リンクとして機能する子要素
 * @param props.href - 必須 リンクのURL
 * @param props.rel - オプション リンク先の文書との関係を指定する`rel`属性
 * @param props.target - オプション リンク先を開く場所を指定する`target`属性
 * - 例: `"_blank"` (新しいタブ/ウィンドウで開く), `"_self"` (現在のタブ/ウィンドウで開く)
 * @param props.isDownload - オプション リンクをクリックしたときにファイルをダウンロードするかどうか
 * - `true`に設定すると、`download`属性が追加されます。
 * @param props.isShownUnderline - オプション リンクの下線を表示するかどうか
 * - `false`の場合、下線が非表示になります。
 *
 * ## Examples
 *
 * 基本的な使用例
 * @example
 * ```typescript
 * new Link({
 *   href: "https://www.google.com",
 *   target: "_blank",
 *   isShownUnderline: false,
 *   child: new Text({
 *     text: "Googleを開く",
 *     textCSS: new TextCSS({
 *       fontCSS: new FontCSS({
 *         color: "blue",
 *         fontWeight: "bold"
 *       })
 *     })
 *   })
 * });
 * ```
 *
 * ダウンロードリンクの例
 * @example
 * ```typescript
 * new Link({
 *   href: "path/to/document.pdf",
 *   isDownload: true,
 *   child: new Text({
 *     text: "download PDF",
 *     textCSS: new TextCSS({
 *       fontCSS: new FontCSS({
 *         color: "green"
 *       })
 *     })
 *   })
 * });
 * ```
 *
 * 最小限の設定
 * @example
 * ```typescript
 * new Link({
 *   href: "/about",
 *   child: new Text({
 *     text: "About Us"
 *   })
 * });
 * ```
 */
export class Link extends View {
    constructor(protected props: LinkProps) {
        super();
    }

    override createWrapView(): HTMLAnchorElement {
        return document.createElement("a");
    }

    override styledView(element: HTMLAnchorElement): HTMLAnchorElement {
        element.href = this.props.href;
        if (this.props.isDownload) element.download = "download";

        if (this.props.rel) element.rel = this.props.rel;
        if (this.props.target) element.target = this.props.target;

        if (!this.props.isShownUnderline) {
            element.style.textDecoration = "none";
        }

        return element;
    }

    override build(): View {
        return this.props.child;
    }
}
