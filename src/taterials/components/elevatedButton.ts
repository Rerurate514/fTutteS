import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";
import { Center } from "./center";
import { Hover } from "./hover";
import { Padding } from "./padding";

interface ElevatedButtonProps {
    child: View;
    radius?: string;
    baseCSS?: BaseCSS;
    onClick?: () => void;
}

/**
 * ElevatedButtonコンポーネント
 * ## OverView
 * クリック可能なボタンを生成します。
 * 丸みのある角、ホバーエフェクト、クリック時の視覚的フィードバックを備えています。
 * 
 * ## Props
 * @param props - ElevatedButtonの設定オプション
 * @param props.child - 必須 ボタンの表示内容となる子要素
 * @param props.radius - オプション ボタンの角の丸み
 * - 例: `"8px"`, `"1rem"`, `"50%"`
 * - CSS `border-radius` プロパティに設定されます
 * @param props.baseCSS - オプション 基本的なCSSスタイルを適用するためのクラス
 * - `padding`プロパティが内部のPaddingウィジェットに渡されます。
 * @param props.onClick - オプション ボタンがクリックされたときに実行されるコールバック関数
 * 
 * ## examples
 * 基本的な使用例
 * @example
 * ```typescript
 * const myButton = new ElevatedButton({
 *   child: new Text({
 *   text: "クリック",
 *   textCSS: new TextCSS({
 *       fontCSS: new FontCSS({
 *         color: "white",
 *         fontWeight: "bold"
 *       })
 *     })
 *   }),
 *   radius: "12px",
 *   baseCSS: new BaseCSS({
 *     backgroundColor: "#4CAF50",
 *     padding: "12px 24px"
 *   }),
 *   onClick: () => {
 *     alert("ボタンがクリックされました！");
 *   }
 * });
 * ```
 *
 * 最小限の設定
 * @example
 * ```typescript
 * const simpleButton = new ElevatedButton({
 *   child: new Text({
 *     text: "シンプルボタン"
 *   })
 * });
 * ```
 */
export class ElevatedButton extends View {
    constructor(protected props: ElevatedButtonProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        if(this.props.radius) element.style.borderRadius = this.props.radius;
        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element);
        
        element.style.padding = "0px";

        return element;
    }

    override embedScriptToView(element: HTMLElement): HTMLElement {
        if(this.props.onClick) element.addEventListener("click", this.props.onClick);
        
        return element;
    }

    override build(): View {
        return new Center({
            child: new Hover({
                radius: this.props.radius,
                onClickEffect: true,
                child: new Padding({
                    all: this.props.baseCSS?.padding ?? "initial",
                    child: new _ElevatedButton({
                        child: this.props.child,
                        baseCSS: this.props.baseCSS
                    })
                })
            })
        });
    }
}

interface _ElevatedButtonProps {
    child: View;
    baseCSS?: BaseCSS
}

export class _ElevatedButton extends View {
    constructor(protected props: _ElevatedButtonProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.borderRadius = "inherit";
        if(this.props.baseCSS?.width) element.style.width = this.props.baseCSS.width;
        if(this.props.baseCSS?.height) element.style.height = this.props.baseCSS.height;

        return element;
    }

    override build(): View {
        return this.props.child;
    }
}
