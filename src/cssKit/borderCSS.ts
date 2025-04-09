interface BorderCSSProperties {
    borderSize?: string;
    borderProperty?: string;
    color?: string;
    radius?: string;
    isTop?: boolean;
    isLeft?: boolean;
    isRight?: boolean;
    isBottom?: boolean;
}

export class BorderCSS {
    constructor(private properties: BorderCSSProperties = {}){ }

    assembleCSS(): string {
        return `${this.properties.borderSize} ${this.properties.borderProperty} ${this.properties.color}`;
    }

    applyCSS(element: HTMLElement): HTMLElement {
        const borderValue = this.assembleCSS();
        
        if (this.properties.isTop) element.style.borderTop = borderValue;
        if (this.properties.isRight) element.style.borderRight = borderValue;
        if (this.properties.isBottom) element.style.borderBottom = borderValue;
        if (this.properties.isLeft) element.style.borderLeft = borderValue;
        
        if (this.properties.radius) element.style.borderRadius = this.properties.radius;
        
        return element;
    }

    get borderSize(): string | undefined {
        return this.properties.borderSize;
    }

    get borderProperty(): string | undefined {
        return this.properties.borderProperty;
    }

    get color(): string | undefined {
        return this.properties.color;
    }

    get radius(): string | undefined {
        return this.properties.radius;
    }

    get isTop(): boolean | undefined {
        return this.properties.isTop;
    }

    get isLeft(): boolean | undefined {
        return this.properties.isLeft;
    }

    get isRight(): boolean | undefined {
        return this.properties.isRight;
    }

    get isBottom(): boolean | undefined {
        return this.properties.isBottom;
    }
}
