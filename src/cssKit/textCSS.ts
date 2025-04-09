import { FontCSS } from "./fontCSS";

interface TextCSSProperties {
    fontCSS?: FontCSS;
    letterSpacing?: string;
    textAlign?: string;
    textAlignLast?: string;
    textIndent?: string;
    textTransform?: string;
    lineBreak?: string;
    textOverflow?: string;
    textWrap?: string;
    wordBreak?: string;
    textDecoration?: string;
    textEmphasis?: string;
    textShadow?: string;
    writingMode?: string;
    textCombineUpright?: string;
    textOrientation?: string;
    //webkitCSS?: WebkitCSS;
}

export class TextCSS {
    constructor(private properties: TextCSSProperties){}

    applyCSS(element: HTMLElement): HTMLElement {
        if (this.properties.letterSpacing) element.style.letterSpacing = this.properties.letterSpacing;
        if (this.properties.textAlign) element.style.textAlign = this.properties.textAlign;
        if (this.properties.textAlignLast) element.style.textAlignLast = this.properties.textAlignLast;
        if (this.properties.textIndent) element.style.textIndent = this.properties.textIndent;
        if (this.properties.textTransform) element.style.textTransform = this.properties.textTransform;
        if (this.properties.lineBreak) element.style.lineBreak = this.properties.lineBreak;
        if (this.properties.textOverflow) element.style.textOverflow = this.properties.textOverflow;
        if (this.properties.textWrap) element.style.textWrap = this.properties.textWrap;
        if (this.properties.wordBreak) element.style.wordBreak = this.properties.wordBreak;
        if (this.properties.textDecoration) element.style.textDecoration = this.properties.textDecoration;
        if (this.properties.textEmphasis) element.style.textEmphasis = this.properties.textEmphasis;
        if (this.properties.textShadow) element.style.textShadow = this.properties.textShadow;
        if (this.properties.writingMode) element.style.writingMode = this.properties.writingMode;
        if (this.properties.textCombineUpright) element.style.textCombineUpright = this.properties.textCombineUpright;
        if (this.properties.textOrientation) element.style.textOrientation = this.properties.textOrientation;

        if (this.properties.fontCSS) this.properties.fontCSS.applyCSS(element);
        //if (this.properties.webkitCSS) this.properties.webkitCSS.applyCSS(element);

        return element;
    }

    get fontCSS(): FontCSS | undefined {
        return this.properties.fontCSS;
    }

    get letterSpacing(): string | undefined {
        return this.properties.letterSpacing;
    }

    get textAlign(): string | undefined {
        return this.properties.textAlign;
    }

    get textAlignLast(): string | undefined {
        return this.properties.textAlignLast;
    }

    get textIndent(): string | undefined {
        return this.properties.textIndent;
    }

    get textTransform(): string | undefined {
        return this.properties.textTransform;
    }

    get lineBreak(): string | undefined {
        return this.properties.lineBreak;
    }

    get textOverflow(): string | undefined {
        return this.properties.textOverflow;
    }

    get textWrap(): string | undefined {
        return this.properties.textWrap;
    }

    get wordBreak(): string | undefined {
        return this.properties.wordBreak;
    }

    get textDecoration(): string | undefined {
        return this.properties.textDecoration;
    }

    get textEmphasis(): string | undefined {
        return this.properties.textEmphasis;
    }

    get textShadow(): string | undefined {
        return this.properties.textShadow;
    }

    get writingMode(): string | undefined {
        return this.properties.writingMode;
    }

    get textCombineUpright(): string | undefined {
        return this.properties.textCombineUpright;
    }

    get textOrientation(): string | undefined {
        return this.properties.textOrientation;
    }

    // get webkitCSS(): WebkitCSS | undefined {
    //     return this.properties.webkitCSS;
    // }
}
