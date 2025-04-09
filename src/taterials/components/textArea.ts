import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";

interface TextAreaProps {
    provider?: any;
    value?: string;
    placeholder?: string;
    maxLength?: number;
    rows?: number;
    cols?: number;
    wrap?: "soft" | "hard";
    spellcheck?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    baseCSS?: BaseCSS;
}

export class TextArea extends View {
    constructor(protected props: TextAreaProps) {
        super();
    }

    override createWrapView(): HTMLTextAreaElement {
        return document.createElement("textarea");
    }

    override styledView(element: HTMLTextAreaElement): HTMLTextAreaElement {
        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element) as HTMLTextAreaElement;

        if(this.props.value) element.value = this.props.value;
        if(this.props.placeholder) element.placeholder = this.props.placeholder;

        if (this.props.maxLength) element.maxLength = this.props.maxLength;
        if (this.props.rows) element.rows = this.props.rows;
        if (this.props.cols) element.cols = this.props.cols;

        if(this.props.wrap) element.wrap = this.props.wrap;
        if(this.props.spellcheck) element.spellcheck = this.props.spellcheck;
        if(this.props.readonly) element.readOnly = this.props.readonly;
        if(this.props.disabled) element.disabled = this.props.disabled;

        return element;
    }

    override embedScriptToView(element: HTMLTextAreaElement): HTMLTextAreaElement {
        element.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLTextAreaElement;
            const currentValue = target.value;
            this.updateProvider(currentValue);
        });

        return element;
    }

    private updateProvider(value: string): void {
        if (!this.props.provider) return;

        this.props.provider.update(() => {
            return value;
        });
    }
}
