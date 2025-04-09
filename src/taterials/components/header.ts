import { View } from "../../core/interface/view";

interface HeaderProps {
    child: View;
    isStickyHeader?: boolean;
}

export class Header extends View {
    constructor(protected props: HeaderProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        if (this.props.isStickyHeader) {
            element.style.position = "sticky";
            element.style.top = "0";
        }
        
        element.style.zIndex = "999";
        
        return element;
    }

    override build(): View {
        return this.props.child;
    }
}
