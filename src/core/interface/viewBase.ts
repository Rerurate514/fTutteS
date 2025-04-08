import { generateUUID } from "../logic/generateUUID";

export class ViewBase {
    protected id: string = generateUUID();
    protected _view: HTMLElement = document.createElement("div");
    protected viewCache: HTMLElement = document.createElement("div");
    
    constructor() {
        if (this.constructor === ViewBase) {
            throw new TypeError("このクラスをインスタンス化しないでください。");
        }
    }
}
