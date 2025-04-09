import { View } from "../../core/interface/view";

interface SpaceBoxProps {
    width?: string;
    height?: string;
}

export class SpaceBox extends View {
    constructor(protected props: SpaceBoxProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        if(this.props.width) element.style.width = this.props.width;
        if(this.props.height) element.style.height = this.props.height;

        return element;
    }
}
