import { View } from "../../core/interface/view";

interface LinkProps {
    child: View;
    href: string;
    rel?: string;
    target?: string;
    isDownload?: boolean;
    isShownUnderline?: boolean;
}

export class Link extends View {
    constructor(protected props: LinkProps) {
        super();
    }

    createWrapView(): HTMLAnchorElement {
        return document.createElement("a");
    }

    styledView(element: HTMLAnchorElement): HTMLAnchorElement {
        element.href = this.props.href;
        if (this.props.isDownload) element.download = "download";

        if (this.props.rel) element.rel = this.props.rel;
        if (this.props.target) element.target = this.props.target;

        if (!this.props.isShownUnderline) {
            element.style.textDecoration = "none";
        }

        return element;
    }

    build(): View {
        return this.props.child;
    }
}
