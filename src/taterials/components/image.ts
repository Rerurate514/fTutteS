import { View } from "../../core/interface/view";
import { BaseCSS } from "../../cssKit/baseCSS";

interface ImageProps {
    src: string;
    alt: string;
    title?: string;
    baseCSS?: BaseCSS;
    //webkitCSS: WebkitCSS;
}

export class Image extends View {
    constructor(protected props: ImageProps) {
        super();
    }

    override createWrapView(): HTMLImageElement {
        return document.createElement("img");
    }

    override styledView(element: HTMLImageElement): HTMLImageElement {
        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element) as HTMLImageElement;
        //if(this.props.webkitCSS) element = this.props.webkitCSS.applyCSS(element);

        element.src = this.props.src;
        element.alt = this.props.alt;
        if(this.props.title) element.title = this.props.title;

        return element;
    }
}
