import { View } from "../../core/index";
import { BaseCSS } from "../../cssKit/baseCSS";

interface CanvasProps {
    baseCSS?: BaseCSS;
    onReady?: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void;
}

/**
 * Canvasコンポーネント
 * ## OverView
 * HTMLの`<canvas>`要素をラップし、描画機能を提供します。
 * `onReady`コールバックを通じて、Canvas要素と2Dレンダリングコンテキストにアクセスできます。
 * ## Props
 * @param props - Canvasの設定オプション
 * @param props.baseCSS - オプション 基本的なCSSスタイルを適用するためのクラス
 * @param props.onReady - オプション Canvas要素と2Dレンダリングコンテキストが準備できたときに呼び出されるコールバック関数
 * - コールバックの引数: `(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void`
 * 
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * const myCanvas = new Canvas({
 *   baseCSS: new BaseCSS({
 *     width: "300px",
 *     height: "200px",
 *     border: "1px solid black"
 *   }),
 *   onReady: (canvas, context) => {
 *     context.fillStyle = "blue";
 *     context.fillRect(10, 10, 150, 100);
 *   }
 * });
 * ```
 * 最小限の設定
 * @example
 * ```typescript
 * import { Canvas } from "ftuttes";
 *
 * const simpleCanvas = new Canvas();
 * ```
 */
export class Canvas extends View {
    private canvasElement: HTMLCanvasElement | null = null;
    private context: CanvasRenderingContext2D | null = null;

    constructor(protected props: CanvasProps) {
        super();
    }

    override createWrapView(): HTMLElement {
        this.canvasElement = document.createElement("canvas");
        return this.canvasElement;
    }

    override styledView(element: HTMLElement): HTMLElement {
        if (this.canvasElement) if (this.props.baseCSS) this.canvasElement = this.props.baseCSS.applyCSS(element) as HTMLCanvasElement;
        return element;
    }

    override onAssembleComplete(): void {
        this.draw();
    }

    private draw(): void {
        if (this.canvasElement) {
            this.context = this.canvasElement.getContext("2d");
            if (this.context && this.props.onReady) {
                this.props.onReady(this.canvasElement, this.context);
            }
        }
    }

    getContext(): CanvasRenderingContext2D | null {
        return this.context;
    }

    getCanvasElement(): HTMLCanvasElement | null {
        return this.canvasElement;
    }
}
