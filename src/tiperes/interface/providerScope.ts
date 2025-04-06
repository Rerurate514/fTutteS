import { View, ViewProps } from "../../core/interface/view";
import { Provider } from "../logic/provider";

export type ProviderScopeProps<T> = ViewProps & {
    providers: Array<Provider<T>>,
    child: View<ProviderScopeProps<any>>
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
export class ProviderScope<PROVIDER_TYPE> extends View<ProviderScopeProps<PROVIDER_TYPE>> {
    constructor(
        props: ProviderScopeProps<PROVIDER_TYPE>
    ) {
        super(props);

        this._iterateProviders();
    }

    private _iterateProviders(): void {
        this.props.providers.forEach(provider => {
            this._watch(provider);
        });
    }

    private _watch(provider: Provider<PROVIDER_TYPE>): void {
        provider.watch(() => {
            this.rebuild(null);
        },
        { immediate: false });
    }
}
