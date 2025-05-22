import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";

interface TransformProps {
    child: View;
    baseCSS?: BaseCSS;
    translateX?: number;
    translateY?: number;
    translateZ?: number;
    rotateX?: number;
    rotateY?: number;
    rotateZ?: number;
    scaleX?: number;
    scaleY?: number;
    scaleZ?: number;
    skewX?: number;
    skewY?: number;
}

/**
 * Transformコンポーネント
 * ## OverView
 * 子要素に2Dまたは3DのCSS変換（移動、回転、拡大縮小、傾斜）を適用します。
 * `translateX`, `translateY`, `translateZ`で要素を移動させ、
 * `rotateX`, `rotateY`, `rotateZ`で回転させ、
 * `scaleX`, `scaleY`, `scaleZ`で拡大縮小し、
 * `skewX`, `skewY`で傾斜させることができます。
 * アニメーションメソッドも提供しており、プロパティの変化を滑らかに表現できます。
 *
 * ## Props
 * @param props - Transformの設定オプション
 * @param props.child - 必須 変換を適用する子要素
 * @param props.baseCSS - オプション Transformコンテナ全体の基本的なCSSスタイルを適用するためのクラス
 * @param props.translateX - オプション X軸方向の移動量（ピクセル単位）。デフォルトは`0`。
 * @param props.translateY - オプション Y軸方向の移動量（ピクセル単位）。デフォルトは`0`。
 * @param props.translateZ - オプション Z軸方向の移動量（ピクセル単位）。デフォルトは`0`。
 * @param props.rotateX - オプション X軸中心の回転角度（度数）。デフォルトは`0`。
 * @param props.rotateY - オプション Y軸中心の回転角度（度数）。デフォルトは`0`。
 * @param props.rotateZ - オプション Z軸中心の回転角度（度数）。デフォルトは`0`。
 * @param props.scaleX - オプション X軸方向の拡大縮小率。デフォルトは`1`。
 * @param props.scaleY - オプション Y軸方向の拡大縮小率。デフォルトは`1`。
 * @param props.scaleZ - オプション Z軸方向の拡大縮小率。デフォルトは`1`。
 * @param props.skewX - オプション X軸方向の傾斜角度（度数）。デフォルトは`0`。
 * @param props.skewY - オプション Y軸方向の傾斜角度（度数）。デフォルトは`0`。
 *
 * ## Methods
 * @method animate
 * @param properties - アニメーションさせるTransformプロパティの部分的なオブジェクト
 * @param duration - アニメーションの期間（ミリ秒）。デフォルトは`500`。
 * @param easing - アニメーションのイージング関数（CSSの`transition-timing-function`と同じ）。デフォルトは`'ease'`。
 * @returns {this} - メソッドチェーンのために自身のインスタンスを返します。
 *
 * ## Examples
 * 基本的な使用例 (移動と回転)
 * @example
 * ```typescript
 * const myTransformableCard = new Transform({
 *   translateX: 50,
 *   rotateZ: 45,
 *   baseCSS: new BaseCSS({
 *     width: "100px",
 *     height: "100px",
 *     backgroundColor: "lightpink",
 *     display: "flex",
 *     justifyContent: "center",
 *     alignItems: "center",
 *     borderCSS: new BorderCSS({
 *       borderSize: "2px",
 *       borderProperty: "solid",
 *       color: "purple"
 *     })
 *   }),
 *   child: new Text({ text: "Transformed" })
 * });
 * 
 * myTransformableCard.animate({ scaleX: 1, scaleY: 1 }, 300);
 * ```
 */
export class Transform extends View {
    constructor(protected props: TransformProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element);
        element = this._applyTransformCSS(element);
        return element;
    }

    private _applyTransformCSS(element: HTMLElement): HTMLElement {
        const transforms: string[] = [];

        if (this.props.translateX !== 0 || this.props.translateY !== 0 || this.props.translateZ !== 0) {
            transforms.push(`translate3d(${this.props.translateX}px, ${this.props.translateY}px, ${this.props.translateZ}px)`);
        }

        if (this.props.rotateX !== 0) transforms.push(`rotateX(${this.props.rotateX}deg)`);
        if (this.props.rotateY !== 0) transforms.push(`rotateY(${this.props.rotateY}deg)`);
        if (this.props.rotateZ !== 0) transforms.push(`rotateZ(${this.props.rotateZ}deg)`);

        if (this.props.scaleX !== 1 || this.props.scaleY !== 1 || this.props.scaleZ !== 1) {
            transforms.push(`scale3d(${this.props.scaleX}, ${this.props.scaleY}, ${this.props.scaleZ})`);
        }

        if (this.props.skewX !== 0 || this.props.skewY !== 0) {
            transforms.push(`skew(${this.props.skewX}deg, ${this.props.skewY}deg)`);
        }

        if (transforms.length > 0) {
            element.style.transform = transforms.join(' ');
        }

        element.style.transformOrigin = 'center center';
        return element;
    }

    animate(properties: Partial<TransformProps>, duration: number = 500, easing: string = 'ease'): this {
        if (!this.view) return this;

        Object.assign(this.props, properties);
        this.view.style.transition = `transform ${duration}ms ${easing}`;

        this.view.addEventListener('transitionend', () => {
            this.view.style.transition = '';
            this._applyTransformCSS(this.view);
        }, { once: true });

        requestAnimationFrame(() => {
            this._applyTransformCSS(this.view);
        });

        return this;
    }

    override build(): View {
        return this.props.child;
    }
}
