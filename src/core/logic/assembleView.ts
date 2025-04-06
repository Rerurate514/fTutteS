import { View } from "../interface/view";

export function assembleView(
    viewArg: View,
    idName: string = "fJutteS-Container"
): HTMLElement {
    viewArg.assemble();
    let element = viewArg.view;
    let container = document.getElementById(idName);
    
    if(container != null) container.appendChild(element);

    return element;
}
