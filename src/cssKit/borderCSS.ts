interface BorderCSSProperties {
    borderSize: string | null;
    borderProperty: string | null;
    color: string | null;
    radius: string | null;
    isTop: boolean | null;
    isLeft: boolean | null;
    isRight: boolean | null;
    isBottom: boolean | null;
}

export class BorderCSS {
    constructor(private properties: BorderCSSProperties){ }

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

    get borderSize(): string | null {
        return this.properties.borderSize;
    }

    get borderProperty(): string | null {
        return this.properties.borderProperty;
    }

    get color(): string | null {
        return this.properties.color;
    }

    get radius(): string | null {
        return this.properties.radius;
    }

    get isTop(): boolean | null {
        return this.properties.isTop;
    }

    get isLeft(): boolean | null {
        return this.properties.isLeft;
    }

    get isRight(): boolean | null {
        return this.properties.isRight;
    }

    get isBottom(): boolean | null {
        return this.properties.isBottom;
    }
}
