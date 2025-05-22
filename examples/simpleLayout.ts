import { 
    assembleView, 
    Text, 
    Column, 
    Row, 
    Padding, 
    Margin, 
    TextCSS, 
    FontCSS, 
    // setupDevMode 
} from "ftuttes";

// setupDevMode(true);

const view = new Column({
    isHorizontalCenter: true,
    children: [
        new Margin({
            bottom: "20px",
            child: new Text({
                text: "ftuttesを使った列レイアウト",
                textCSS: new TextCSS({
                    fontCSS: new FontCSS({
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#222222"
                    })
                })
            })
        }),
        new Row({
            isVerticalCenter: true,
            children: [
                new Padding({
                    all: "10px",
                    child: new Text({
                        text: "左のテキスト",
                        textCSS: new TextCSS({
                            fontCSS: new FontCSS({
                                color: "#666666"
                            })
                        })
                    })
                }),
                new Padding({
                    all: "10px",
                    child: new Text({
                        text: "中のテキスト",
                        textCSS: new TextCSS({
                            fontCSS: new FontCSS({
                                color: "#666666"
                            })
                        })
                    })
                }),
                new Padding({
                    all: "10px",
                    child: new Text({
                        text: "右のテキスト",
                        textCSS: new TextCSS({
                            fontCSS: new FontCSS({
                                color: "#666666"
                            })
                        })
                    })
                }),
            ]
        })
    ]
});

assembleView(view);
