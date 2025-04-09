import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";

interface SliderProps {
    provider?: any;
    min?: number;
    max?: number;
    value?: number;
    step?: number;
    name?: string;
    onChange?: (value: string, element: HTMLInputElement, event: Event) => void;
    isDisplay?: boolean;
    baseCSS?: BaseCSS;
}

export class Slider extends View {
    constructor(protected props: Partial<SliderProps> = {}) {
        super();
    }

    override createWrapView(): HTMLInputElement {
        return document.createElement("input");
    }

    override styledView(element: HTMLInputElement): HTMLInputElement {
        element.type = "range";
        if(this.props.min) element.min = this.props.min.toString();
        if(this.props.max) element.max = this.props.max.toString();
        if(this.props.value) element.value = this.props.value.toString();
        if(this.props.step) element.step = this.props.step.toString();
        if(this.props.name) element.name = this.props.name;
        
        if (!this.props.isDisplay) {
            element.style.display = "none";
        }

        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element) as HTMLInputElement;

        return element;
    }

    override embedScriptToView(element: HTMLInputElement): HTMLInputElement {
        this._setEventListenerToSlider(element);
        return element;
    }

    private _setEventListenerToSlider(sliderElement: HTMLInputElement): void {
        sliderElement.addEventListener("input", (e: Event) => {   
            const target = e.target as HTMLInputElement;
            this.props.onChange?.(target.value, sliderElement, e);
            
            if (!this.props.provider) return;
            this.props.provider.update(() => {
                return target.value;
            });
        });
    }
}
