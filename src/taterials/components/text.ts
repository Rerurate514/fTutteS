import { View, ViewProps } from "../../core/interface/view";
import { TextCSS } from "../../cssKit/textCSS";

type TextProps = ViewProps & {
    text: string,
    textCSS: TextCSS
}

export class Text extends View<TextProps>{
    constructor(
        text: string, 
        textCSS: TextCSS = new TextCSS(),
    ){
        super({text, textCSS});
    }

    createWrapView(): HTMLElement{
        return document.createElement("p");
    }

    styledView(element: HTMLElement): HTMLElement {
        element.textContent = this.props.text;
        element.style.margin = "0";

        element = this.props.textCSS.applyCSS(element);

        //if(this.props.textCSS.webkitCSS) element = this.props.textCSS.webkitCSS.applyCSS(element);
        
        return element;
    }
}
