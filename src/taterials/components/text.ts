import { View } from "../../core/interface/view";
import { TextCSS } from "../../cssKit/textCSS";

export class Text extends View{
    constructor(
        protected text: string, 
        protected textCSS: TextCSS = new TextCSS(),
    ){
        super();
    }

    createWrapView(): HTMLElement{
        return document.createElement("p");
    }

    styledView(element: HTMLElement): HTMLElement {
        element.textContent = this.text;
        element.style.margin = "0";

        element = this.textCSS.applyCSS(element);

        //if(this.props.textCSS.webkitCSS) element = this.props.textCSS.webkitCSS.applyCSS(element);
        
        return element;
    }
}
