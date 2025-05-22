import { ProviderScope } from "../../tiperes/interface/providerScope";
import { Provider } from "../../tiperes/logic/provider";

interface RadioButtonProps {
    labelText: string;
    name?: string;
    checkedRadioButton?: (radioBtn: HTMLInputElement, event: Event) => void;
    providers?: Array<Provider<any>>;
    isDisplay?: boolean;
    isChecked?: boolean;
}

/**
 * RadioButtonコンポーネント
 * ## OverView
 * ラジオボタンとそのラベルテキストを生成します。
 * ラジオボタンのグループ化、表示/非表示の制御、初期選択状態の設定が可能です。
 * 選択状態が変更された際のコールバックを設定できます。
 * 本ウィジェットは `ProviderScope` を継承していますが、再レンダリングの最小化のためには `LimitedProviderScope` の利用を検討してください。
 *
 * ## Props
 * @param props - RadioButtonの設定オプション
 * @param props.labelText - 必須 ラジオボタンに表示するテキスト
 * @param props.name - オプション ラジオボタングループの名前。同じ`name`を持つラジオボタンはグループとして機能し、その中から一つだけ選択できます。
 * @param props.checkedRadioButton - オプション ラジオボタンが選択されたときに実行されるコールバック関数
 * - コールバックの引数: `(radioBtn: HTMLInputElement, event: Event) => void`
 * @param props.providers - オプション このウィジェットとその子孫で利用可能なProviderの配列。
 * @param props.isDisplay - オプション ラジオボタンの実際の入力要素を表示するかどうか。デフォルトは `true`。
 * - `false` の場合、ラジオボタンの視覚的な表示は非表示になりますが、機能は維持されます。
 * @param props.isChecked - オプション ラジオボタンの初期選択状態
 * - `true` の場合、初期状態で選択されます。
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * new Column({
 *   children: [
 *     new RadioButton({
 *       name: "optionGroup",
 *       isChecked: true,
 *       checkedRadioButton: (radioBtn, event) => {
 *         console.log("Option A selected!");
 *       },
 *       labelText: "Option A"
 *     }),
 *     new RadioButton({
 *       name: "optionGroup",
 *       checkedRadioButton: (radioBtn, event) => {
 *         console.log("Option B selected!");
 *       },
 *       labelText: "Option B"
 *     }),
 *     new RadioButton({
 *       name: "optionGroup",
 *       checkedRadioButton: (radioBtn, event) => {
 *         console.log("Option C selected!");
 *       },
 *       labelText: "Option C"
 *     })
 *   ]
 * });
 * ```
 *
 * 最小限の設定
 * @example
 * ```typescript
 * new RadioButton({
 *   labelText: "Simple Radio"
 * });
 * ```
 */
export class RadioButton extends ProviderScope{
    constructor(protected radioProps: RadioButtonProps) {
        const provs: Provider<any>[] = radioProps.providers ?? [];
        super({
            providers: provs
        });
    }

    override createWrapView(): HTMLLabelElement {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        label.appendChild(radio);
        const labelTextDiv = document.createTextNode(this.radioProps.labelText);
        label.appendChild(labelTextDiv);
        return label;
    }

    override styledView(element: HTMLLabelElement): HTMLLabelElement {
        const radioInput = element.firstElementChild as HTMLInputElement;
        radioInput.type = "radio";
        if (this.radioProps.name) radioInput.name = this.radioProps.name;
        if (!this.radioProps.isDisplay) radioInput.style.display = "none";
        if (this.radioProps.isChecked) radioInput.checked = this.radioProps.isChecked;
        return element;
    }

    override embedScriptToView(element: HTMLLabelElement): HTMLLabelElement {
        this._setEventListenerToRadioBtn(element);
        return element;
    }

    private _setEventListenerToRadioBtn(radioBtn: HTMLLabelElement): void {
        const radioInput = radioBtn.firstElementChild as HTMLInputElement;
        radioInput.addEventListener("change", (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (target.checked) {
                this.radioProps.checkedRadioButton?.(radioInput, e);
            }
        });
    }
}
