import { BorderCSS } from "./borderCSS";

interface BaseCSSProperties {
    width: string | null;
    height: string | null;
    margin: string | null;
    padding: string | null;
    borderCSS: BorderCSS | null;
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

    get width(): string | null {
        return this.properties.width;
    }

    get height(): string | null {
        return this.properties.height;
    }

    get margin(): string | null {
        return this.properties.margin;
    }

    get padding(): string | null {
        return this.properties.padding;
    }

    get borderCSS(): BorderCSS | null {
        return this.properties.borderCSS;
    }

    // assembledBorderゲッターの修正
    get assembledBorder(): string | null {
        return this.properties.borderCSS?.assembleCSS() ?? null;
    }
}
