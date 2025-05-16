import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";

interface RowProps {
    children: View | Array<View> | undefined;
    baseCSS?: BaseCSS;
    isAlignCenter?: boolean;
    isJustifySpaceAround?: boolean;
    isJustifySpaceBetween?: boolean;
    isVerticalCenter?: boolean;
}

export class Row extends View {
    constructor(protected props: RowProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.className = "row-container";
        element.style.display = "flex";

        if (this.props.isAlignCenter) element.style.justifyContent = "center";
        if (this.props.isJustifySpaceAround) element.style.justifyContent = "space-around";
        if (this.props.isJustifySpaceBetween) element.style.justifyContent = "space-between";
        if (this.props.isVerticalCenter) element.style.alignItems = "center";

        if (this.props.baseCSS) element = this.props.baseCSS.applyCSS(element);

        return element;
    }

    override build(): View | Array<View> | undefined {
        return this.props.children;
    }
}
