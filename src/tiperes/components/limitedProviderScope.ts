import { View } from "../../core/interface/view";
import { ProviderScope } from "../interface/providerScope";
import { Provider } from "../logic/provider";

interface LimitedProviderScopeProps {
    builder: (value: any) => View;
    providers: Array<Provider<any>>;
}

export class LimitedProviderScope extends ProviderScope {
    constructor(protected props: LimitedProviderScopeProps) {
        super({
            providers: props.providers
        });
    }

    override build(): View {
        const readArr = this.props.providers.map((provider: Provider<any>) => {
            return provider.read();
        });

        return this.props.builder(readArr);
    }
}
