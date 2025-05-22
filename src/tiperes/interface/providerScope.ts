import { View } from "../../core/interface/view";
import { Provider } from "../logic/provider";

interface ProviderScopeProps {
    providers: Array<Provider<any>>,
    child?: View
}

/**
 * ProviderScopeコンポーネント
 * ## OverView
 * `Provider` の値を監視し、その値が変更されたときにこの `ProviderScope` 以下のすべての View を再構築（`rebuild()`）します。
 * Flutter の `setState` や React の `useState` のように、状態の変化に応じて UI を更新する際に使用します。
 * 複数の `Provider` を監視する場合は、必ず `Provider` のインスタンスを配列で渡してください。
 *
 * **注意:** 広範囲の再レンダリングを避けるため、大規模なコンポーネントツリーや頻繁に更新される `Provider` を監視する場合は、
 * `LimitedProviderScope` の使用を推奨します。
 *
 * ## Props
 * @param props - ProviderScopeの設定オプション
 * @param props.providers - 必須 監視する `Provider` インスタンスの配列。
 * - ここで指定された `Provider` のいずれかの値が変更されると、この `ProviderScope` 以下の View 全体が再構築されます。
 * @param props.child - オプション このスコープが適用される単一の子要素。
 * - 子要素がない場合でもスコープは機能しますが、通常は子要素をラップするために使用します。
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * // Define a Provider to manage the counter
 * const globalCounter = new Provider(0);

 * new ProviderScope({
 *   providers: [globalCounter],
 *   child: new Column({
 *     children: [
 *       new Text({ text: "This counter is managed by ProviderScope" }),
 *       new SpaceBox({ height: "10px" }),
 *       new ElevatedButton({
 *         onClick: () => {
 *           globalCounter.update((value) => value + 1);
 *         },
 *         text: "Increment Global Counter"
 *       }),
 *       new SpaceBox({ height: "10px" }),
 *       new Text({
 *         text: `Current Global Count: ${globalCounter.read()}`, // Get the current value with read()
 *         textCSS: new TextCSS({ fontCSS: new FontCSS({ fontSize: "20px", color: "navy" }) })
 *       }),
 *       new Text({
 *         text: "↑ This text is always updated when the counter changes because ProviderScope triggers a full re-render."
 *       })
 *     ]
 *   })
 * });
 * ```
 * **LimitedProviderScopeとの比較 (非推奨パターン)**
 * `ProviderScope`は広範囲な再レンダリングを引き起こす可能性があるため、以下の使用例は
 * 機能的には動作しますが、パフォーマンスの観点からは`LimitedProviderScope`が推奨されます。
 * @example
 * ```typescript
 * // This pattern works but LimitedProviderScope is generally preferred.
 * const exampleProvider = new Provider("Initial State");

 * new ProviderScope({
 *   providers: [exampleProvider],
 *   child: new Column({
 *     children: [
 *       new ElevatedButton({
 *         onClick: () => {
 *           exampleProvider.update((val) => val === "Initial State" ? "Updated State" : "Initial State");
 *         },
 *         text: "Change State"
 *       }),
 *       new Text({
 *         text: `State: ${exampleProvider.read()}`
 *       })
 *     ]
 *   })
 * });
 * ```
 */
export class ProviderScope extends View {
    constructor(protected props: ProviderScopeProps) {
        super();

        this._iterateProviders();
    }

    private _iterateProviders(): void {
        this.props.providers.forEach((provider: Provider<any>) => {
            this._watch(provider);
        });
    }

    private _watch(provider: Provider<any>): void {
        provider.watch(() => {
            this.rebuild();
        },
        { immediate: false });
    }
}
