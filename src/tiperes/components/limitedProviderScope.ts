import { View } from "../../core/interface/view";
import { ProviderScope, ProviderScopeProps } from "../interface/providerScope";
import { Provider } from "../logic/provider";

export type LimitedProviderScopeProps<T> = ProviderScopeProps<T> & {
    build: (value: T) => {}
}

export class LimitedProviderScope<T> extends ProviderScope<T> {
    constructor(props: LimitedProviderScopeProps<T>) {
        super(props);
    }

    build(): View<LimitedProviderScopeProps<T>> {
        const readArr = this.props.providers.map((provider: Provider<T>) => {
            return provider.read();
        });

        return this.props.build(readArr);
    }

    postBuild(): void {
        this.onPostBuild();
    }
    
    protected onPostBuild(): void {
        
    }
    
    preBuild(): void {
        this.onPreBuild();
    }

    protected onPreBuild(): void {
        
    }
}
