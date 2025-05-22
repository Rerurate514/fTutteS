import { View } from "../../core/interface/view";

interface SpaceBoxProps {
    width?: string;
    height?: string;
}

/**
 * SpaceBoxコンポーネント
 * ## OverView
 * 透明なスペースを作成するためのウィジェットです。
 * 指定した幅と高さの空白領域を確保し、レイアウトの調整に使用できます。
 *
 * ## Props
 * @param props - SpaceBoxの設定オプション
 * @param props.width - オプション スペースの幅
 * - 例: `"10px"`, `"1rem"`, `"50%"`
 * @param props.height - オプション スペースの高さ
 * - 例: `"10px"`, `"1rem"`, `"50%"`
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * new Column({
 *   children: [
 *     new Text({ text: "upper text" }),
 *     new SpaceBox({ height: "20px" }), // 20px vertical space
 *     new Text({ text: "lower text" })
 *   ]
 * });
 * ```
 * 幅と高さの両方を指定する例
 * @example
 * ```typescript
 * new Row({
 *   isVerticalCenter: true,
 *   children: [
 *     new Text({ text: "left text" }),
 *     new SpaceBox({ width: "30px", height: "10px" }), // 30px horizontal space
 *     new Text({ text: "right text" })
 *   ]
 * });
 * ```
 */
export class SpaceBox extends View {
    constructor(protected props: SpaceBoxProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        if(this.props.width) element.style.width = this.props.width;
        if(this.props.height) element.style.height = this.props.height;

        return element;
    }
}
