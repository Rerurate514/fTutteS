import { View } from "../../core/interface/view";
import { TextCSS } from "../../cssKit/textCSS";

interface TextProps {
    text: string;
    textCSS?: TextCSS;
}

export class Text extends View {
    protected text: string;
    protected textCSS: TextCSS;

    constructor(props: TextProps) {
        super();
        this.text = props.text;
        this.textCSS = props.textCSS || new TextCSS();
    }

    override createWrapView(): HTMLElement {
        return document.createElement("p");
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.textContent = this.text;
        element.style.margin = "0";

        element = this.textCSS.applyCSS(element);

        //if(this.props.textCSS.webkitCSS) element = this.props.textCSS.webkitCSS.applyCSS(element);

        return element;
    }
}
