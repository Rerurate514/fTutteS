import {
    assembleView,
    Provider,
    LimitedProviderScope,
    ElevatedButton,
    Text,
    Column,
    Center,
    Padding,
    TextCSS,
    FontCSS,
    BaseCSS,
    Card,
    BorderCSS,
    ShadowLevels,
} from "ftuttes";

const counterProvider = Provider.createProvider(() => 0, "counterProvider");

const CounterDisplay = new Card({
    radius: "8px",
    background: "#f8f8f8",
    elevation: ShadowLevels.LVL5,
    child: new Padding({
        all: "20px",
        child: new Column({
            isHorizontalCenter: true,
            children: [
                new Text({
                    text: "Counter App",
                    textCSS: new TextCSS({
                        fontCSS: new FontCSS({
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: "#333333"
                        }),
                        textAlign: "center"
                    })
                }),
                new Padding({
                    top: "20px",
                    bottom: "20px",
                    child: new LimitedProviderScope({
                        providers: [ counterProvider ],
                        builder(count) {
                            return new Text({
                                text: count.toString(),
                                textCSS: new TextCSS({
                                    fontCSS: new FontCSS({
                                        fontSize: "48px",
                                        fontWeight: "bold",
                                        color: "#4285F4"
                                    }),
                                    textAlign: "center"
                                })
                            })
                        },
                    })
                }),
                new ElevatedButton({
                    radius: "4px",
                    baseCSS: new BaseCSS({
                        width: "200px",
                        padding: "12px",
                        borderCSS: new BorderCSS({
                            radius: "4px"
                        })
                    }),
                    onClick: () => {
                        // ボタンがクリックされたときにカウンターの値を増加
                        counterProvider.update(currentCount => currentCount + 1);
                    },
                    child: new Center({
                        child: new Text({
                            text: "Click Here!",
                            textCSS: new TextCSS({
                                fontCSS: new FontCSS({
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "#1EFF00FF"
                                })
                            })
                        })
                    })
                })
            ]
        })
    })
});

// カウンターアプリケーション全体のレイアウト
const counterApp = new Center({
    child: CounterDisplay
});

// DOMにマウント
assembleView(counterApp);
