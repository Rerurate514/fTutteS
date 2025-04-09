import { BorderCSS } from "./borderCSS";

interface BaseCSSProperties {
    width?: string;
    height?: string;
    margin?: string;
    padding?: string;
    borderCSS?: BorderCSS;
}

export class BaseCSS {
    constructor(private properties: BaseCSSProperties){ }

    applyCSS(element: HTMLElement): HTMLElement {
        if (this.properties.width) element.style.width = this.properties.width;
        if (this.properties.height) element.style.height = this.properties.height;
        if (this.properties.margin) element.style.margin = this.properties.margin;
        if (this.properties.padding) element.style.padding = this.properties.padding;
        if (this.properties.borderCSS) element = this.properties.borderCSS.applyCSS(element);

        return element;
    }

    get width(): string | undefined {
        return this.properties.width;
    }

    get height(): string | undefined {
        return this.properties.height;
    }

    get margin(): string | undefined {
        return this.properties.margin;
    }

    get padding(): string | undefined {
        return this.properties.padding;
    }

    get borderCSS(): BorderCSS | undefined {
        return this.properties.borderCSS;
    }

    get assembledBorder(): string | undefined {
        return this.properties.borderCSS?.assembleCSS();
    }
}
