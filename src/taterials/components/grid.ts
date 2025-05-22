import { View } from "../../core/interface/view";

interface GridProps {
    children: View | View[];
    minmaxPX: number;
    fraction?: number;
    gap?: string;
}

/**
 * Gridコンポーネント
 * ## OverView
 * 子要素をレスポンシブなグリッドレイアウトで配置します。
 * `minmaxPX`と`fraction`を使用して、カラムの最小幅と相対的な比率を定義できます。
 * 要素間のギャップも設定可能です。
 * 
 * ## Props
 * @param props - Gridの設定オプション
 * @param props.children - 必須 グリッド内に配置する子要素（単一または配列）
 * @param props.minmaxPX - 必須 グリッドカラムの最小幅をピクセル単位で指定します。
 * - CSS `minmax()`関数の最小値に設定されます。
 * @param props.fraction - オプション グリッドカラムの相対的な比率を指定します。デフォルトは`1`です。
 * - CSS `minmax()`関数の最大値（`fr`単位）に設定されます。
 * @param props.gap - オプション グリッドアイテム間の間隔
 * - 例: `"10px"`, `"1rem"`
 * - CSS `gap`プロパティに設定されます。
 * 
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * const myGrid = new Grid({
 *   minmaxPX: 200,
 *   fraction: 1,
 *   gap: "20px"
 *   children: [
 *     new Card({ child: new Text({ text: "Item1" }) }),
 *     new Card({ child: new Text({ text: "Item2" }) }),
 *     new Card({ child: new Text({ text: "Item3" }) }),
 *     new Card({ child: new Text({ text: "Item4" }) })
 *   ],
 * });
 * ```
 *
 * 最小限の設定
 * @example
 * ```typescript
 * const simpleGrid = new Grid({
 *   minmaxPX: 150
 *   children: [
 *     new Text({ text: "GridItemA" }),
 *     new Text({ text: "GridItemB" })
 *   ],
 * });
 * ```
 */
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
