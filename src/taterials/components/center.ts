import { View } from "../../core/interface/view";

interface CenterProps {
    child: View;
}

export class Center extends View {
    constructor(protected props: CenterProps) {
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
        return new _Center({
            child: this.props.child
        });
    }
}

interface _CenterProps {
    child: View;
}

export class _Center extends View {
    constructor(protected props: _CenterProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.width = "fit-content";
        element.style.height = "fit-content";
        element.style.margin = "auto";
        element.style.borderRadius = "inherit";
        return element;
    }

    override build(): View {
        return this.props.child;
    }
}
