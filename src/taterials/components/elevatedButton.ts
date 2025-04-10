import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";
import { Center } from "./center";
import { Hover } from "./hover";
import { Padding } from "./padding";

interface ElevatedButtonProps {
    child: View;
    radius?: string;
    baseCSS?: BaseCSS;
    onClick?: () => void;
}

export class ElevatedButton extends View {
    constructor(protected props: ElevatedButtonProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        if(this.props.radius) element.style.borderRadius = this.props.radius;
        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element);
        
        element.style.padding = "0px";

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
                child: new Padding({
                    all: this.props.baseCSS?.padding ?? "initial",
                    child: new _ElevatedButton({
                        child: this.props.child,
                        baseCSS: this.props.baseCSS
                    })
                })
            })
        });
    }
}

interface _ElevatedButtonProps {
    child: View;
    baseCSS?: BaseCSS
}

export class _ElevatedButton extends View {
    constructor(protected props: _ElevatedButtonProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.borderRadius = "inherit";
        if(this.props.baseCSS?.width) element.style.width = this.props.baseCSS.width;
        if(this.props.baseCSS?.height) element.style.height = this.props.baseCSS.height;

        return element;
    }

    override build(): View {
        return this.props.child;
    }
}
