enum Position {
    TOP = 'top',
    TOP_RIGHT = 'top-right',
    RIGHT = 'right',
    BOTTOM_RIGHT = 'bottom-right',
    BOTTOM = 'bottom',
    BOTTOM_LEFT = 'bottom-left',
    LEFT = 'left',
    TOP_LEFT = 'top-left',
    CENTER = 'center'
}

export class RelativePositions {
    private constructor(private readonly value: Position) {}

    static readonly TOP = new RelativePositions(Position.TOP);
    static readonly TOP_RIGHT = new RelativePositions(Position.TOP_RIGHT);
    static readonly RIGHT = new RelativePositions(Position.RIGHT);
    static readonly BOTTOM_RIGHT = new RelativePositions(Position.BOTTOM_RIGHT);
    static readonly BOTTOM = new RelativePositions(Position.BOTTOM);
    static readonly BOTTOM_LEFT = new RelativePositions(Position.BOTTOM_LEFT);
    static readonly LEFT = new RelativePositions(Position.LEFT);
    static readonly TOP_LEFT = new RelativePositions(Position.TOP_LEFT);
    static readonly CENTER = new RelativePositions(Position.CENTER);

    applyCSS(element: HTMLElement): HTMLElement {
        element.style.position = "absolute";
        
        switch (this.value) {
            case Position.CENTER: {
                element.style.top = "50%";
                element.style.left = "50%";
                element.style.transform = "translate(-50%, -50%)";
                break;
            }
            case Position.TOP: {
                element.style.top = "0";
                element.style.left = "50%";
                element.style.transform = "translateX(-50%)";
                break;
            }
            case Position.TOP_RIGHT: {
                element.style.top = "0";
                element.style.right = "0";
                element.style.transform = "translate(0, 0)";
                break;
            }
            case Position.RIGHT: {
                element.style.top = "50%";
                element.style.right = "0";
                element.style.transform = "translateY(-50%)";
                break;
            }
            case Position.BOTTOM_RIGHT: {
                element.style.bottom = "0";
                element.style.right = "0";
                element.style.transform = "translate(0, 0)";
                break;
            }
            case Position.BOTTOM: {
                element.style.bottom = "0";
                element.style.left = "50%";
                element.style.transform = "translateX(-50%)";
                break;
            }
            case Position.BOTTOM_LEFT: {
                element.style.bottom = "0";
                element.style.left = "0";
                element.style.transform = "translate(0, 0)";
                break;
            }
            case Position.LEFT: {
                element.style.top = "50%";
                element.style.left = "0";
                element.style.transform = "translateY(-50%)";
                break;
            }
            case Position.TOP_LEFT: {
                element.style.top = "0";
                element.style.left = "0";
                element.style.transform = "translate(0, 0)";
                break;
            }
            default: {
                throw new Error("RelativePositions must be created by static method, RelativePositions.TOP, RelativePositions.BOTTOM, etc");
            }
        }
        
        return element;
    }
}
