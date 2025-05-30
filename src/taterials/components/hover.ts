import { BaseCSS } from "../../cssKit/baseCSS";
import { View } from "../../core/interface/view";
import { BorderCSS } from "../../cssKit/borderCSS";
import { Row } from "./row";
import { ShadowLevels } from "../enums/shadowLevels";

interface HoverProps {
    child: View;
    radius?: string;
    shadow?: ShadowLevels;
    onClickEffect?: boolean;
}

interface HoverWrapperProps {
    radius?: string;
    onClickEffect?: boolean;
}

/**
 * Hoverコンポーネント
 * ## OverView
 * 子要素にホバーエフェクトとオプションでクリック時の波紋エフェクトを適用します。
 * `radius` を指定することで角丸のホバー領域を作成できます。
 *
 * ## Props
 * @param props - Hoverの設定オプション
 * @param props.child - 必須 ホバーエフェクトを適用する子要素
 * @param props.radius - オプション ホバー領域の角の丸み
 * - 例: `"8px"`, `"1rem"`, `"50%"`
 * - CSS `border-radius` プロパティに設定されます。
 * @param props.shadow - オプション ホバー時の影の強さレベル（現在未使用）
 * @param props.onClickEffect - オプション クリック時に波紋エフェクトを表示するかどうか
 * - `true` の場合、クリック時に要素全体に広がる波紋が表示されます。
 *
 * ## Examples
 *
 * 基本的な使用例
 * @example
 * ```typescript
 * new Hover({
 *   radius: "10px",
 *   onClickEffect: true,
 *   child: new Card({
 *     radius: "10px",
 *     baseCSS: new BaseCSS({
 *       width: "150px",
 *       height: "80px",
 *       background: "lightblue",
 *     }),
 *     child: new Text({
 *       text: "Hover Me",
 *       textCSS: new TextCSS({
 *         fontCSS: new FontCSS({
 *           color: "darkblue",
 *           fontWeight: "bold"
 *         })
 *       })
 *     })
 *   })
 * });
 * ```
 *
 * 最小限の設定
 * @example
 * ```typescript
 * new Hover({
 *   child: new Card({
 *     baseCSS: new BaseCSS({
 *       width: "100px",
 *       height: "50px",
 *       background: "lightgray",
 *     }),
 *     child: new Text({
 *       text: "Hover"
 *     })
 *   })
 * });
 * ```
 */
export class Hover extends View {
    constructor(protected props: HoverProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.width = "fit-content";
        element.style.height = "fit-content";
        element.style.position = "relative";
        if(this.props.radius) element.style.borderRadius = this.props.radius;

        return element;
    }

    override build(): View | Array<View> | undefined {
        return new Row({
            baseCSS: new BaseCSS({
                borderCSS: new BorderCSS({
                    radius: "inherit"
                })
            }),
            children: [
                this.props.child,
                new _HoverWrapper(this.props)
            ]
        });
    }
}

class _HoverWrapper extends View {
    constructor(protected props: HoverWrapperProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.position = "absolute";
        element.style.top = "0";
        element.style.left = "0";
        element.style.width = "100%";
        element.style.height = "100%";
        element.style.background = "rgb(0, 0, 0, 0)";
        element.style.overflow = "hidden";
        element.style.zIndex = "998";
        if(this.props.radius) element.style.borderRadius = this.props.radius;

        return element;
    }

    override build(): View | Array<View> | undefined {
        return new _Hover(this.props);
    }
}

class _Hover extends View {
    constructor(protected props: HoverWrapperProps) {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.width = "100%";
        element.style.height = "100%";
        element.style.background = "rgb(0, 0, 0, 0)";
        element.style.mixBlendMode = "difference";
        element.style.transition = "background-color 0.4s";
        element.style.zIndex = "999";
        if(this.props.radius) element.style.borderRadius = this.props.radius;

        return element;
    }

    override embedScriptToView(element: HTMLElement): HTMLElement {
        element.addEventListener('mouseenter', () => {
            element.style.background = "rgb(100, 100, 100, 0.4)";
        });

        element.addEventListener('mouseleave', () => {
            element.style.background = "rgb(0, 0, 0, 0)";
        });

        if (!this.props.onClickEffect) return element;

        element.addEventListener('click', (e) => {
            const ripples = element.getElementsByClassName('ripple');
            Array.from(ripples).forEach(ripple => ripple.remove());

            const ripple = document.createElement("div");
            ripple.classList.add('ripple');

            ripple.style.position = "absolute";
            ripple.style.transform = "scale(0)";
            ripple.style.animation = "";
            ripple.style.pointerEvents = "none";
            ripple.style.background = "rgba(200, 200, 200, 0.9)";
            ripple.style.borderRadius = "50%";
            ripple.style.mixBlendMode = "difference";

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const w = element.offsetWidth;
            const h = element.offsetHeight;
            const dia = Math.sqrt(w * w + h * h);

            ripple.style.width = ripple.style.height = dia * 2 + 'px';
            ripple.style.left = x - dia + 'px';
            ripple.style.top = y - dia + 'px';

            element.appendChild(ripple);

            ripple.animate([
                { transform: "scale(1)", opacity: "0"}
            ], {
                duration: 1000,
                easing: "ease-in-out"
            });

            setTimeout(() => ripple.remove(), 1000);
        });

        return element;
    }
}
