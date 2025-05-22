import { Provider } from "./provider";

type UpdateRecord = {
    timestamp: Date;
    provider: string;
    oldValue: any;
    newValue: any;
    stackTrace: string;
};

/**
 * ProviderObserverクラス
 * ## OverView
 * fTutteSフレームワークにおける`Provider`の状態管理とデバッグを支援するためのシングルトンクラスです。
 * `Provider`間の依存関係を追跡し、`Provider`の値が更新された際の履歴を記録します。
 * これにより、アプリケーションの状態変化やデータフローを詳細に把握し、デバッグを効率的に行うことができます。
 *
 * ## Features
 * - **依存関係の追跡**: `Provider`が他の`Provider`に依存する関係（例: `watch`による購読）を記録します。
 * - **更新履歴の記録**: 各`Provider`の値がいつ、どのように変更されたかの詳細な履歴（タイムスタンプ、旧値、新値、スタックトレース）を保持します。
 * - **ログ出力の制御**: `outLogs()`メソッドで、更新や依存関係追加/削除時のコンソールログ出力を制御できます。
 *
 * ## Constructor
 * `ProviderObserver`はシングルトンパターンを採用しており、常に同じインスタンスが返されます。
 * したがって、`new ProviderObserver()`を複数回呼び出しても、常に同じインスタンスを取得します。
 *
 * ## Methods
 * @method outLogs(isOutedLog: boolean = true)
 * ProviderObserverのログ出力を有効または無効にします。
 * @param isOutedLog - オプション ログ出力を行う場合は`true`、行わない場合は`false`。デフォルトは`true`。
 *
 * @method addDependency(childProvider: Provider<any>, parentProvider: Provider<any>)
 * `childProvider`が`parentProvider`に依存関係を追加したことを記録します。
 * (内部的に`Provider.watch`が呼び出された際に自動的に呼び出されます。)
 * @param childProvider - 依存する側のProviderインスタンス。
 * @param parentProvider - 依存される側のProviderインスタンス。
 *
 * @method deleteDependency(childProvider: Provider<any>, parentProvider: Provider<any>)
 * `childProvider`が`parentProvider`への依存関係を削除したことを記録します。
 * (内部的に購読が解除された際に自動的に呼び出されます。)
 * @param childProvider - 依存関係を削除する側のProviderインスタンス。
 * @param parentProvider - 依存関係が削除される側のProviderインスタンス。
 *
 * @method logUpdate(provider: Provider<any>, oldValue: any, newValue: any)
 * 指定された`Provider`の値が更新されたことを記録します。
 * 旧値、新値、タイムスタンプ、スタックトレースを含む更新履歴を`updateHistory`に追加します。
 * (内部的に`Provider.update`が呼び出された際に自動的に呼び出されます。)
 * - 大容量のオブジェクトはログの可読性を保つため、`"Large Object (simplified)"`として記録されます。
 * @param provider - 更新されたProviderインスタンス。
 * @param oldValue - 更新前のProviderの値。
 * @param newValue - 更新後のProviderの値。
 *
 * @method getDependencyGraph()
 * 現在記録されているProvider間の依存関係グラフを取得します。
 * @returns {Record<string, string[]>} - キーが子Providerの名前、値がそのProviderが依存する親Providerの名前の配列であるオブジェクト。
 *
 * @method getAllUpdateHistory()
 * 全てのProviderの更新履歴の配列を取得します。
 * @returns {UpdateRecord[]} - 各更新の記録を含む`UpdateRecord`オブジェクトの配列。
 *
 * @method getFilteredUpdateHistory(provider: Provider<any>)
 * 特定のProviderの更新履歴のみをフィルタリングして取得します。
 * @param provider - 履歴を取得したいProviderインスタンス。
 * @returns {UpdateRecord[]} - 指定されたProviderの更新記録を含む`UpdateRecord`オブジェクトの配列。
 *
 * @static
 * @method clearInstance()
 * `ProviderObserver`のシングルトンインスタンスをクリアします。
 * テスト環境などでインスタンスをリセットしたい場合にのみ使用してください。
 * 
 * ## Examples
 * ProviderObserverを利用した更新履歴の監視
 * @example
 * ```typescript
 * // ProviderObserverのインスタンスを取得
 * const observer = new ProviderObserver();

 * // ログ出力を有効にする（デフォルトは有効）
 * observer.outLogs(true);

 * const counterProvider = new Provider(0, "MyCounter");
 * const textProvider = new Provider("Initial Text", "MyText");

 * new Column({
 *   children: [
 *     new ElevatedButton({
 *       onClick: () => counterProvider.update(val => val + 1),
 *       text: "Increment Counter"
 *     }),
 *     new ElevatedButton({
 *       onClick: () => textProvider.update(val => val === "Initial Text" ? "Updated Text" : "Initial Text"),
 *       text: "Change Text"
 *     }),
 *     new LimitedProviderScope({
 *       providers: [counterProvider],
 *       builder: ([count]) => new Text({ text: `Counter: ${count}` })
 *     }),
 *     new LimitedProviderScope({
 *       providers: [textProvider],
 *       builder: ([text]) => new Text({ text: `Text: ${text}` })
 *     })
 *   ]
 * });
 * ```
 * ProviderObserverの履歴確認
 * @example
 * ```typescript
 * document.addEventListener("DOMContentLoaded", () => {
 *   new Column({
 *     children: [
 *       new Text({ text: "See console for ProviderObserver logs!" }),
 *       new ElevatedButton({
 *         onClick: () => {
 *           console.log("All Update History:", observer.getAllUpdateHistory());
 *         },
 *         text: "Show All Update History"
 *       }),
 *       new ElevatedButton({
 *         onClick: () => {
 *           console.log("Counter Update History:", observer.getFilteredUpdateHistory(counterProvider));
 *         },
 *         text: "Show Counter Update History"
 *       }),
 *       new ElevatedButton({
 *         onClick: () => {
 *           console.log("Dependency Graph:", observer.getDependencyGraph());
 *         },
 *         text: "Show Dependency Graph"
 *       })
 *     ]
 *   });
 * });
 * ```
 */
export class ProviderObserver {
    private static instance: ProviderObserver;
    private dependencyGraph!: Map<Provider<any>, Set<Provider<any>>>;
    private updateHistory!: UpdateRecord[];
    private _isOutedLog: boolean = true;

    constructor() {
        if (!ProviderObserver.instance) {
            ProviderObserver.instance = this;
            this.dependencyGraph = new Map();
            this.updateHistory = [];
        }
        return ProviderObserver.instance;
    }

    outLogs(isOutedLog: boolean = true): void {
        this._isOutedLog = isOutedLog;
    }

    addDependency(childProvider: Provider<any>, parentProvider: Provider<any>): void {
        if (!this.dependencyGraph.has(childProvider)) {
            this.dependencyGraph.set(childProvider, new Set());
        }
        this.dependencyGraph.get(childProvider)?.add(parentProvider);
        this.log(`Dependency added: ${this._getProviderInfo(childProvider)} depends on ${this._getProviderInfo(parentProvider)}`);
    }

    deleteDependency(childProvider: Provider<any>, parentProvider: Provider<any>): void {
        if (this.dependencyGraph.has(childProvider)) {
            this.dependencyGraph.get(childProvider)?.delete(parentProvider);
        }
        this.log(`Dependency deleted: ${this._getProviderInfo(childProvider)} unsubscribed ${this._getProviderInfo(parentProvider)}`);
    }

    private _isLargeObject(obj: any, maxSize: number = 1024 * 10): boolean {
        try {
            const sizeInBytes = new Blob([JSON.stringify(obj)]).size;
            return sizeInBytes > maxSize;
        } catch (error) {
            console.error('オブジェクトの解析中にエラーが発生しました:', error);
            return true;
        }
    }

    logUpdate(provider: Provider<any>, oldValue: any, newValue: any): void {
        let oldValueForLog = oldValue;
        let newValueForLog = newValue;

        if (oldValue && typeof oldValue === 'object' && oldValue.props && oldValue.props.id) {
            oldValueForLog = `${oldValue.constructor.name}__viewId:${oldValue.props.id}`;
        }

        if (newValue && typeof newValue === 'object' && newValue.props && newValue.props.id) {
            newValueForLog = `${newValue.constructor.name}__viewId:${newValue.props.id}`;
        }

        if (this._isLargeObject(oldValue)) {
            oldValueForLog = "Large Object (simplified)";
        }

        if (this._isLargeObject(newValue)) {
            newValueForLog = "Large Object (simplified)";
        }

        const record: UpdateRecord = {
            timestamp: new Date(),
            provider: provider.name,
            oldValue: oldValueForLog,
            newValue: newValueForLog,
            stackTrace: this._getStackTrace()
        };

        this.updateHistory.push(record);

        this.log(`Update: ${record.provider} changed from ${JSON.stringify(oldValueForLog)} to ${JSON.stringify(newValueForLog)}`);
    }

    getDependencyGraph(): Record<string, string[]> {
        const graph: Record<string, string[]> = {};
        this.dependencyGraph.forEach((dependencies, provider) => {
            graph[this._getProviderInfo(provider)] = Array.from(dependencies).map(dep => this._getProviderInfo(dep));
        });
        return graph;
    }

    getAllUpdateHistory(): UpdateRecord[] {
        return this.updateHistory;
    }

    getFilteredUpdateHistory(provider: Provider<any>): UpdateRecord[] {
        return this.updateHistory.filter((history) =>
            history.provider === this._getProviderInfo(provider)
        );
    }

    private _getProviderInfo(provider: Provider<any>): string {
        return provider.name;
    }

    private _getStackTrace(): string {
        const stackTrace = new Error().stack?.toString() || "";
        return stackTrace.substr(13, stackTrace.length);
    }

    log(message: string, obj: any = null): void {
        if (!this._isOutedLog) return;

        const baseMessage = `[ProviderObserver] ${message}`;

        if (obj) {
            console.log(baseMessage, JSON.stringify(obj, null, 2));
        } else {
            console.log(baseMessage);
        }
    }

    static clearInstance(): void {
        ProviderObserver.instance = null as unknown as ProviderObserver;
    }
}
