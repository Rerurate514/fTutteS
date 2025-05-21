import { devMode } from "../logic/setupDevMode";
import { generateRandomColor } from "../logic/generateRamdomColor";
import { generateUUID } from "../logic/generateUUID";

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
     * 必ずこのcreateWrapViewをオーバーライドしてViewのコンテナを設定してください
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
