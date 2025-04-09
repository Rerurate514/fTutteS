import { View } from "../../core/interface/view";

interface RelativePositionProps {
    child: View;
    relativePositions: {
        applyCSS: (element: HTMLElement) => HTMLElement;
    };
}

export class RelativePosition extends View {
    constructor(protected props: RelativePositionProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.width = "100%";
        element.style.height = "100%";

        element.style.textAlign = "center";
        element.style.justifyContent = "center";

        element.style.display = "flex";
        element.style.alignItems = "center";

        element.style.borderRadius = "inherit";

        return element;
    }

    override build(): View {
        return new _RelativePosition(this.props);
    }
}

interface _RelativePositionProps {
    child: View;
    relativePositions: {
        applyCSS: (element: HTMLElement) => HTMLElement;
    };
}

export class _RelativePosition extends View {
    constructor(protected props: _RelativePositionProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.width = "fit-content";
        element.style.height = "fit-content";

        element = this.props.relativePositions.applyCSS(element);

        element.style.borderRadius = "inherit";

        return element;
    }

    override  build(): View {
        return this.props.child;
    }
}
