import { View } from "../../core/interface/view";

interface PaddingProps {
    child: View;
    all?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

export class Padding extends View {
    private paddings;

    constructor(protected props: PaddingProps) {
        const paddings = {
            top: props.top ?? "0px",
            right: props.right ?? "0px",
            bottom: props.bottom ?? "0px",
            left: props.left ?? "0px"
        };

        if (props.all !== undefined) {
            Object.assign(paddings, {
                top: props.all,
                right: props.all,
                bottom: props.all,
                left: props.all
            });
        }

        super();
        this.paddings = paddings;
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.paddingTop = this.paddings.top;
        element.style.paddingRight = this.paddings.right;
        element.style.paddingBottom = this.paddings.bottom;
        element.style.paddingLeft = this.paddings.left;

        return element;
    }

    override build(): View {
        return this.props.child;
    }
}
