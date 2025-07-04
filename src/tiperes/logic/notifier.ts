import { Provider } from "./provider";

export abstract class Notifier<T> {
    private readonly provider: Provider<T>;
    get state(): T {
        return this.provider.read();
    }

    constructor() {
        this.provider = Provider.createProvider<T>(() => {
            return this.build();
        }, `${this.constructor.name}`);
    }

    protected abstract build(): T;

    protected update(updateFn: (value: T) => T): void {
        this.provider.update(updateFn);
    }

    public watch(listener: (value: T) => void){
        this.provider.watch(listener);
    }
}

export class NotifierProvider<NotifierT extends Notifier<T>, T> extends Provider<NotifierT> {
    public readonly notifier: NotifierT;

    constructor(createFn: () => NotifierT){
        super(createFn);
        this.notifier = createFn();

        this.notifier.watch(() => {
            this.update((currentValue) => {
                return currentValue;
            });
            this.notifyListeners(this.read());
        });
    }

    static override createProvider<T>(createFn: (ref: { read: <T>(otherProvider: Provider<T>) => T; update: (updateFn: (currentValue: any) => any) => void; watch: <T>(otherProvider: Provider<T>, updateFn: (parentValue: T, currentValue: any) => any) => void; }) => T, name?: string | null): Provider<T> {
        throw new Error(`${this.constructor.name}はcreateProviderからではなく、直接インスタンス化してください。`);
    }

    override read(): NotifierT {
        this._core.value = this.notifier;
        return this.notifier;
    }
}
