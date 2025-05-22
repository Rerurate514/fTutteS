import { View } from "../../core/index";
import { BaseCSS } from "../../cssKit/baseCSS";

interface CanvasProps {
    baseCSS?: BaseCSS;
    onReady?: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void;
}

export class Canvas extends View {
    private canvasElement: HTMLCanvasElement | null = null;
    private context: CanvasRenderingContext2D | null = null;

    constructor(protected props: CanvasProps) {
        super();
    }

    override createWrapView(): HTMLElement {
        this.canvasElement = document.createElement("canvas");
        return this.canvasElement;
    }

    override styledView(element: HTMLElement): HTMLElement {
        if (this.canvasElement) if (this.props.baseCSS) this.canvasElement = this.props.baseCSS.applyCSS(element) as HTMLCanvasElement;
        return element;
    }

    override onAssembleComplete(): void {
        this.draw();
    }

    private draw(): void {
        if (this.canvasElement) {
            this.context = this.canvasElement.getContext("2d");
            if (this.context && this.props.onReady) {
                this.props.onReady(this.canvasElement, this.context);
            }
        }
    }

    getContext(): CanvasRenderingContext2D | null {
        return this.context;
    }

    getCanvasElement(): HTMLCanvasElement | null {
        return this.canvasElement;
    }
}
