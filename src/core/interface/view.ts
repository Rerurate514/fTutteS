import { generateUUID } from "../logic/generateUUID";

export class View {
    private id: string = generateUUID();

    private viewChild: View | Array<View> | undefined;

    protected _view: HTMLElement = document.createElement("div");
    get view(): HTMLElement {
        return this._view;
    }

    protected viewCache: HTMLElement = document.createElement("div");

    constructor() {
        if (this.constructor === View) {
            throw new TypeError("このクラスをインスタンス化しないでください。");
        }
    }

    assemble(): HTMLElement{
        this._assembleChild();

        this.initialize();
        this.preBuild();
        this.viewChild = this.build();
        this.postBuild();
        this.terminate();

        let view: HTMLElement = this._assembleWrapView();
        this.viewCache = view.cloneNode(true) as HTMLElement;
        
        this._inputViewData(this.viewChild, this.viewCache.cloneNode(true) as HTMLElement);
        
        return this._view;
    }

    _assembleChild(){
        if(this.viewChild instanceof View){
            this.viewChild.assemble();
            
        }
        else if(this.viewChild instanceof Array){
            this.viewChild.forEach(child => {
                if (!child) return;
                child.assemble();
            });
        }
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

    _assembleWrapView(): HTMLElement {
        let wrapView = this.createWrapView();
        this._checkHTMLElement(wrapView, "createWrapView");

        let styledView = this.styledView(wrapView);
        this._checkHTMLElement(styledView, "styledView");

        let embededView = this.embedScriptToView(styledView);
        this._checkHTMLElement(embededView, "embedScriptToView");

        return embededView;
    }

    /**
     * Description placeholder
     *
     * @param {*} child 
     * @param {*} msg 
     */
    _checkHTMLElement(child: any, msg: string) {
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

        this._inputViewData(this.build(), this.viewCache.cloneNode(true)  as HTMLElement);
        thisView.replaceWith(this._view);

        this.postBuild();
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
    _dispose() {
        if (this.viewChild instanceof View) this.viewChild._dispose();
        if (this.viewChild instanceof Array) {
            this.viewChild.forEach((child) => {
                child._dispose();
            });
        }

        this.onDispose();
    }

    _inputViewData(child: Array<View> | View | undefined, embededView: HTMLElement) {
        if (child instanceof Array) {
            this._inputMultiView(child, embededView);
        }
        else if(child instanceof View){
            this._inputSingleView(child, embededView);
        }
        else{
            this._view = embededView;
        }

        this._attributeId();
        this._attributeViewNameToDataset();
    }

    _inputSingleView(child: View, embededView: HTMLElement) {
        this._view.appendChild(child._view);
        this._view = embededView;
    }

    _inputMultiView(child: Array<View>, embededView: HTMLElement) {
        child.forEach(child => {
            if (!child) return;
            this._view.appendChild(child._view);
        });
        this._view = embededView;
    }

    _attributeId() {
        this._view.id = this.id;
    }

    _attributeViewNameToDataset() {
        this._view.dataset.viewClassName = this.constructor.name;
    }
}
