import { View } from "../../core/interface/view";
import { BaseCSS } from "../../cssKit/baseCSS";

interface CardProps {
    child: View;
    radius: string;
    baseCSS: BaseCSS;
    background?: string;
    elevation: string;
    // webkitCSS?: WebkitCSS;
}

export class Card extends View {
    constructor(protected props: CardProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.borderRadius = this.props.radius;
        if (this.props.background) element.style.background = this.props.background;
        element.style.boxShadow = this.props.elevation;

        element = this.props.baseCSS.applyCSS(element);
        // if(this.props.webkitCSS) element = this.props.webkitCSS.applyCSS(element);

        return element;
    }

    override build(): View {
        return this.props.child;
    }
}
