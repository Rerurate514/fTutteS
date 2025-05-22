import { View, BaseCSS, Provider, Column, ElevatedButton, Text, TextCSS, FontCSS, Row, assembleView, Center, BorderCSS } from "ftuttes";

class CanvasDrawer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private isDrawing = false;
    private lastX = 0;
    private lastY = 0;
    private hue = 0;
    private direction = true;
    private lineWidth = 5;

    constructor(canvasElement: HTMLCanvasElement) {
        this.canvas = canvasElement;

        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error('Could not get 2D context from canvas');
        }
        this.ctx = context;
    }

    public init() {
        this.resizeCanvas();
        this.setupEventListeners();
        this.drawInitialContent();
    }

    private resizeCanvas(): void {
        const styles = getComputedStyle(this.canvas);
        const width = parseInt(styles.width, 10);
        const height = parseInt(styles.height, 10);

        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;

        this.ctx.scale(dpr, dpr);

        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
    }

    private setupEventListeners(): void {
        this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));

        this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.canvas.addEventListener('touchend', this.stopDrawing.bind(this));

        window.addEventListener('resize', this.resizeCanvas.bind(this));
    }

    private handleTouchStart(e: TouchEvent): void {
        e.preventDefault();
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch?.clientX,
                clientY: touch?.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        }
    }

    private handleTouchMove(e: TouchEvent): void {
        e.preventDefault();
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch?.clientX,
                clientY: touch?.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        }
    }

    private startDrawing(e: MouseEvent): void {
        this.isDrawing = true;
        const rect = this.canvas.getBoundingClientRect();
        this.lastX = e.clientX - rect.left;
        this.lastY = e.clientY - rect.top;
    }

    private draw(e: MouseEvent): void {
        if (!this.isDrawing) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = this.lineWidth;

        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();

        this.lastX = x;
        this.lastY = y;

        this.hue = (this.hue + 1) % 360;

        if (this.lineWidth >= 50 || this.lineWidth <= 5) {
            this.direction = !this.direction;
        }

        if (this.direction) {
            this.lineWidth += 0.5;
        } else {
            this.lineWidth -= 0.5;
        }
    }

    private stopDrawing(): void {
        this.isDrawing = false;
    }

    private drawInitialContent(): void {
        this.ctx.fillStyle = '#f5f5f5';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#333';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        const textX = this.canvas.width / (2 * window.devicePixelRatio || 1);
        const textY = this.canvas.height / (2 * window.devicePixelRatio || 1);
        this.ctx.fillText('ここにマウスやタッチで描画できます', textX, textY);
    }

    public clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawInitialContent();
    }

    public drawRandomShapes(count: number = 10): void {
        for (let i = 0; i < count; i++) {
            const x = Math.random() * this.canvas.width / (window.devicePixelRatio || 1);
            const y = Math.random() * this.canvas.height / (window.devicePixelRatio || 1);
            const radius = 5 + Math.random() * 20;

            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.ctx.fill();
        }
    }
}

/*---------------------------------------------------------------------*/

interface InteractiveCanvasProps {
    baseCSS?: BaseCSS;
}

const canvasDrawerProvider = Provider.createProvider<CanvasDrawer | null>(() => null, "canvasDrawer");

class InteractiveCanvas extends View {
    private props: InteractiveCanvasProps;

    constructor(props: InteractiveCanvasProps) {
        super();
        this.props = props;
    }

    override createWrapView(): HTMLElement {
        const canvas = document.createElement("canvas");
        return canvas;
    }

    override styledView(element: HTMLElement): HTMLElement {
        if (this.props.baseCSS) element = this.props.baseCSS.applyCSS(element);
        return element;
    }

    override embedScriptToView(element: HTMLElement): HTMLElement {
        const canvasElement = element as HTMLCanvasElement;
        const drawer = new CanvasDrawer(canvasElement);
        canvasDrawerProvider.update(() => drawer);
        return element;
    }

    override assembleComplete(): void {
        canvasDrawerProvider.read()?.init();
    }

    override onDispose() {
        canvasDrawerProvider.update(() => null);
    }
}

/*---------------------------------------------------------------------*/

assembleView(
    new Center({
        child: new Column({
            baseCSS: new BaseCSS({
                width: "fit-content",
                height: "fit-content",
            }),
            isHorizontalCenter: true,
            children: [
                new InteractiveCanvas({
                    baseCSS: new BaseCSS({
                        width: "400px",
                        height: "300px",
                        margin: "20px",
                        borderCSS: new BorderCSS({
                            borderSize: "2px",
                            borderProperty: "solid",
                            color: "black",
                            radius: "8px",
                        }),
                    }),
                }),
                new Row({
                    isJustifySpaceAround: true,
                    isAlignCenter: true,
                    baseCSS: new BaseCSS({
                        width: "400px",
                    }),
                    children: [
                        new ElevatedButton({
                            child: new Text({
                                text: "クリア",
                                textCSS: new TextCSS({
                                    fontCSS: new FontCSS({
                                        fontWeight: "medium",
                                    }),
                                }),
                            }),
                            baseCSS: new BaseCSS({
                                padding: "10px",
                            }),
                            onClick: () => {
                                const drawer = canvasDrawerProvider.read();
                                if (drawer) drawer?.clear();
                            },
                        }),
                        new ElevatedButton({
                            child: new Text({
                                text: "ランダム図形",
                                textCSS: new TextCSS({
                                    fontCSS: new FontCSS({
                                        fontWeight: "medium",
                                    }),
                                }),
                            }),
                            baseCSS: new BaseCSS({
                                padding: "10px",
                            }),
                            onClick: () => {
                                const drawer = canvasDrawerProvider.read();
                                drawer?.drawRandomShapes();
                            },
                        }),
                    ],
                })
            ],
        }),
    })
);
