import { View } from "../../core/interface/view";
import { ProviderScope } from "../interface/providerScope";
import { Provider } from "../logic/provider";

interface LimitedProviderScopeProps {
    builder: (value: any) => View;
    providers: Array<Provider<any>>;
}

/**
 * LimitedProviderScopeコンポーネント
 * ## OverView
 * `Provider` の値を監視し、その値が変更されたときに特定のウィジェット（`builder` 関数で定義される）のみを
 * 効率的に再レンダリングするためのスコープを提供します。
 * これにより、アプリケーション全体の再レンダリングを避け、パフォーマンスを最適化できます。
 *
 * ## Props
 * @param props - LimitedProviderScopeの設定オプション
 * @param props.builder - 必須 Providerの値が変更された際に再レンダリングされるウィジェットを生成する関数
 * - この関数の引数には、`providers` プロパティで指定された `Provider` の現在の値が、配列として渡されます。
 *   配列の順序は、`providers` で指定した順序と同じです。
 * @param props.providers - 必須 監視する `Provider` インスタンスの配列
 * - ここで指定された `Provider` のいずれかの値が変更されると、`builder` 関数が再実行されます。
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * // Define a Provider to manage the counter
 * const counter = new Provider(0);

 * new Column({
 *   children: [
 *     new ElevatedButton({
 *       onClick: () => {
 *         counter.update((value) => value + 1);
 *       },
 *       text: "Increment"
 *     }),
 *     new SpaceBox({ height: "16px" }),
 *     new LimitedProviderScope({
 *       providers: [counter],
 *       builder: (providerValues) => {
 *         return new Text({
 *           text: `Click count: ${providerValues[0]}`,
 *           textCSS: new TextCSS({ fontCSS: new FontCSS({ fontSize: "20px" }) })
 *         });
 *       }
 *     })
 *   ]
 * });
 * ```
 * 複数のProviderを監視する例
 * @example
 * ```typescript
 * const textProvider = new Provider("Hello");
 * const numberProvider = new Provider(10);

 * new Column({
 *   children: [
 *     new ElevatedButton({
 *       onClick: () => {
 *         textProvider.update((val) => val === "Hello" ? "World" : "Hello");
 *       },
 *       text: "Update Text"
 *     }),
 *     new ElevatedButton({
 *       onClick: () => {
 *         numberProvider.update((val) => val + 1);
 *       },
 *       text: "Update Number"
 *     }),
 *     new SpaceBox({ height: "10px" }),
 *     new LimitedProviderScope({
 *       providers: [textProvider, numberProvider],
 *       builder: (values) => {
 *         return new Text({
 *           text: `Text: ${values[0]}, Number: ${values[1]}`,
 *           textCSS: new TextCSS({ fontCSS: new FontCSS({ color: "blue" }) })
 *         });
 *       }
 *     })
 *   ]
 * });
 * ```
 */
export class LimitedProviderScope extends ProviderScope {
    constructor(protected props: LimitedProviderScopeProps) {
        super({
            providers: props.providers
        });
    }

    override build(): View {
        const readArr = this.props.providers.map((provider: Provider<any>) => {
            return provider.read();
        });

        return this.props.builder(readArr);
    }
}
