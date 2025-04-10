import { View } from "../../core/interface/view";
import { BaseCSS } from "../../cssKit/baseCSS";
import { ShadowLevels } from "../enums/shadowLevels";

interface CardProps {
    child: View;
    radius?: string;
    baseCSS?: BaseCSS;
    background?: string;
    elevation?: ShadowLevels;
    // webkitCSS?: WebkitCSS;
}

export class Card extends View {
    constructor(protected props: CardProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        if (this.props.radius) element.style.borderRadius = this.props.radius;
        if (this.props.background) element.style.background = this.props.background;
        if (this.props.elevation) element.style.boxShadow = this.props.elevation;

        if (this.props.baseCSS) element = this.props.baseCSS.applyCSS(element);
        // if(this.props.webkitCSS) element = this.props.webkitCSS.applyCSS(element);

        return element;
    }

    override build(): View {
        return this.props.child;
    }
}
