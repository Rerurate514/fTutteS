import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";

interface TextAreaProps {
    provider?: any;
    value?: string;
    placeholder?: string;
    maxLength?: number;
    rows?: number;
    cols?: number;
    wrap?: "soft" | "hard";
    spellcheck?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    baseCSS?: BaseCSS;
}

/**
 * TextAreaコンポーネント
 * ## OverView
 * HTMLの`<textarea>`要素をラップし、複数行のテキスト入力フィールドを提供します。
 * プレースホルダー、最大文字数、行数、列数、単語の折り返し、スペルチェック、読み取り専用、無効化などの属性を設定できます。
 * オプションでProviderと連携し、入力値をProviderに自動的に反映させることも可能です。
 *
 * ## Props
 * @param props - TextAreaの設定オプション
 * @param props.value - オプション テキストエリアの初期値
 * @param props.placeholder - オプション 入力がない場合に表示されるヒントテキスト
 * @param props.maxLength - オプション 入力可能な最大文字数
 * @param props.rows - オプション 表示される行数
 * @param props.cols - オプション 表示される列数
 * @param props.wrap - オプション テキストの単語の折り返し方法
 * - `"soft"` (デフォルト): ソフトラップ（表示上のみ折り返し）
 * - `"hard"`: ハードラップ（フォーム送信時に改行コードが追加される）
 * @param props.spellcheck - オプション スペルチェックを有効にするかどうか
 * @param props.readonly - オプション 読み取り専用にするかどうか
 * @param props.disabled - オプション テキストエリアを無効にするかどうか
 * @param props.baseCSS - オプション 基本的なCSSスタイルを適用するためのクラス
 * @param props.provider - オプション テキストエリアの入力値を連携するProviderインスタンス
 * - 入力値が変更されると、このProviderの値が自動的に更新されます。
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * // Define Provider to manage text area values
 * const textContent = new Provider("Initial text");

 * new Column({
 *   children: [
 *     new TextArea({
 *       placeholder: "Type your text here...",
 *       rows: 5,
 *       cols: 40,
 *       maxLength: 200,
 *       baseCSS: new BaseCSS({
 *         width: "300px",
 *         padding: "10px",
 *         borderCSS: new BorderCSS({
 *           borderSize: "1px",
 *           borderProperty: "solid",
 *           color: "#ccc",
 *           radius: "5px"
 *         })
 *       }),
 *       provider: textContent
 *     }),
 *     new SpaceBox({ height: "10px" }),
 *     new LimitedProviderScope({
 *       providers: [textContent],
 *       builder: (value) => {
 *         return new Text({
 *           text: `Entered text: ${value}`,
 *           textCSS: new TextCSS({ fontCSS: new FontCSS({ color: "gray" }) })
 *         });
 *       }
 *     })
 *   ]
 * });
 * ```
 * 最小限の設定
 * @example
 * ```typescript
 * new TextArea({
 *   placeholder: "Enter text here..."
 * });
 * ```
 */
export class TextArea extends View {
    constructor(protected props: TextAreaProps) {
        super();
    }

    override createWrapView(): HTMLTextAreaElement {
        return document.createElement("textarea");
    }

    override styledView(element: HTMLTextAreaElement): HTMLTextAreaElement {
        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element) as HTMLTextAreaElement;

        if(this.props.value) element.value = this.props.value;
        if(this.props.placeholder) element.placeholder = this.props.placeholder;

        if (this.props.maxLength) element.maxLength = this.props.maxLength;
        if (this.props.rows) element.rows = this.props.rows;
        if (this.props.cols) element.cols = this.props.cols;

        if(this.props.wrap) element.wrap = this.props.wrap;
        if(this.props.spellcheck) element.spellcheck = this.props.spellcheck;
        if(this.props.readonly) element.readOnly = this.props.readonly;
        if(this.props.disabled) element.disabled = this.props.disabled;

        return element;
    }

    override embedScriptToView(element: HTMLTextAreaElement): HTMLTextAreaElement {
        element.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLTextAreaElement;
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
