import { ProviderObserver } from "./observer";

type RefType = {
    read: <T>(otherProvider: Provider<T>) => T;
    update: (updateFn: (currentValue: any) => any) => void;
    watch: <T>(otherProvider: Provider<T>, updateFn: (parentValue: T, currentValue: any) => any) => void;
};

type WatchOptions = {
    immediate?: boolean;
};

/**
 * Providerクラス
 * ## OverView
 * fTutteSフレームワークにおけるUIなどの状態管理を担当する基幹クラスです。
 * アプリケーションの状態を保持し、その変更を監視（`watch`）しているリスナーに通知（`update`）します。
 * これにより、状態の変化に基づいてUIを効率的に再レンダリングすることが可能になります。
 *
 * `Provider`のインスタンスは、必ずファクトリメソッドである`Provider.createProvider()`を使用して作成してください。
 *
 * ## Key Concepts
 * - **状態の保持**: 任意の型の値を内部に保持します。
 * - **読み取り (`read`)**: `Provider`の現在の値を静的に取得します。この操作では依存関係は登録されません。
 * - **更新 (`update`)**: `Provider`の値を変更し、その変更を全ての購読者（リスナー）に通知します。
 * - **購読 (`watch`)**: `Provider`の値の変化を監視し、変化が発生した際に指定されたコールバック関数を実行します。
 * また、`ref.watch`を使用することで、ある`Provider`が他の`Provider`に依存する関係を構築できます。
 * - **ProviderObserver**: `Provider`の更新履歴や依存関係を追跡・デバッグするためのクラスです。
 *
 * ## Properties
 * @property {string} name - Providerの識別名。`Provider.createProvider`で指定しない場合はランダムな文字列が割り当てられます。
 *
 * ## Methods
 * @static
 * @method createProvider<T>(createFn: (ref: RefType) => T, name: string | null = null)
 * **推奨されるProviderのインスタンス化方法**。
 * `Provider`の新しいインスタンスを作成するファクトリメソッドです。
 * `createFn`内で`ref`オブジェクトを使用して、他の`Provider`の値を読み取ったり（`ref.read`）、
 * 他の`Provider`に依存させたり（`ref.watch`）できます。
 * @param createFn - 必須 Providerの初期値を計算し、他のProviderとの依存関係を設定するための関数。
 * - 引数`ref`には`read`, `update`, `watch`メソッドが提供されます。
 * @param name - オプション このProviderに付ける名前。ProviderObserverでログを確認する際に識別しやすくなります。
 * @returns {Provider<T>} - 新しく作成されたProviderインスタンス。
 *
 * @method read()
 * Providerの現在の値を静的に読み取ります。
 * このメソッドを呼び出しても、この`Provider`を監視しているリスナーは追加されません。
 * @returns {T} - Providerが保持する現在の値。
 *
 * @method watch(listener: (value: T) => void, options?: WatchOptions)
 * このProviderの値が変更された際に実行されるリスナー（コールバック関数）を登録します。
 * @param listener - 必須 値が変更されたときに実行される関数。変更後の新しい値が引数として渡されます。
 * @param options - オプション `immediate`プロパティを持つオブジェクト。
 * - `immediate: true` (デフォルト): `watch`が呼び出された直後に`listener`を一度実行します。
 * - `immediate: false`: `watch`が呼び出された直後には`listener`を実行せず、値が変更されたときにのみ実行します。
 * @returns {() => void} - リスナーの登録を解除するための関数。この関数を呼び出すことで購読を停止できます。
 *
 * @method update(updateFn: (currentValue: T) => T)
 * Providerの値を更新します。
 * このメソッドが呼び出されると、`watch`で登録された全てのリスナーが新しい値で発火します。
 * `ProviderObserver`が有効な場合、更新履歴が記録されます。
 * @param updateFn - 必須 現在の値を引数として受け取り、新しい値を返す関数。
 *
 * @method unsubscribedDependency(parentProvider: Provider<any>)
 * このProviderが、特定の親Providerへの依存関係を解除します。
 * 通常は内部的に管理されますが、明示的に依存関係をクリーンアップしたい場合に利用できます。
 * @param parentProvider - 依存関係を解除したい親Providerのインスタンス。
 *
 * ## RefType (createFnの引数`ref`オブジェクト)
 * `Provider.createProvider`の`createFn`に渡される`ref`オブジェクトは、他のProviderとのインタラクションを可能にします。
 * - `ref.read<T>(otherProvider: Provider<T>): T`: 他のProviderの値を読み取ります。この読み取りでは、呼び出し元のProviderと`otherProvider`間の依存関係は自動的に登録されません。
 * - `ref.update(updateFn: (currentValue: any) => any): void`: 自身（現在のProvider）の値を更新します。これは`Provider.update`の内部呼び出しです。
 * - `ref.watch<T>(otherProvider: Provider<T>, updateFn: (parentValue: T, currentValue: any) => any): void`: 他のProvider（`otherProvider`）の値が変更された際に、現在のProviderの値を更新するように設定します。これにより、現在のProviderは`otherProvider`に依存する形となり、`ProviderObserver`に依存関係が記録されます。
 *
 * ## Examples
 * @example
 * ```typescript
 * import { Provider, assembleView, ElevatedButton, Text, Column, LimitedProviderScope } from 'ftuttes';
 *
 * // create counter provider
 * const counter = Provider.createProvider((ref) => 0, "MyCounter");
 *
 * // build UI
 * assembleView(new Column({
 *   children: [
 *     new LimitedProviderScope({
 *       providers: [counter],
 *       builder: ([count]) => new Text({
 *         text: `Count: ${count}`,
 *         textCSS: new TextCSS({ fontCSS: new FontCSS({ fontSize: "24px" }) })
 *       })
 *     }),
 *     new ElevatedButton({
 *       text: "Increment",
 *       onClick: () => {
 *         counter.update(currentValue => currentValue + 1);
 *       }
 *     })
 *   ]
 * }));
 * ```
 *
 * Provider間の依存関係 (`ref.watch`の使用)
 * @example
 * ```typescript
 * import { Provider, assembleView, Text, Column, LimitedProviderScope } from 'ftuttes';
 *
 * // Provider holding user information
 * const userProvider = Provider.createProvider(ref => ({ name: "Alice", age: 30 }), "UserProvider");
 *
 * // userProviderのageに依存するProvider
 * const userAgeDisplayProvider = Provider.createProvider(ref => {
 *   // Whenever userProvider is updated, the value of this Provider is also updated.
 *   ref.watch(userProvider, (user, currentAgeDisplay) => {
 *     return `user age: ${user.age}歳`;
 *   });
 *   // initial value
 *   return `user age: ${ref.read(userProvider).age}`;
 * }, "UserAgeDisplayProvider");
 *
 * assembleView(new Column({
 *   children: [
 *     new LimitedProviderScope({
 *       providers: [userAgeDisplayProvider],
 *       builder: ([ageText]) => new Text({ text: ageText })
 *     }),
 *     new ElevatedButton({
 *       text: "Increase age by 1 year",
 *       onClick: () => {
 *         userProvider.update(user => ({ ...user, age: user.age + 1 }));
 *       }
 *     })
 *   ]
 * }));
 * ```
 */
export class Provider<T> {
    protected _dependencies: Map<Provider<any>, Dependency<any, T>>;
    protected _listeners: Set<(value: T) => void>;
    protected _core: ProviderCore<T>;
    protected _isActivedLog: boolean = true;
    public name: string = "";

    constructor(createFn: (ref: RefType) => T) {
        this._dependencies = new Map();
        this._listeners = new Set();
        this._core = new ProviderCore<T>(createFn);
    }

    /**
     * 
     * @param {Function(ref)} createFn 
     * @returns {Provider} provider
     * 
     * # Providerクラスのファクトリメソッド
     * 基本的にはnewキーワードを使用せず、
     * このファクトリを使用してProviderを作成してください。
     * 
     * 使用例：`Provider.createProvider((ref) => { return 値 });`
     */
    static createProvider<T>(createFn: (ref: RefType) => T, name: string | null = null): Provider<T> {
        let provider = new Provider<T>(createFn);
        provider.setName(name);
        return provider;
    }

    protected setName(name: string | null): void {
        if (name) {
            this.name = name;
        }
        else {
            this.name = Math.random().toString(36).substr(2, 9);
        }
    }

    /**
     * 
     * @returns {Provider.value}
     * 
     * Provider内の値を静的に読み取る場合に使用できるメソッド
     * 
     * 使用例：`createdProvider.read();`
     */
    public read(): T {
        if (!this._core.isInitialized) {
            const ref = this.createRef();
            this._core.value = this._core.create(ref);
            this._core.isInitialized = true;
        }

        return this._core.value;
    }

    /**
     * 
     * @param {Function(currentValue)} listener 
     * @param {boolean} immediate
     * @returns {Function} unsubscribed
     * 
     * Provider内の値が変更された際に行う動作を定義することができる。
     * Providerをリッスン状態にすることができるともいう。
     * 
     * immediate引数はwatchが呼びされた際にProviderのリスナーを発火させるかを決める。
     * trueなら発火、falseなら発火しない。
     * 
     * 使用例；`createdProvider.watch((changedValue) => { console.log("値の変更が検知されました:" + changedValue)});`
     */
    public watch(listener: (value: T) => void, { immediate = true }: WatchOptions = {}): () => void {
        this._listeners.add(listener);

        if (immediate) {
            listener(this.read());
        }

        return () => {
            this._listeners.delete(listener);
        };
    }

    /**
     * 
     * @param {Function} updateFn 
     * 
     * Providerの値を変更したいときに使用するメソッド。
     * 
     * このメソッドが呼び出されるとwatchで定義したリスナーが一斉に発火する。
     * これによってwatchしているコードに値の変更が通知される。
     */
    public update(updateFn: (currentValue: T) => T): void {
        const currentValue = this.read();
        const newValue = updateFn(currentValue);

        const observer = new ProviderObserver();
        if(this._isActivedLog) observer.logUpdate(this, currentValue, newValue);

        this._core.value = newValue;
        this.notifyListeners(newValue);
    }

    protected notifyListeners(newValue: T): void {
        this._listeners.forEach(listener => listener(newValue));
    }

    protected createRef(): RefType {
        const observer = new ProviderObserver();
        const ref: RefType = {
            read: <U>(otherProvider: Provider<U>): U => {
                return otherProvider.read();
            },
            update: (updateFn: (currentValue: T) => T): void => {
                const oldValue = this.read();
                this.update(updateFn);
                const newValue = this.read();
                if(this._isActivedLog) observer.logUpdate(this, oldValue, newValue);
            },
            watch: <U>(otherProvider: Provider<U>, updateFn: (parentValue: U, currentValue: T) => T): void => {
                observer.addDependency(this, otherProvider);
                this._dependencies.set(
                    otherProvider,
                    new Dependency<U, T>(otherProvider, this, updateFn)
                );
            },
        };
        return ref;
    }

    public unsubscribedDependency(parentProvider: Provider<any>): void {
        const observer = new ProviderObserver();

        if (this._dependencies.has(parentProvider)) {
            const dependency = this._dependencies.get(parentProvider);
            if (dependency) {
                dependency.unsubscribedParent();
                this._dependencies.delete(parentProvider);
                if(this._isActivedLog) observer.deleteDependency(this, parentProvider);
            }
        }
    }

    public setIsActivedLog(isActivedLog: boolean): void {
        this._isActivedLog = isActivedLog;
    }
}

class ProviderCore<T> {
    create: (ref: RefType) => T;
    value: T;
    isInitialized: boolean;

    constructor(createFn: (ref: RefType) => T) {
        this.create = createFn;
        this.value = null as unknown as T;
        this.isInitialized = false;
    }
}

class Dependency<ParentT, T> {
    parentProvider: Provider<ParentT>;
    provider: Provider<T>;
    private _unsubscribed: () => void = () => {};

    constructor(parentProvider: Provider<ParentT>, provider: Provider<T>, updateFn: (parentValue: ParentT, currentValue: T) => T) {
        this.parentProvider = parentProvider;
        this.provider = provider;

        this._listenParent(updateFn);
    }

    printDependency(): void {
        console.log(`${this.provider.name} depends on ${this.parentProvider.name}`);
    }

    private _listenParent(updateFn: (parentValue: ParentT, currentValue: T) => T): void {
        this._unsubscribed = this.parentProvider.watch(
            (parentValue) => {
                this.provider.update((currentValue) => {
                    return updateFn(parentValue, currentValue);
                });
            },
            { immediate: false }
        );
    }

    unsubscribedParent(): void {
        this._unsubscribed();
    }
}

// # 使用方法
// テスト用のプロバイダーを作成
// const userProvider = Provider.createProvider(ref => {
//     return { name: "田中", age: 25 };
// });

// const userAgeProvider = Provider.createProvider(ref => {
//     ref.watch(userProvider, (user, currentValue) => {
//         return user.age;
//     });
//     return ref.read(userProvider).age;
// });

// const userSummaryProvider = Provider.createProvider(ref => {
//     ref.watch(userAgeProvider, (age, currentValue) => {
//         return `年齢は${age}歳です`;
//     });
//     return `年齢は${ref.read(userAgeProvider)}歳です`;
// });

// プロバイダーの使用
// console.log("Initial values:");
// console.log("User:", userProvider.read());
// console.log("Age:", userAgeProvider.read());
// console.log("Summary:", userSummaryProvider.read());

// 値を更新
// console.log("\nUpdating user age...");
// userProvider.update(user => ({ ...user, age: 26 }));

// 更新履歴を表示
// console.log("\nUpdate History:");
// console.log(new ProviderObserver().getAllUpdateHistory());

// 更新履歴(フィルター済み)を表示
// console.log("\nUpdate History:");
// console.log(new ProviderObserver().getFilteredUpdateHistory(userProvider));

// 依存関係グラフを表示
// console.log("\nDependency Graph:");
// console.log(new ProviderObserver().getDependencyGraph());
