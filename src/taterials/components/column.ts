import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";

interface ColumnProps {
    children: Array<View>;
    baseCSS?: BaseCSS;
    isHorizontalCenter?: boolean
}

export class Column extends View {
    constructor(protected props: ColumnProps){
        super();
    }

    styledView(element: HTMLElement): HTMLElement{
        element.style.display = "flex";
        element.style.flexDirection = "column";

        if(this.props.isHorizontalCenter) element.style.alignItems = "center";

        if(this.props.baseCSS) element = this.props.baseCSS.applyCSS(element);

        return element; 
    }

    build(): View | Array<View>{
        return this.props.children;
    }
}
