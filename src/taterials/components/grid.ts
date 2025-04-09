import { View } from "../../core/interface/view";

interface GridProps {
    children: View | View[];
    minmaxPX: number;
    fraction?: number;
    gap?: string;
}

export class Grid extends View {
    constructor(protected props: GridProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.display = "grid";
        element.style.gridTemplateColumns = `repeat(auto-fit, minmax(${this.props.minmaxPX}px, ${this.props.fraction}fr))`;
        if(this.props.gap) element.style.gap = this.props.gap;
        return element;
    }

    override build(): View | View[] {
        return this.props.children;
    }
}
