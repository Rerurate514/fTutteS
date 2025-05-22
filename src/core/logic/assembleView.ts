import { View } from "../interface/view";

/**
 * assembleView関数
 * ## OverView
 * fTutteSアプリケーションのエントリーポイントとなる関数です。
 * 指定されたルート`View`ウィジェットを組み立て、それを指定されたIDのHTMLコンテナ要素に追加します。
 * `View`のライフサイクル（`assemble()`、`assembleComplete()`）を適切に呼び出し、
 * UIの初期描画と後処理を管理します。
 *
 * ## Parameters
 * @param viewArg - 必須 アプリケーションのルートとなるViewインスタンス。
 * @param idName - オプション Viewが追加されるHTMLコンテナ要素のID。デフォルトは`"fTutteS-Container"`。
 * - このIDを持つ要素がDOM内に存在しない場合、Viewは追加されません。
 *
 * ## Returns
 * @returns {HTMLElement} - DOMに追加されたルートViewのHTMLElement。
 * 
 * ## Examples
 * @example
 * ```typescript
 * assembleView(
 *   new Text({text: "Hello World"});
 * );
 * ```
 */
export function assembleView(
    viewArg: View,
    idName: string = "fTutteS-Container"
): HTMLElement {
    viewArg.assemble();
    let element = viewArg.view;
    let container = document.getElementById(idName);
    
    if(container != null) container.appendChild(element);

    viewArg.assembleComplete();

    return element;
}
