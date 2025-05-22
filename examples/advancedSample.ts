import {
    View,
    assembleView,
    Text,
    Card,
    Column,
    ElevatedButton,
    BaseCSS,
    SpaceBox,
    TextCSS,
    FontCSS,
    Provider,
    LimitedProviderScope,
    ShadowLevels,
    Row,
    BorderCSS,
    Padding,
    Link,
    ProviderObserver,
} from "ftuttes";

new ProviderObserver().outLogs();

const counterProvider = Provider.createProvider(() => 0, "counter");
const userNameProvider = Provider.createProvider(() => "ゲスト", "userName");
const selectedTabProvider = Provider.createProvider(() => "home", "selectedTab");
const backgroundColorProvider = Provider.createProvider(() => "#f0f0f0", "backgroundColor");

/**
 * @class CustomHeader
 * @description アプリケーションのヘッダー部分を表現するカスタムウィジェット
 * プロバイダーの値を表示し、背景色変更ボタンを持つ
 */
class CustomHeader extends View {
    constructor() {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.backgroundColor = backgroundColorProvider.read();
        element.style.transition = "background-color 0.5s ease-in-out";
        element.style.width = "100%";
        return element;
    }

    override build(): View {
        return new Row({
            baseCSS: new BaseCSS({
                height: "60px",
                padding: "0 20px",
            }),
            isJustifySpaceBetween: true,
            isVerticalCenter: true,
            children: [
                new LimitedProviderScope({
                    providers: [userNameProvider],
                    builder: (userName) => {
                        return new Text({
                            text: `ようこそ、${userName}さん！`,
                            textCSS: new TextCSS({
                                fontCSS: new FontCSS({
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    color: "black",
                                })
                            }),
                        });
                    }
                }),
                new ElevatedButton({
                    child: new Text({ text: "背景色変更" }),
                    baseCSS: new BaseCSS({
                        padding: "8px 16px",
                    }),
                    onClick: () => {
                        backgroundColorProvider.update((current) => {
                            const colors = ["#f0f0f0", "#e0ffe0", "#ffe0e0", "#e0e0ff"];
                            const currentIndex = colors.indexOf(current);
                            return colors[(currentIndex + 1) % colors.length] ?? "#f0f0f0"
                        });
                    },
                }),
            ],
        });
    }
}

/**
 * @class TabNavigation
 * @description タブ切り替えを実現するナビゲーションウィジェット
 * ラジオボタンとProviderを組み合わせてタブの状態を管理
 */
class TabNavigation extends View {
    constructor() {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.display = "flex";
        element.style.justifyContent = "space-around";
        element.style.alignItems = "center";
        element.style.margin = "20px 0";
        element.style.border = "1px solid #ccc";
        element.style.borderRadius = "8px";
        return element;
    }

    override build(): View | View[] {
        return new Row({
            isJustifySpaceAround: true,
            baseCSS: new BaseCSS({
                borderCSS: new BorderCSS({
                    borderSize: "1px",
                    borderProperty: "solid",
                    color: "#ccc",
                    radius: "8px",
                }),
            }),
            children: [
                this._createTabButton("home", "ホーム"),
                this._createTabButton("about", "アバウト"),
                this._createTabButton("settings", "設定"),
            ],
        });
    }

    private _createTabButton(tabName: string, label: string): View {
        return new ElevatedButton({
            baseCSS: new BaseCSS({
                padding: "8px",
                margin: "16px",
                width: "fit-content",
                background: "#007bff",
            }),
            onClick: () => {
                selectedTabProvider.update(() => tabName);
            },
            child: new Text({
                text: label,
                textCSS: new TextCSS({
                    fontCSS: new FontCSS({
                        color: "white",
                        fontWeight: "medium",
                    })
                }),
            }),
            radius: "8px",
        });
    }
}

/**
 * @class TabContent
 * @description 選択されたタブに応じたコンテンツを表示するウィジェット
 */
class TabContent extends View {
    constructor() {
        super();
    }

    override build(): View {
        return new LimitedProviderScope({
            providers: [selectedTabProvider, counterProvider, userNameProvider],
            builder: (providerValues) => {
                const [selectedTab, counterValue, userName] = providerValues;

                switch (selectedTab) {
                    case "home":
                        return this._buildHomeTab(counterValue);
                    case "about":
                        return this._buildAboutTab(userName);
                    case "settings":
                        return this._buildSettingsTab();
                    default:
                        return new Text({ text: "コンテンツがありません。" });
                }
            }
        });
    }

    private _buildHomeTab(counterValue: number): View {
        return new Column({
            isHorizontalCenter: true,
            children: [
                new Text({
                    text: `カウンター: ${counterValue}`,
                    textCSS: new TextCSS({
                        fontCSS: new FontCSS({
                            fontSize: "36px",
                            fontWeight: "bold",
                            color: "#333",
                        })
                    }),
                }),
                new SpaceBox({ height: "20px" }),
                new ElevatedButton({
                    child: new Text({ text: "カウントアップ" }),
                    baseCSS: new BaseCSS({ padding: "12px 24px" }),
                    onClick: () => {
                        counterProvider.update((val) => val + 1);
                    },
                }),
                new SpaceBox({ height: "10px" }),
                new ElevatedButton({
                    child: new Text({ text: "カウントリセット" }),
                    baseCSS: new BaseCSS({ padding: "12px 24px" }),
                    onClick: () => {
                        counterProvider.update(() => 0);
                    },
                }),
            ],
        });
    }

    private _buildAboutTab(userName: string): View {
        return new Column({
            isHorizontalCenter: true,
            children: [
                new Text({
                    text: "fTutteSについて",
                    textCSS: new TextCSS({
                        fontCSS: new FontCSS({
                            fontSize: "30px",
                            fontWeight: "bold",
                            color: "#333",
                        })
                    }),
                }),
                new SpaceBox({ height: "15px" }),
                new Text({
                    text: `これはfTutteSフレームワークのサンプルアプリケーションです。ユーザー名: ${userName}`,
                    textCSS: new TextCSS({
                        fontCSS: new FontCSS({
                            fontSize: "18px",
                        })
                    }),
                }),
                new SpaceBox({ height: "20px" }),
                new Link({
                    href: "https://rerurate514.github.io/fTutteS-Wiki/",
                    target: "_blank",
                    isShownUnderline: true,
                    child: new Text({
                        text: "fTutteS 公式Wikiはこちら",
                        textCSS: new TextCSS({
                            fontCSS: new FontCSS({
                                color: "blue"
                            })
                        }),
                    }),
                }),
            ],
        });
    }

    private _buildSettingsTab(): View {
        return new Column({
            isHorizontalCenter: true,
            children: [
                new Text({
                    text: "設定",
                    textCSS: new TextCSS({
                        fontCSS: new FontCSS({
                            fontSize: "30px",
                            fontWeight: "bold",
                        })
                    }),
                }),
                new SpaceBox({ height: "15px" }),
                new Row({
                    isVerticalCenter: true,
                    children: [
                        new Text({ text: "ユーザー名の変更 ： " }),
                        new SpaceBox({ width: "16px" }),
                        new ElevatedButton({
                            child: new Text({
                                text: "ユーザー名を変更",
                                textCSS: new TextCSS({
                                    fontCSS: new FontCSS({
                                        color: "white",
                                        fontWeight: "medium",
                                    })
                                }),
                            }),
                            radius: "8px",
                            baseCSS: new BaseCSS({
                                padding: "12px",
                                width: "fit-content",
                                background: "#007bff",
                            }),
                            onClick: () => {
                                const newName = prompt("新しいユーザー名を入力してください:");
                                if (newName) {
                                    userNameProvider.update(() => newName);
                                }
                            },
                        }),
                    ]
                }),
            ],
        });
    }
}

/**
 * @class ComplexSampleWidget
 * @description fTutteSの多様な機能を組み合わせたサンプルウィジェット
 */
export class ComplexSampleWidget extends View {
    constructor() {
        super();
    }

    override styledView(element: HTMLElement): HTMLElement {
        element.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        element.style.minHeight = "100vh";
        element.style.display = "flex";
        element.style.flexDirection = "column";
        element.style.alignItems = "center";
        element.style.padding = "20px";
        element.style.boxSizing = "border-box";
        element.style.backgroundColor = backgroundColorProvider.read();
        element.style.transition = "background-color 0.5s ease-in-out";
        return element;
    }

    override build(): View {
        return new Column({
            isHorizontalCenter: true,
            baseCSS: new BaseCSS({
                width: "min(90%, 800px)",
                padding: "20px",
            }),
            children: [
                new LimitedProviderScope({
                    providers: [backgroundColorProvider],
                    builder: (providerValues) => {
                        const [bgColor] = providerValues;
                        return new Card({
                            radius: "16px",
                            background: bgColor,
                            elevation: ShadowLevels.LVL5,
                            baseCSS: new BaseCSS({ margin: "0 0 20px 0", padding: "0" }),
                            child: new Column({
                                children: [
                                    new CustomHeader(),
                                    new Padding({
                                        all: "20px",
                                        child: new Text({
                                            text: "fTutteS サンプルアプリケーション",
                                            textCSS: new TextCSS({
                                                fontCSS: new FontCSS({
                                                    fontSize: "36px",
                                                    fontWeight: "bold",
                                                    color: "#444",
                                                }),
                                                textAlign: "center",
                                            }),
                                        }),
                                    }),
                                ],
                            }),
                        });
                    }
                }),
                new LimitedProviderScope({
                    providers: [backgroundColorProvider],
                    builder: (providerValues) => {
                        const [bgColor] = providerValues;
                        return new Card({
                            radius: "16px",
                            background: bgColor,
                            elevation: ShadowLevels.LVL3,
                            baseCSS: new BaseCSS({
                                width: "50vw",
                                padding: "20px"
                            }),
                            child: new Column({
                                children: [
                                    new TabNavigation(),
                                    new SpaceBox({ height: "20px" }),
                                    new TabContent(),
                                ],
                            }),
                        });
                    }
                })
            ],
        });
    }
}

assembleView(
    new ComplexSampleWidget()
);
