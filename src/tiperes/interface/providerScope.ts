import { View } from "../../core/interface/view";
import { Provider } from "../logic/provider";

interface ProviderScopeInterface {
    providers: Array<Provider<any>>,
    child: View
}

/**
 *
 * このクラスに渡されたProvidersはリッスン状態となり、値の変更を常に監視しています。
 * 変更が検知されるとこのコンポーネント以下のViewがrebuild()されます。
 * 
 * FlutterでいうところのsetState、ReactでいうところのuseStateを使用したいとき、
 * このクラスをViewにラップしてwatchもしくはreadしているProvider群を渡すだけです。
 * このとき必ず、配列でProviderを渡してください。(providerが一つしかなくても！)
 */
export class ProviderScope extends View {
    constructor(protected props: ProviderScopeInterface) {
        super();

        this._iterateProviders();
    }

    private _iterateProviders(): void {
        this.props.providers.forEach((provider: Provider<any>) => {
            this._watch(provider);
        });
    }

    private _watch(provider: Provider<any>): void {
        provider.watch(() => {
            this.rebuild();
        },
        { immediate: false });
    }
}
