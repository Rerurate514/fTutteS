import { ProviderScope } from "../../tiperes/interface/providerScope";
import { Provider } from "../../tiperes/logic/provider";

interface RadioButtonProps {
    labelText: string;
    name?: string;
    checkedRadioButton?: (radioBtn: HTMLInputElement, event: Event) => void;
    providers?: Array<Provider<any>>;
    isDisplay?: boolean;
    isChecked?: boolean;
}

export class RadioButton extends ProviderScope{
    constructor(protected radioProps: RadioButtonProps) {
        const provs: Provider<any>[] = radioProps.providers ?? [];
        super({
            providers: provs
        });
    }

    override createWrapView(): HTMLLabelElement {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        label.appendChild(radio);
        const labelTextDiv = document.createTextNode(this.radioProps.labelText);
        label.appendChild(labelTextDiv);
        return label;
    }

    override styledView(element: HTMLLabelElement): HTMLLabelElement {
        const radioInput = element.firstElementChild as HTMLInputElement;
        radioInput.type = "radio";
        if (this.radioProps.name) radioInput.name = this.radioProps.name;
        if (!this.radioProps.isDisplay) radioInput.style.display = "none";
        if (this.radioProps.isChecked) radioInput.checked = this.radioProps.isChecked;
        return element;
    }

    override embedScriptToView(element: HTMLLabelElement): HTMLLabelElement {
        this._setEventListenerToRadioBtn(element);
        return element;
    }

    private _setEventListenerToRadioBtn(radioBtn: HTMLLabelElement): void {
        const radioInput = radioBtn.firstElementChild as HTMLInputElement;
        radioInput.addEventListener("change", (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (target.checked) {
                this.radioProps.checkedRadioButton?.(radioInput, e);
            }
        });
    }
}
