interface FontCSSProperties {
    color?: string;
    fontStyle?: string;
    fontWeight?: string;
    fontSize?: string;
    lineHeight?: string;
    fontFamily?: string;
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

    get color(): string | undefined {
        return this.properties.color;
    }

    get fontStyle(): string | undefined {
        return this.properties.fontStyle;
    }

    get fontWeight(): string | undefined {
        return this.properties.fontWeight;
    }

    get fontSize(): string | undefined {
        return this.properties.fontSize;
    }

    get lineHeight(): string | undefined {
        return this.properties.lineHeight;
    }

    get fontFamily(): string | undefined {
        return this.properties.fontFamily;
    }
}
