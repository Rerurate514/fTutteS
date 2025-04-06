export class BorderCSS {
    #properties: {
        borderSize: string;
        borderProperty: string;
        color: string;
        radius: string | null;
        isTop: boolean;
        isLeft: boolean;
        isRight: boolean;
        isBottom: boolean;
    };

    constructor({
        borderSize = "0px",
        borderProperty = "solid",
        color = "transparent",
        radius = null,
        isTop = true,
        isLeft = true,
        isRight = true,
        isBottom = true
    } = {}) {
        this.#properties = {
            borderSize,
            borderProperty,
            color,
            radius,
            isTop,
            isLeft,
            isRight,
            isBottom
        };
    }

    assembleCSS(): string {
        return `${this.#properties.borderSize} ${this.#properties.borderProperty} ${this.#properties.color}`;
    }

    applyCSS(element: HTMLElement): HTMLElement {
        const borderValue = this.assembleCSS();
        
        if (this.#properties.isTop) element.style.borderTop = borderValue;
        if (this.#properties.isRight) element.style.borderRight = borderValue;
        if (this.#properties.isBottom) element.style.borderBottom = borderValue;
        if (this.#properties.isLeft) element.style.borderLeft = borderValue;
        
        if (this.#properties.radius) element.style.borderRadius = this.#properties.radius;
        
        return element;
    }

    get borderSize(): string {
        return this.#properties.borderSize;
    }

    get borderProperty(): string {
        return this.#properties.borderProperty;
    }

    get color(): string {
        return this.#properties.color;
    }

    get radius(): string | null {
        return this.#properties.radius;
    }

    get isTop(): boolean {
        return this.#properties.isTop;
    }

    get isLeft(): boolean {
        return this.#properties.isLeft;
    }

    get isRight(): boolean {
        return this.#properties.isRight;
    }

    get isBottom(): boolean {
        return this.#properties.isBottom;
    }
}
