import { generateUUID } from "../logic/generateUUID";
import { ViewBase } from "./viewBase";

export class View extends ViewBase{
    protected viewChild: View | Array<View> | undefined;
    get view(): HTMLElement {
        return this._view;
    }

    constructor() {
        super();
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
        
        let view: HTMLElement = this._assembleWrapView();
        this.viewCache = this.embedScriptToView(view.cloneNode(true) as HTMLElement);
        
        this._assembleViewData(this.viewChild, this.viewCache);

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

        this._assembleViewData(this.build(), this.viewCache);
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

    _assembleViewData(child: Array<View> | View | undefined, embededView: HTMLElement) {
        if (child instanceof Array) {
            this._assembleMultiView(child, embededView);
        }
        else if(child instanceof View){
            this._assembleSingleView(child, embededView);
        }
        else{
            this._view = embededView;
        }

        this._attributeId();
        this._attributeViewNameToDataset();
    }

    _assembleSingleView(child: View, embededView: HTMLElement) {
        child.assemble();
        embededView.appendChild(child.view);
        this._view = embededView;
    }

    _assembleMultiView(children: Array<View>, embededView: HTMLElement) {
        children.forEach(child => {
            if (!child) return;
            child.assemble();
            embededView.appendChild(child.view);
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
