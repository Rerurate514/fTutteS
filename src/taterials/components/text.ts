import { View } from "../../core/interface/view";
import { TextCSS } from "../../cssKit/textCSS";

interface TextProps {
    text: string;
    textCSS?: TextCSS;
}

export class Text extends View {
    constructor(protected props: TextProps) {
        super();
    }

    override createWrapView(): HTMLElement {
        return document.createElement("p");
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.textContent = this.props.text;
        element.style.margin = "0";

        element = (this.props.textCSS || new TextCSS()).applyCSS(element) 

        //if(this.props.textCSS.webkitCSS) element = this.props.textCSS.webkitCSS.applyCSS(element);

        return element;
    }
}
