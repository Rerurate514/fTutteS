import { View } from "../../core/interface/view";

interface PositionProps {
    child: View;
    top?: number;
    left?: number;
}

interface _PositionChildProps {
    child: View;
    top: number;
    left: number;
}

export class Position extends View {
    constructor(protected props: PositionProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.className = "pos-wrapper";
        element.style.width = "100%";
        element.style.height = "100%";
        return element;
    }

    override build(): View {
        return new _PositionChild({
            child: this.props.child,
            top: this.props.top ?? 0,
            left: this.props.left ?? 0
        });
    }
}

class _PositionChild extends View {
    constructor(protected props: _PositionChildProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.className = "pos-wrapper";
        element.style.width = "100%";
        element.style.height = "100%";

        element.style.position = "relative";
        element.className = "pos";
        element.style.top = `${this.props.top}px`;
        element.style.left = `${this.props.left}px`;

        return element;
    }

    override build(): View {
        return this.props.child;
    }
}
