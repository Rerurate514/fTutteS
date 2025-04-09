import { View } from "../../core/interface/view";
import { Column } from "./column";
import { Header } from "./header";

interface ScaffoldProps {
    child: View;
    header?: Header;
    footer?: View;
    drawer?: View;
    floatingActionButton?: View;
}

export class Scaffold extends View {
    constructor(protected props: ScaffoldProps) {
        if (props.header && !(props.header instanceof Header)) {
            throw new TypeError("Scaffold header property must be an instance of Header class");
        }
        super();
    }

    createWrapView(): HTMLElement {
        return document.createElement("div");
    }

    styledView(element: HTMLElement): HTMLElement {
        element.style.width = "100%";
        element.style.height = "100%";
        return element;
    }

    build(): View {
        const children = [];
        
        if (this.props.header) children.push(this.props.header);
        
        children.push(this.props.child);
        
        if (this.props.footer) children.push(this.props.footer);
        
        return new Column({
            children: children
        });
    }
}
