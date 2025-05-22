import { assembleView, Text, TextCSS, FontCSS } from "ftuttes";

const simpleTextView = new Text({
    text: "こんにちは、ftuttesの世界へようこそ！",
    textCSS: new TextCSS({
        fontCSS: new FontCSS({
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333333"
        }),
        textAlign: "center"
    })
});

assembleView(simpleTextView);
