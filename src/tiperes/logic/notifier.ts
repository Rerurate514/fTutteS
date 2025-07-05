import { Provider } from "./provider";

/**
 * Notifierクラス
 * ## Overview
 * fTutteSフレームワークにおけるビジネスロジックと状態管理を担当する抽象クラスです。
 * `Provider`をラップして、よりオブジェクト指向的なアプローチで状態管理を行うことができます。
 * アプリケーションの状態を保持し、その変更を監視しているリスナーに通知します。
 * 
 * `Notifier`は抽象クラスなので、必ず継承して使用してください。
 * 継承したクラスでは`build()`メソッドを実装して初期状態を定義する必要があります。
 *
 * ## Key Concepts
 * - **状態の保持**: `build()`メソッドで定義された初期状態を内部の`Provider`で管理します。
 * - **状態の読み取り (`state`)**: 現在の状態を取得するためのgetterプロパティです。
 * - **状態の更新 (`update`)**: 継承先のクラスで状態を変更するためのprotectedメソッドです。
 * - **状態の監視 (`watch`)**: 状態の変化を監視するためのpublicメソッドです。
 * - **自動命名**: Notifierの名前は自動的にクラス名が設定されます。
 *
 * ## Properties
 * @property {T} state - 現在の状態を取得するためのgetterプロパティ。内部のProviderの値を返します。
 *
 * ## Methods
 * @constructor
 * Notifierクラスのコンストラクタです。
 * 内部で`Provider`を作成し、`build()`メソッドの戻り値を初期状態として設定します。
 * また、Providerの名前は自動的にクラス名が設定されます。
 *
 * @method build() - abstract
 * **必須実装メソッド**。継承先のクラスで実装する必要があります。
 * Notifierの初期状態を定義するメソッドです。
 * @returns {T} - 初期状態の値。
 *
 * @method update(updateFn: (value: T) => T) - protected
 * Notifierの状態を更新するためのメソッドです。
 * このメソッドが呼び出されると、`watch`で登録された全てのリスナーが新しい値で発火します。
 * 継承先のクラスでのみ使用可能です。
 * @param updateFn - 必須 現在の状態を引数として受け取り、新しい状態を返す関数。
 *
 * @method watch(listener: (value: T) => void)
 * このNotifierの状態が変更された際に実行されるリスナー（コールバック関数）を登録します。
 * @param listener - 必須 状態が変更されたときに実行される関数。変更後の新しい状態が引数として渡されます。
 *
 * ## Examples
 * @example
 * ```typescript
 * import { Notifier, assembleView, ElevatedButton, Text, Column, NotifierProvider } from 'ftuttes';
 *
 * // Counterの状態を定義
 * interface CounterState {
 *   count: number;
 * }
 *
 * // CounterNotifierクラスを実装
 * class CounterNotifier extends Notifier<CounterState> {
 *   protected build(): CounterState {
 *     return { count: 0 };
 *   }
 *
 *   // カウントを増加させるメソッド
 *   increment(): void {
 *     this.update(state => ({ count: state.count + 1 }));
 *   }
 *
 *   // カウントを減少させるメソッド
 *   decrement(): void {
 *     this.update(state => ({ count: state.count - 1 }));
 *   }
 *
 *   // カウントをリセットするメソッド
 *   reset(): void {
 *     this.update(state => ({ count: 0 }));
 *   }
 * }
 *
 * // NotifierProviderを作成
 * const counterProvider = new NotifierProvider(() => new CounterNotifier());
 *
 * // UIを構築
 * assembleView(new Column({
 *   children: [
 *     new LimitedProviderScope({
 *       providers: [counterProvider],
 *       builder: ([counter]) => new Text({
 *         text: `Count: ${counter.state.count}`,
 *         textCSS: new TextCSS({ fontCSS: new FontCSS({ fontSize: "24px" }) })
 *       })
 *     }),
 *     new ElevatedButton({
 *       text: "Increment",
 *       onClick: () => counterProvider.notifier.increment()
 *     }),
 *     new ElevatedButton({
 *       text: "Decrement", 
 *       onClick: () => counterProvider.notifier.decrement()
 *     }),
 *     new ElevatedButton({
 *       text: "Reset",
 *       onClick: () => counterProvider.notifier.reset()
 *     })
 *   ]
 * }));
 * ```
 *
 * 複雑な状態管理の例
 * @example
 * ```typescript
 * import { Notifier, NotifierProvider } from 'ftuttes';
 *
 * // Todoアイテムの型定義
 * interface TodoItem {
 *   id: string;
 *   text: string;
 *   completed: boolean;
 * }
 *
 * // TodoListの状態を定義
 * interface TodoListState {
 *   todos: TodoItem[];
 *   filter: 'all' | 'active' | 'completed';
 * }
 *
 * // TodoListNotifierクラスを実装
 * class TodoListNotifier extends Notifier<TodoListState> {
 *   protected build(): TodoListState {
 *     return {
 *       todos: [],
 *       filter: 'all'
 *     };
 *   }
 *
 *   // 新しいTodoを追加
 *   addTodo(text: string): void {
 *     this.update(state => ({
 *       ...state,
 *       todos: [...state.todos, {
 *         id: Date.now().toString(),
 *         text: text,
 *         completed: false
 *       }]
 *     }));
 *   }
 *
 *   // Todoの完了状態を切り替え
 *   toggleTodo(id: string): void {
 *     this.update(state => ({
 *       ...state,
 *       todos: state.todos.map(todo => 
 *         todo.id === id ? { ...todo, completed: !todo.completed } : todo
 *       )
 *     }));
 *   }
 *
 *   // Todoを削除
 *   deleteTodo(id: string): void {
 *     this.update(state => ({
 *       ...state,
 *       todos: state.todos.filter(todo => todo.id !== id)
 *     }));
 *   }
 *
 *   // フィルターを変更
 *   setFilter(filter: 'all' | 'active' | 'completed'): void {
 *     this.update(state => ({ ...state, filter }));
 *   }
 *
 *   // フィルターされたTodoリストを取得
 *   get filteredTodos(): TodoItem[] {
 *     const { todos, filter } = this.state;
 *     switch (filter) {
 *       case 'active':
 *         return todos.filter(todo => !todo.completed);
 *       case 'completed':
 *         return todos.filter(todo => todo.completed);
 *       default:
 *         return todos;
 *     }
 *   }
 * }
 *
 * // NotifierProviderを作成
 * const todoProvider = new NotifierProvider(() => new TodoListNotifier());
 *
 * // 使用例
 * todoProvider.notifier.addTodo("Learn fTuttes");
 * todoProvider.notifier.addTodo("Build awesome app");
 * todoProvider.notifier.toggleTodo("1");
 * console.log(todoProvider.notifier.filteredTodos);
 * ```
 */
export abstract class Notifier<T> {
    private readonly provider: Provider<T>;
    
    /**
     * 現在の状態を取得するためのgetterプロパティ
     * @returns {T} - 現在の状態の値
     */
    get state(): T {
        return this.provider.read();
    }

    constructor() {
        this.provider = Provider.createProvider<T>(() => {
            return this.build();
        }, `${this.constructor.name}`);
    }

    /**
     * Notifierの初期状態を定義する抽象メソッド
     * 継承先のクラスで必ず実装する必要があります
     * @returns {T} - 初期状態の値
     */
    protected abstract build(): T;

    /**
     * Notifierの状態を更新するためのメソッド
     * 継承先のクラスでのみ使用可能です
     * @param updateFn - 現在の状態を引数として受け取り、新しい状態を返す関数
     */
    protected update(updateFn: (value: T) => T): void {
        this.provider.update(updateFn);
    }

    /**
     * このNotifierの状態が変更された際に実行されるリスナーを登録します
     * @param listener - 状態が変更されたときに実行される関数
     */
    public watch(listener: (value: T) => void): void {
        this.provider.watch(listener);
    }
}

/**
 * NotifierProviderクラス
 * ## Overview
 * fTutteSフレームワークにおける`Notifier`と`Provider`を橋渡しする役割を担うクラスです。
 * `Notifier`インスタンスをラップして、フレームワークの状態管理システムに統合します。
 * `Provider`を継承しているため、`LimitedProviderScope`などのUI構築システムと連携できます。
 *
 * ## Key Concepts
 * - **Notifierの管理**: `Notifier`インスタンスを内部で保持し、その状態変化を監視します。
 * - **自動更新**: `Notifier`の状態が変更されると、自動的に`Provider`のリスナーにも通知されます。
 * - **直接インスタンス化**: `Provider.createProvider()`ではなく、`new`キーワードで直接インスタンス化します。
 * - **ログ無効化**: 内部的に`ProviderObserver`のログ機能を無効化して、不要なログ出力を防ぎます。
 *
 * ## Properties
 * @property {NotifierT} notifier - 管理対象の`Notifier`インスタンス。読み取り専用です。
 *
 * ## Methods
 * @constructor
 * NotifierProviderクラスのコンストラクタです。
 * `Notifier`インスタンスを作成するファクトリ関数を受け取り、そのインスタンスを管理します。
 * また、`Notifier`の状態変化を監視して、`Provider`のリスナーに自動的に通知するように設定します。
 * @param createFn - 必須 `Notifier`インスタンスを作成して返す関数。
 *
 * @static
 * @method createProvider() - override
 * **使用禁止メソッド**。このメソッドは意図的にエラーを投げるようにオーバーライドされています。
 * `NotifierProvider`は`Provider.createProvider()`ではなく、直接インスタンス化してください。
 * @throws {Error} - 呼び出された場合、適切なインスタンス化方法を示すエラーメッセージを投げます。
 *
 * @method read() - override
 * `Notifier`インスタンス自体を返します。
 * 通常の`Provider`とは異なり、`Notifier`の状態値ではなく、`Notifier`インスタンス自体を返すことに注意してください。
 * @returns {NotifierT} - 管理している`Notifier`インスタンス。
 *
 * ## Examples
 * @example
 * ```typescript
 * import { Notifier, NotifierProvider, assembleView, Text, Column, LimitedProviderScope } from 'ftuttes';
 *
 * // Notifierクラスを定義
 * class UserNotifier extends Notifier<{ name: string; age: number }> {
 *   protected build() {
 *     return { name: "Alice", age: 30 };
 *   }
 *
 *   updateName(newName: string): void {
 *     this.update(state => ({ ...state, name: newName }));
 *   }
 *
 *   incrementAge(): void {
 *     this.update(state => ({ ...state, age: state.age + 1 }));
 *   }
 * }
 *
 * // NotifierProviderを作成
 * const userProvider = new NotifierProvider(() => new UserNotifier());
 *
 * // UIで使用
 * assembleView(new Column({
 *   children: [
 *     new LimitedProviderScope({
 *       providers: [userProvider],
 *       builder: ([user]) => new Text({
 *         text: `Name: ${user.state.name}, Age: ${user.state.age}`
 *       })
 *     }),
 *     new ElevatedButton({
 *       text: "Change Name",
 *       onClick: () => userProvider.notifier.updateName("Bob")
 *     }),
 *     new ElevatedButton({
 *       text: "Increment Age",
 *       onClick: () => userProvider.notifier.incrementAge()
 *     })
 *   ]
 * }));
 * ```
 *
 * 複数のNotifierProviderを組み合わせた例
 * @example
 * ```typescript
 * import { Notifier, NotifierProvider, assembleView, Text, Column, LimitedProviderScope } from 'ftuttes';
 *
 * // アプリケーションの設定を管理するNotifier
 * class SettingsNotifier extends Notifier<{ theme: 'light' | 'dark'; language: string }> {
 *   protected build() {
 *     return { theme: 'light', language: 'en' };
 *   }
 *
 *   toggleTheme(): void {
 *     this.update(state => ({
 *       ...state,
 *       theme: state.theme === 'light' ? 'dark' : 'light'
 *     }));
 *   }
 *
 *   setLanguage(language: string): void {
 *     this.update(state => ({ ...state, language }));
 *   }
 * }
 *
 * // ユーザー情報を管理するNotifier
 * class UserProfileNotifier extends Notifier<{ name: string; email: string }> {
 *   protected build() {
 *     return { name: "", email: "" };
 *   }
 *
 *   updateProfile(name: string, email: string): void {
 *     this.update(state => ({ ...state, name, email }));
 *   }
 * }
 *
 * // 各NotifierProviderを作成
 * const settingsProvider = new NotifierProvider(() => new SettingsNotifier());
 * const userProfileProvider = new NotifierProvider(() => new UserProfileNotifier());
 *
 * // 複数のProviderを組み合わせてUIを構築
 * assembleView(new Column({
 *   children: [
 *     new LimitedProviderScope({
 *       providers: [settingsProvider, userProfileProvider],
 *       builder: ([settings, userProfile]) => new Column({
 *         children: [
 *           new Text({
 *             text: `Theme: ${settings.state.theme}, Language: ${settings.state.language}`
 *           }),
 *           new Text({
 *             text: `User: ${userProfile.state.name} (${userProfile.state.email})`
 *           })
 *         ]
 *       })
 *     }),
 *     new ElevatedButton({
 *       text: "Toggle Theme",
 *       onClick: () => settingsProvider.notifier.toggleTheme()
 *     }),
 *     new ElevatedButton({
 *       text: "Update Profile",
 *       onClick: () => userProfileProvider.notifier.updateProfile("John Doe", "john@example.com")
 *     })
 *   ]
 * }));
 * ```
 */
export class NotifierProvider<NotifierT extends Notifier<T>, T> extends Provider<NotifierT> {
    /**
     * 管理対象のNotifierインスタンス
     * 読み取り専用プロパティです
     */
    public readonly notifier: NotifierT;

    constructor(createFn: () => NotifierT){
        super(createFn);
        this.notifier = createFn();

        this.setIsActivedLog(false);

        this.notifier.watch(() => {
            this.update((currentValue) => {
                return currentValue;
            });
            this.notifyListeners(this.read());
        });
    }

    /**
     * createProviderメソッドをオーバーライドして使用を禁止
     * NotifierProviderは直接インスタンス化してください
     * @throws {Error} - 呼び出された場合、適切なインスタンス化方法を示すエラーメッセージを投げます
     */
    static override createProvider<T>(createFn: (ref: { read: <T>(otherProvider: Provider<T>) => T; update: (updateFn: (currentValue: any) => any) => void; watch: <T>(otherProvider: Provider<T>, updateFn: (parentValue: T, currentValue: any) => any) => void; }) => T, name?: string | null): Provider<T> {
        throw new Error(`${this.constructor.name}はcreateProviderからではなく、直接インスタンス化してください。`);
    }

    /**
     * Notifierインスタンス自体を返します
     * 通常のProviderとは異なり、Notifierの状態値ではなく、Notifierインスタンス自体を返します
     * @returns {NotifierT} - 管理しているNotifierインスタンス
     */
    override read(): NotifierT {
        this._core.value = this.notifier;
        return this.notifier;
    }
}
