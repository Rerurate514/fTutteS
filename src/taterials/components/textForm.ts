import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";

interface TextFormProps {
    provider?: any;
    minLength?: number;
    maxLength?: number;
    value?: string;
    placeholder?: string;
    required?: string;
    pattern?: string;
    baseCSS?: BaseCSS;
}

/**
 * TextFormコンポーネント
 * ## OverView
 * HTMLの`<input type="text">`要素をラップし、単一行のテキスト入力フィールドを提供します。
 * 最小/最大文字長、初期値、プレースホルダー、必須入力、正規表現パターンなどを設定できます。
 * オプションでProviderと連携し、入力値をProviderに自動的に反映させることも可能です。
 *
 * ## Props
 * @param props - TextFormの設定オプション
 * @param props.minLength - オプション 入力可能な最小文字数
 * @param props.maxLength - オプション 入力可能な最大文字数
 * @param props.value - オプション テキストフォームの初期値
 * @param props.placeholder - オプション 入力がない場合に表示されるヒントテキスト
 * @param props.required - オプション 必須入力フィールドにするかどうか。空文字列ではない値が指定されると必須になります。
 * @param props.pattern - オプション 入力値の検証に使用される正規表現パターン
 * @param props.baseCSS - オプション 基本的なCSSスタイルを適用するためのクラス
 * @param props.provider - オプション テキストフォームの入力値を連携するProviderインスタンス
 * - 入力値が変更されると、このProviderの値が自動的に更新されます。
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * // Define a Provider to manage the username
 * const userName = new Provider("Initial Username");

 * new Column({
 *   children: [
 *     new TextForm({
 *       minLength: 3,
 *       maxLength: 20,
 *       required: "true", // Set as required
 *       baseCSS: new BaseCSS({
 *         width: "250px",
 *         padding: "8px",
 *         borderCSS: new BorderCSS({
 *           borderSize: "1px",
 *           borderProperty: "solid",
 *           color: "#ddd",
 *           radius: "4px"
 *         })
 *       }),
 *       provider: userName,
 *       placeholder: "Enter your username"
 *     }),
 *     new SpaceBox({ height: "10px" }),
 *     new LimitedProviderScope({
 *       providers: [userName],
 *       builder: (value) => {
 *         return new Text({
 *           text: `Current Username: ${value}`,
 *           textCSS: new TextCSS({ fontCSS: new FontCSS({ color: "darkgray" }) })
 *         });
 *       }
 *     })
 *   ]
 * });
 * ```
 * パターンマッチングの例 (メールアドレス形式)
 * @example
 * ```typescript
 * new TextForm({
 *   required: "true",
 *   baseCSS: new BaseCSS({
 *     width: "250px",
 *     padding: "8px",
 *     borderCSS: new BorderCSS({
 *       borderSize: "1px",
 *       borderProperty: "solid",
 *       color: "#ddd",
 *       radius: "4px"
 *     })
 *   }),
 *   pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
 *   placeholder: "Enter email"
 * });
 * ```
 * 最小限の設定
 * @example
 * ```typescript
 * new TextForm({
 *   placeholder: "Enter text"
 * });
 * ```
 */
export class TextForm extends View {
    constructor(protected props: TextFormProps) {
        super();
    }

    override createWrapView(): HTMLInputElement {
        const textForm = document.createElement("input");
        textForm.type = "text";
        return textForm;
    }

    override styledView(element: HTMLInputElement): HTMLInputElement {
        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element) as HTMLInputElement;

        element.value = this.props.value || '';
        if(this.props.placeholder) element.placeholder = this.props.placeholder;
        if (this.props.minLength) element.minLength = this.props.minLength;
        if (this.props.maxLength) element.maxLength = this.props.maxLength;
        element.required = this.props.required !== "";
        if(this.props.pattern) element.pattern = this.props.pattern;

        return element;
    }

    override embedScriptToView(element: HTMLInputElement): HTMLInputElement {
        element.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const currentValue = target.value;
            this.updateProvider(currentValue);
        });

        return element;
    }

    private updateProvider(value: string): void {
        if (!this.props.provider) return;

        this.props.provider.update(() => {
            return value;
        });
    }
}
