import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";

interface TextFormProps {
    provider?: any;
    minLength?: number;
    maxLength?: number;
    value?: string;
    placeholder?: string;
    required?: string;
    pattern?: string;
    baseCSS?: BaseCSS;
}

export class TextForm extends View {
    constructor(protected props: TextFormProps) {
        super();
    }

    override createWrapView(): HTMLInputElement {
        const textForm = document.createElement("input");
        textForm.type = "text";
        return textForm;
    }

    override styledView(element: HTMLInputElement): HTMLInputElement {
        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element) as HTMLInputElement;

        element.value = this.props.value || '';
        if(this.props.placeholder) element.placeholder = this.props.placeholder;
        if (this.props.minLength) element.minLength = this.props.minLength;
        if (this.props.maxLength) element.maxLength = this.props.maxLength;
        element.required = this.props.required !== "";
        if(this.props.pattern) element.pattern = this.props.pattern;

        return element;
    }

    override embedScriptToView(element: HTMLInputElement): HTMLInputElement {
        element.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
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
