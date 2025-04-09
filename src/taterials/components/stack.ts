import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";

interface StackProps {
    children: Array<View>;
    baseCSS?: BaseCSS;
}

export class Stack extends View {
    constructor(protected props: StackProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.position = "relative";

        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element);

        return element;
    }

    override preBuild(): void {
        this.props.children.forEach((com: View) => {
            com.view.style.position = "absolute";
        });
    }

    override build(): View[] {
        return this.props.children;
    }
}
