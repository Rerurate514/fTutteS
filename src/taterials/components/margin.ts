import { View } from "../../core/interface/view";

interface MarginProps {
    child: View;
    all?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

export class Margin extends View {
    private margins;

    constructor(protected props: MarginProps) {
        const margins = {
            top: props.top ?? "0px",
            right: props.right ?? "0px",
            bottom: props.bottom ?? "0px",
            left: props.left ?? "0px"
        };

        if (props.all !== undefined) {
            Object.assign(margins, {
                top: props.all,
                right: props.all,
                bottom: props.all,
                left: props.all
            });
        }

        super();

        this.margins = margins;
    }

    createWrapView(): HTMLElement {
        return document.createElement("div");
    }

    styledView(element: HTMLElement): HTMLElement {
        element.style.marginTop = this.margins.top;
        element.style.marginRight = this.margins.right;
        element.style.marginBottom = this.margins.bottom;
        element.style.marginLeft = this.margins.left;

        return element;
    }

    build(): View {
        return this.props.child;
    }
}
