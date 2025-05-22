import { View } from "../../core/interface/view";
import { Column } from "./column";
import { Header } from "./header";

interface ScaffoldProps {
    child: View;
    header?: Header;
    footer?: View;
    drawer?: View;
    floatingActionButton?: View;
}

/**
 * Scaffoldコンポーネント
 * ## OverView
 * アプリケーションの基本的な視覚的構造を実装するためのウィジェットです。
 * ヘッダー、フッター、メインコンテンツ、ドロワー、フローティングアクションボタンなどの要素を配置できます。
 * これらの要素は Column ウィジェットとして内部で構築されます。
 * `header` プロパティは `Header` クラスのインスタンスである必要があります。
 *
 * ## Props
 * @param props - Scaffoldの設定オプション
 * @param props.child - 必須 メインコンテンツとして表示される子要素
 * @param props.header - オプション ページの上部に表示されるヘッダー要素。`Header`クラスのインスタンスである必要があります。
 * @param props.footer - オプション ページの下部に表示されるフッター要素
 * @param props.drawer - オプション 画面の端からスライドして表示されるドロワー要素（実装は別途必要）
 * @param props.floatingActionButton - オプション 画面上に浮遊して表示されるアクションボタン要素（実装は別途必要）
 *
 * ## Examples
 * 基本的な使用例
 * @example
 * ```typescript
 * new Scaffold({
 *   header: new Header({
 *     isStickyHeader: true,
 *     baseCSS: new BaseCSS({
 *       backgroundColor: "#f0f0f0",
 *       padding: "10px",
 *       textAlign: "center"
 *     }),
 *     child: new Text({ text: "My App Header" })
 *   }),
 *   footer: new Row({
 *     isAlignCenter: true,
 *     baseCSS: new BaseCSS({
 *       backgroundColor: "#e0e0e0",
 *       padding: "10px",
 *       textAlign: "center"
 *     }),
 *     children: [
 *       new Text({ text: "Footer Text" })
 *     ]
 *   }),
 *   child: new Column({
 *     baseCSS: new BaseCSS({
 *       padding: "20px",
 *       height: "calc(100vh - 100px)", // ヘッダーとフッターの高さを考慮
 *       overflowY: "auto"
 *     }),
 *     children: [
 *       new Text({ text: "Main Content Area", textCSS: new TextCSS({ fontCSS: new FontCSS({ fontSize: "20px" }) }) }),
 *       new Text({ text: "Scroll down to see more..." }),
 *       // ... more content to make it scrollable
 *       new SpaceBox({ height: "500px" }),
 *       new Text({ text: "End of Content" })
 *     ]
 *   })
 * });
 * ```
 * 最小限の設定
 * @example
 * ```typescript
 * new Scaffold({
 *   child: new Text({ text: "Simple Page Content" })
 * });
 * ```
 */
export class Scaffold extends View {
    constructor(protected props: ScaffoldProps) {
        if (props.header && !(props.header instanceof Header)) {
            throw new TypeError("Scaffold header property must be an instance of Header class");
        }
        super();
    }

    createWrapView(): HTMLElement {
        return document.createElement("div");
    }

    styledView(element: HTMLElement): HTMLElement {
        element.style.width = "100%";
        element.style.height = "100%";
        return element;
    }

    build(): View {
        const children = [];
        
        if (this.props.header) children.push(this.props.header);
        
        children.push(this.props.child);
        
        if (this.props.footer) children.push(this.props.footer);
        
        return new Column({
            children: children
        });
    }
}
