interface FontCSSProperties {
    color: string | null;
    fontStyle: string | null;
    fontWeight: string | null;
    fontSize: string | null;
    lineHeight: string | null;
    fontFamily: string | null;
}

export class FontCSS {
    constructor(private properties: FontCSSProperties){ }

    applyCSS(element: HTMLElement): HTMLElement {
        if (this.properties.color) element.style.color = this.properties.color;
        if (this.properties.fontStyle) element.style.fontStyle = this.properties.fontStyle;
        if (this.properties.fontWeight) element.style.fontWeight = this.properties.fontWeight;
        if (this.properties.fontSize) element.style.fontSize = this.properties.fontSize;
        if (this.properties.lineHeight) element.style.lineHeight = this.properties.lineHeight;
        if (this.properties.fontFamily) element.style.fontFamily = this.properties.fontFamily;

        return element;
    }

    get color(): string | null {
        return this.properties.color;
    }

    get fontStyle(): string | null {
        return this.properties.fontStyle;
    }

    get fontWeight(): string | null {
        return this.properties.fontWeight;
    }

    get fontSize(): string | null {
        return this.properties.fontSize;
    }

    get lineHeight(): string | null {
        return this.properties.lineHeight;
    }

    get fontFamily(): string | null {
        return this.properties.fontFamily;
    }
}
