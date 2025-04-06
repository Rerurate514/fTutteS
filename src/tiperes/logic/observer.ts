import { Provider } from "./provider";

type UpdateRecord = {
    timestamp: Date;
    provider: string;
    oldValue: any;
    newValue: any;
    stackTrace: string;
};

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
