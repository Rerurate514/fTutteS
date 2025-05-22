import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";

interface SliderProps {
    provider?: any;
    min?: number;
    max?: number;
    value?: number;
    step?: number;
    name?: string;
    onChange?: (value: string, element: HTMLInputElement, event: Event) => void;
    isDisplay?: boolean;
    baseCSS?: BaseCSS;
}

/**
 * Sliderコンポーネント
 * ## OverView
 * HTMLの`<input type="range">`要素をラップし、スライダー（レンジ入力）を提供します。
 * 最小値、最大値、初期値、ステップ、名前を設定でき、値が変更された際のコールバックを設定できます。
 * オプションでProviderと連携し、スライダーの値をProviderに自動的に反映させることも可能です。
 *
 * ## Props
 * @param props - Sliderの設定オプション
 * @param props.min - オプション スライダーの最小値。デフォルトはブラウザのデフォルト値。
 * @param props.max - オプション スライダーの最大値。デフォルトはブラウザのデフォルト値。
 * @param props.value - オプション スライダーの初期値。デフォルトはブラウザのデフォルト値。
 * @param props.step - オプション スライダーの増減ステップ値。デフォルトはブラウザのデフォルト値。
 * @param props.name - オプション スライダーの`name`属性
 * @param props.onChange - オプション スライダーの値が変更されたときに実行されるコールバック関数
 * - コールバックの引数: `(value: string, element: HTMLInputElement, event: Event) => void`
 * @param props.isDisplay - オプション スライダーの入力要素を表示するかどうか。デフォルトは`true`。
 * - `false` の場合、スライダーの視覚的な表示は非表示になりますが、機能は維持されます。
 * @param props.baseCSS - オプション 基本的なCSSスタイルを適用するためのクラス
 * @param props.provider - オプション スライダーの値を連携するProviderインスタンス
 * - スライダーの値が変更されると、このProviderの値が自動的に更新されます。
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * // defined manage counter provider
 * const sliderValue = new Provider("initialValue");
 *
 * new Column({
 *   children: [
 *     new Slider({
 *       min: 0,
 *       max: 100,
 *       value: 50,
 *       step: 1,
 *       baseCSS: new BaseCSS({
 *         width: "300px",
 *         height: "5px",
 *         background: "linear-gradient(to right, #ccc, #888)",
 *         borderRadius: "5px"
 *       }),
 *       onChange: (value) => {
 *         console.log(`Slider value changed to: ${value}`);
 *       },
 *       provider: sliderValue
 *     }),
 *     new LimitedProviderScope({
 *       providers: [sliderValue],
 *       builder: (value) => {
 *         return new Text({
 *           text: `Current Value: ${value}`,
 *           textCSS: new TextCSS({ fontCSS: new FontCSS({ fontSize: "18px" }) })
 *         });
 *       }
 *     })
 *   ]
 * });
 * ```
 * 最小限の設定
 * @example
 * ```typescript
 * new Slider({
 *   min: 0,
 *   max: 10,
 *   value: 5
 * });
 * ```
 */
export class Slider extends View {
    constructor(protected props: Partial<SliderProps> = {}) {
        super();
    }

    override createWrapView(): HTMLInputElement {
        return document.createElement("input");
    }

    override styledView(element: HTMLInputElement): HTMLInputElement {
        element.type = "range";
        if(this.props.min) element.min = this.props.min.toString();
        if(this.props.max) element.max = this.props.max.toString();
        if(this.props.value) element.value = this.props.value.toString();
        if(this.props.step) element.step = this.props.step.toString();
        if(this.props.name) element.name = this.props.name;
        
        if (!this.props.isDisplay) {
            element.style.display = "none";
        }

        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element) as HTMLInputElement;

        return element;
    }

    override embedScriptToView(element: HTMLInputElement): HTMLInputElement {
        this._setEventListenerToSlider(element);
        return element;
    }

    private _setEventListenerToSlider(sliderElement: HTMLInputElement): void {
        sliderElement.addEventListener("input", (e: Event) => {   
            const target = e.target as HTMLInputElement;
            this.props.onChange?.(target.value, sliderElement, e);
            
            if (!this.props.provider) return;
            this.props.provider.update(() => {
                return target.value;
            });
        });
    }
}
