import { View } from "../../core/interface/view";

interface ShrinkProps {
    child: View;
}

export class Shrink extends View {
    constructor(protected props: ShrinkProps) {
        super();
    }

    createWrapView(): HTMLElement {
        return document.createElement("div");
    }

    styledView(element: HTMLElement): HTMLElement {
        element.style.width = "0px";
        element.style.height = "0px";
        element.style.overflow = "hidden";
        return element;
    }

    build(): View {
        return this.props.child;
    }
}
