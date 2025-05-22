import { View } from "../../core/interface/view";
import { BaseCSS } from "../../cssKit/baseCSS";

interface ImageProps {
    src: string;
    alt: string;
    title?: string;
    baseCSS?: BaseCSS;
    //webkitCSS: WebkitCSS;
}

/**
 * Imageコンポーネント
 * ## OverView
 * HTMLの`<img>`要素をラップし、画像を表示します。
 * 画像のソース、代替テキスト、タイトルを設定でき、基本的なCSSスタイルも適用可能です。
 *
 * ## Props
 * @param props - Imageの設定オプション
 * @param props.src - 必須 画像ファイルのURL
 * @param props.alt - 必須 画像が表示されない場合の代替テキスト
 * @param props.title - オプション 画像のタイトル（ツールチップとして表示される）
 * @param props.baseCSS - オプション 基本的なCSSスタイルを適用するためのクラス
 *
 * ## Examples
 *
 * 基本的な使用例
 * @example
 * ```typescript
 * new Image({
 *   src: "path/to/your/image.png",
 *   alt: "A descriptive alt text for the image",
 *   title: "This is Image.",
 *   baseCSS: new BaseCSS({
 *     width: "200px",
 *     height: "auto",
 *   })
 * });
 * ```
 *
 * 最小限の設定
 * @example
 * ```typescript
 * new Image({
 *   src: "path/to/another/image.jpg",
 *   alt: "Another image"
 * });
 * ```
 */
export class Image extends View {
    constructor(protected props: ImageProps) {
        super();
    }

    override createWrapView(): HTMLImageElement {
        return document.createElement("img");
    }

    override styledView(element: HTMLImageElement): HTMLImageElement {
        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element) as HTMLImageElement;
        //if(this.props.webkitCSS) element = this.props.webkitCSS.applyCSS(element);

        element.src = this.props.src;
        element.alt = this.props.alt;
        if(this.props.title) element.title = this.props.title;

        return element;
    }
}
