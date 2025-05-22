import { assembleView, Text, Card, Center, Padding, TextCSS, FontCSS, ShadowLevels, BaseCSS } from "ftuttes";

const text = `
ftuttesを使ったカード内のテキストです。このライブラリを使うと、HTML要素を直接操作することなく、コンポーネントベースでUIを構築できます。
`;

const cardWithText = new Center({
    child: new Card({
        baseCSS: new BaseCSS({
            width: "30vw"
        }),
        radius: "10px",
        background: "#ffffff",
        elevation: ShadowLevels.LVL5,
        child: new Center({
            child: new Padding({
                all: "20px",
                child: new Text({
                    text: text,
                    textCSS: new TextCSS({
                        fontCSS: new FontCSS({
                            fontSize: "16px",
                            lineHeight: "1.5",
                            color: "#444444"
                        }),
                        textAlign: "center"
                    })
                })
            })
        })
    })
});

assembleView(cardWithText);
