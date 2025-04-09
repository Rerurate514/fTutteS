import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";
import { Center } from "./center";
import { Hover } from "./hover";

interface ButtonProps {
    child: View;
    radius?: string;
    baseCSS?: BaseCSS;
    onClick?: () => void;
}

export class ElevatedButton extends View {
    constructor(protected props: ButtonProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        if(this.props.radius) element.style.borderRadius = this.props.radius;
        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element);
        
        return element;
    }

    override embedScriptToView(element: HTMLElement): HTMLElement {
        if(this.props.onClick) element.addEventListener("click", this.props.onClick);
        
        return element;
    }

    override build(): View {
        return new Center({
            child: new Hover({
                radius: this.props.radius,
                onClickEffect: true,
                child: new _ElevatedButton(this.props)
            })
        });
    }
}

interface _ElevatedButtonProps {
    child: View;
    onClick?: () => void;
}

export class _ElevatedButton extends View {
    constructor(protected props: _ElevatedButtonProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.borderRadius = "inherit";
        return element;
    }

    override embedScriptToView(element: HTMLElement): HTMLElement {
        return element;
    }

    override build(): View {
        return this.props.child;
    }
}
