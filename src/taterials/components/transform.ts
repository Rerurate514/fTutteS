import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";

interface TransformProps {
    child: View;
    baseCSS?: BaseCSS;
    translateX?: number;
    translateY?: number;
    translateZ?: number;
    rotateX?: number;
    rotateY?: number;
    rotateZ?: number;
    scaleX?: number;
    scaleY?: number;
    scaleZ?: number;
    skewX?: number;
    skewY?: number;
}

export class Transform extends View {
    constructor(protected props: TransformProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element);
        element = this._applyTransformCSS(element);
        return element;
    }

    private _applyTransformCSS(element: HTMLElement): HTMLElement {
        const transforms: string[] = [];

        if (this.props.translateX !== 0 || this.props.translateY !== 0 || this.props.translateZ !== 0) {
            transforms.push(`translate3d(${this.props.translateX}px, ${this.props.translateY}px, ${this.props.translateZ}px)`);
        }

        if (this.props.rotateX !== 0) transforms.push(`rotateX(${this.props.rotateX}deg)`);
        if (this.props.rotateY !== 0) transforms.push(`rotateY(${this.props.rotateY}deg)`);
        if (this.props.rotateZ !== 0) transforms.push(`rotateZ(${this.props.rotateZ}deg)`);

        if (this.props.scaleX !== 1 || this.props.scaleY !== 1 || this.props.scaleZ !== 1) {
            transforms.push(`scale3d(${this.props.scaleX}, ${this.props.scaleY}, ${this.props.scaleZ})`);
        }

        if (this.props.skewX !== 0 || this.props.skewY !== 0) {
            transforms.push(`skew(${this.props.skewX}deg, ${this.props.skewY}deg)`);
        }

        if (transforms.length > 0) {
            element.style.transform = transforms.join(' ');
        }

        element.style.transformOrigin = 'center center';
        return element;
    }

    animate(properties: Partial<TransformProps>, duration: number = 500, easing: string = 'ease'): this {
        if (!this.view) return this;

        Object.assign(this.props, properties);
        this.view.style.transition = `transform ${duration}ms ${easing}`;

        this.view.addEventListener('transitionend', () => {
            this.view.style.transition = '';
            this._applyTransformCSS(this.view);
        }, { once: true });

        requestAnimationFrame(() => {
            this._applyTransformCSS(this.view);
        });

        return this;
    }

    override build(): View {
        return this.props.child;
    }
}
