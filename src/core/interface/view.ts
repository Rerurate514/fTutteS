import { devMode } from "../logic/setupDevMode";
import { generateRandomColor } from "../logic/generateRamdomColor";
import { generateUUID } from "../logic/generateUUID";

/**
 * View抽象クラス
 * ## OverView
 * fTutteSフレームワークにおける全てのウィジェットの基底となる抽象クラスです。
 * UI要素の作成、スタイリング、スクリプトの埋め込み、そして子ウィジェットの構築と管理のための
 * コアなライフサイクルメソッドとロジックを提供します。
 * このクラスは直接インスタンス化することはできません。
 *
 * `devMode` が有効な場合、各 View のコンテナには、そのウィジェットの名前とランダムな背景色が追加され、
 * デバッグ時の視覚的な識別を助けます。
 *
 * ## Properties
 * @property {string} id - この View インスタンスに割り当てられた一意の UUID。
 * @property {HTMLElement} _view - この View のルートとなる HTMLElement。最終的な DOM 要素。
 * @property {HTMLElement} viewCache - スクリプトが埋め込まれた後の View の DOM 要素のキャッシュ。再ビルド時に使用されます。
 * @property {View | Array<View> | undefined} viewChild - この View が持つ子 View インスタンス（単一または配列）。
 * @property {HTMLElement} view - この View のルートとなる HTMLElement へのゲッター。
 *
 * ## Methods
 * @method constructor
 * `View` クラスは抽象クラスであるため、直接インスタンス化することはできません。
 * 継承したクラスのコンストラクタは、`super()` を呼び出す必要があります。
 *
 * @method assemble()
 * View のレンダリングプロセスを開始し、HTML 要素を構築します。
 * 以下のライフサイクルメソッドがこの順序で実行されます:
 * 1. `initialize()`
 * 2. `preBuild()`
 * 3. `build()`
 * 4. `postBuild()`
 * 5. `terminate()`
 * 6. `createWrapView()`, `styledView()`, `embedScriptToView()` (内部的に呼び出される)
 * 7. `assembleViewData()` (子 View の構築と DOM への追加)
 * @returns {HTMLElement} - 完全に組み立てられた View のルート HTMLElement。
 *
 * @method createWrapView()
 * **オーバーライド可**：この View のルートとなる HTMLElement を作成します。
 * 例えば、`document.createElement("div")` や `document.createElement("button")` などを返します。
 * @returns {HTMLElement} - View のラッパーとなる HTMLElement。
 *
 * @method styledView(element: HTMLElement)
 * **オーバーライド可**：`createWrapView` で作成された要素に CSS スタイルを適用します。
 * @param element - スタイルを適用する HTMLElement
 * @returns {HTMLElement} - スタイルが適用された HTMLElement。
 *
 * @method embedScriptToView(element: HTMLElement)
 * **オーバーライド可**：`styledView` でスタイルが適用された要素にイベントリスナーなどのスクリプトを埋め込みます。
 * @param element - スクリプトを埋め込む HTMLElement
 * @returns {HTMLElement} - スクリプトが埋め込まれた HTMLElement。
 * 
 * @method build()
 * **オーバーライド可**：このViewの子Viewを構築します。
 * Flutterの`build`メソッドのように、他のViewウィジェットを組み合わせてUIを定義します。
 * ここで返されたView群が、`createWrapView`で作成された要素の子要素として追加されます。
 * @returns {View | Array<View> | undefined} - 子Viewのインスタンス、またはその配列。子がない場合は`undefined`。
 *
 * @method rebuild()
 * このViewとその子孫Viewを再構築します。
 * 主に`ProviderScope`や`LimitedProviderScope`によって、状態の変化に応じてUIを更新するために使用されます。
 * `initialize()`と`terminate()`以外のライフサイクルメソッドが再実行されます。
 *
 * @method assembleComplete()
 * Viewの初回レンダリングまたは再ビルドが完了し、DOMに完全に配置された後に、子孫Viewの`assembleComplete()`と
 * `onAssembleComplete()`を再帰的に呼び出します。
 *
 * @method onAssembleComplete()
 * **オーバーライド可**：Viewのビルドが終了し、完全にレンダリングされた後に実行されるコールバック関数。
 * DOM要素が完全に利用可能になった後に行いたい処理を記述します。
 *
 * @method preBuild()
 * **オーバーライド可**：`build()`メソッドの実行前、および`rebuild()`時に実行されるコールバック関数。
 * `build`でUIを構築する前の準備処理などに利用できます。
 *
 * @method postBuild()
 * **オーバーライド可**：`build()`メソッドの実行後、および`rebuild()`時に実行されるコールバック関数。
 * `build`でUIが構築された後の追加処理などに利用できます。
 *
 * @method initialize()
 * **オーバーライド可**：`assemble()`の最初のステップで、`rebuild()`時には実行されない初回限定のコールバック関数。
 * Viewの初期化処理を記述します。
 *
 * @method terminate()
 * **オーバーライド可**：`assemble()`の最終ステップで、`rebuild()`時には実行されない初回限定のコールバック関数。
 * Viewの初期構築の終了処理を記述します。
 *
 * @method onDispose()
 * **オーバーライド可**：Viewが完全に破棄される直前に実行されるコールバック関数。
 * イベントリスナーの解除やリソースのクリーンアップなど、ViewがDOMから削除される際に行いたい処理を記述します。
 *
 * ## Internal Methods (通常はオーバーライド不要)
 * - `generateTestNode(view: HTMLElement)`: `devMode`が有効な場合にデバッグ用の視覚的インジケーターを追加します。
 * - `assembleWrapView()`: `createWrapView`, `styledView`, `embedScriptToView`を統合してラッパーViewを組み立てます。
 * - `checkHTMLElement(child: any, msg: string)`: 指定された要素が`HTMLElement`のインスタンスであるか検証します。
 * - `dispose()`: Viewとその子孫Viewを再帰的に破棄し、`onDispose()`を呼び出します。
 * - `assembleViewData(child: Array<View> | View | undefined, embededView: HTMLElement)`: 子Viewを組み立て、親ViewのDOMに追加します。
 * - `assembleSingleView(child: View, embededView: HTMLElement)`: 単一の子Viewを組み立てて追加します。
 * - `assembleMultiView(children: Array<View>, embededView: HTMLElement)`: 複数の子Viewを組み立てて追加します。
 * - `attributeId()`: ルートViewにユニークなIDを設定します。
 * - `attributeViewNameToDataset()`: ルートViewのデータセットにViewクラス名を設定します。
 * 
 * ## Examples
 * 抽象 View クラスを継承してカスタムウィジェットを作成する例
 * @example
 * ```typescript
 * class MyCustomView extends View {
 *   constructor(private message: string) {
 *     super();
 *   }
 *
 *   override createWrapView(): HTMLElement {
 *     const div = document.createElement("div");
 *     return div;
 *   }
 *
 *   override styledView(element: HTMLElement): HTMLElement {
 *     element.style.border = "1px solid blue";
 *     element.style.padding = "10px";
 *     element.style.backgroundColor = "#e6f7ff";
 *     return element;
 *   }
 *
 *   override embedScriptToView(element: HTMLElement): HTMLElement {
 *     element.addEventListener("click", () => {
 *       alert(`Message: ${this.message}`);
 *     });
 *     return element;
 *   }
 *
 *   override build(): View {
 *     return new Text({
 *       textCSS: new TextCSS({
 *         fontCSS: new FontCSS({
 *           color: "darkblue",
 *           fontWeight: "bold"
 *         })
 *       }),
 *       text: this.message
 *     });
 *   }
 * }
 * ```
 *
 * 最小限の設定
 * @example
 * ```typescript
 * new MyCustomView("Hello, fTutteS Custom View!");
 * ```
 */

export class View {
    protected id: string = generateUUID();
    protected _view: HTMLElement = document.createElement("div");
    protected viewCache: HTMLElement = document.createElement("div");
    protected viewChild: View | Array<View> | undefined;
    get view(): HTMLElement {
        return this._view;
    }

    constructor() {
        if (this.constructor === View) {
            throw new TypeError("このクラスをインスタンス化しないでください。");
        }
    }

    assemble(): HTMLElement{
        this.initialize();
        this.preBuild();
        this.viewChild = this.build();
        this.postBuild();
        this.terminate();
        
        let view: HTMLElement = this.assembleWrapView();
        if(devMode) view = this.generateTestNode(view);
        this.viewCache = this.embedScriptToView(view.cloneNode(true) as HTMLElement);
        
        this.assembleViewData(this.viewChild, this.viewCache);

        return this.view;
    }

    /**
     * createWrapViewをオーバーライドしてViewのコンテナを設定してください
     * @returns HTMLElement
     */
    createWrapView(): HTMLElement {
        return document.createElement("div");
    }

    /**
     * @param {HTMLElenment} element
     * 
     * ここで引数にスタイルを設定してください
     */
    styledView(element: HTMLElement): HTMLElement {
        return element;
    }

    /**
     * @param {HTMLElenment} element
     * 
     * ここでスクリプトを埋め込んでください
     */
    embedScriptToView(element: HTMLElement): HTMLElement {
        return element;
    }

    private generateTestNode(view: HTMLElement): HTMLElement{
        let text = view.textContent;
        view.textContent = "";

        let color = generateRandomColor();

        let elementNameDiv = document.createElement("div");
        elementNameDiv.style.background = color;
        elementNameDiv.textContent = this.constructor.name;

        view.style.background = color;

        view.appendChild(elementNameDiv);
        if(elementNameDiv) view.appendChild(document.createTextNode(text ?? ""));

        return view;
    }

    private assembleWrapView(): HTMLElement {
        let wrapView = this.createWrapView();
        this.checkHTMLElement(wrapView, "createWrapView");

        let styledView = this.styledView(wrapView);
        this.checkHTMLElement(styledView, "styledView");

        let embededView = this.embedScriptToView(styledView);
        this.checkHTMLElement(embededView, "embedScriptToView");

        return embededView;
    }

    /**
     * Description placeholder
     *
     * @param {*} child 
     * @param {*} msg 
     */
    private checkHTMLElement(child: any, msg: string) {
        if (!(child instanceof HTMLElement)) {
            throw new TypeError(msg + "must contain an HTMLElenment object. Type passed:" + typeof child);
        }
    }

    /**
     * @returns {View}
     * 
     * buildメソッドでは、FlutterのようにViewを組み合わせてレンダリングすることができます。
     * ただし、その場合はcreateWrapViewで作成されたelementがそのViewのトップレベルです。
     * つまり、ここに書いたView群がcreateWrapViewで作成されたelementの子要素になるということです。
     */
    build(): View | Array<View> |undefined {
        return undefined;
    }

    /**
     * Description placeholder
     */
    rebuild() {
        this.preBuild();

        let thisView = document.getElementById(`${this._view.id}`);
        if (thisView == null) return;

        this.viewChild = this.build();

        this.assembleViewData(this.viewChild, this.viewCache);

        while (thisView.firstChild) {
            thisView.removeChild(thisView.firstChild);
        }

        if(this.viewChild instanceof View){
            thisView.appendChild(this.viewChild.view);
        }
        else if (this.viewChild instanceof Array) {
            this.viewChild.forEach((child) => {
                thisView.appendChild(child.view);
            });
        }
        

        this.postBuild();
        this.assembleComplete()
    }

    assembleComplete() {
        if (this.viewChild instanceof View) {
            this.viewChild.assembleComplete();
            this.viewChild.onAssembleComplete();
        } else if (this.viewChild instanceof Array) {
            this.viewChild.forEach(child => {
                if (child) {
                    child.assembleComplete();
                    child.onAssembleComplete();
                }
            });
        }
    }

    /**
     * Viewのビルドが終了して、完全にレンダリングされた後に実行される関数
     */
    onAssembleComplete() {
        
    }

    /**
     * Build関数の実行前に実行される関数
     * さらにrebuild時にも実行される。
     */
    preBuild() {

    }

    /**
     * Build関数の実行後に実行される関数
     * さらにrebuild時にも実行される。
     */
    postBuild() {

    }

    /**
     * Build関数の実行前に実行される関数
     * rebuild時には実行されない。
     */
    initialize() {

    }

    /**
     * Build関数の実行後に実行される関数
     * rebuild時には実行されない。
     */
    terminate() {

    }

    /**
     * Viewの破棄時に実行される関数、またはViewが破棄されるときに実行される関数
     * Viewそのものを破棄する関数は_dispose関数にて実装されています。
     */
    onDispose() {

    }

    /**
     * Viewを完全に破棄する際に実行される関数
     * 基本的には状態管理辺りの処理で必要となるため実装
     * この関数はオーバーライド不可で、dispose時に処理が必要な場合はonDiseposeを使用してください。
     */
    private dispose() {
        if (this.viewChild instanceof View) this.viewChild.dispose();
        if (this.viewChild instanceof Array) {
            this.viewChild.forEach((child) => {
                child.dispose();
            });
        }

        this.onDispose();
    }

    private assembleViewData(child: Array<View> | View | undefined, embededView: HTMLElement) {
        if (child instanceof Array) {
            this.assembleMultiView(child, embededView);
        }
        else if(child instanceof View){
            this.assembleSingleView(child, embededView);
        }
        else{
            this._view = embededView;
        }

        this.attributeId();
        this.attributeViewNameToDataset();
    }

    private assembleSingleView(child: View, embededView: HTMLElement) {
        child.assemble();
        embededView.appendChild(child.view);
        this._view = embededView;
    }

    private assembleMultiView(children: Array<View>, embededView: HTMLElement) {
        children.forEach(child => {
            if (!child) return;
            child.assemble();
            embededView.appendChild(child.view);
        });
        this._view = embededView;
    }

    private attributeId() {
        this._view.id = this.id;
    }

    private attributeViewNameToDataset() {
        this._view.dataset.viewClassName = this.constructor.name;
    }
}
