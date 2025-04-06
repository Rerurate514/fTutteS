import { View } from "../../core/interface/view";
import { ProviderScope } from "../interface/providerScope";
import { Provider } from "../logic/provider";

interface LimitedProviderScopeProps {
    builder: (value: any) => View;
    providers: Array<Provider<any>>;
    child: View;
}

export class LimitedProviderScope extends ProviderScope {
    protected builder: (value: any) => View;
    
    constructor(props: LimitedProviderScopeProps) {
        super(props.providers, props.child);
        this.builder = props.builder;
    }

    override build(): View {
        const readArr = this.providers.map((provider: Provider<any>) => {
            return provider.read();
        });

        return this.builder(readArr);
    }

    override postBuild(): void {
        this.onPostBuild();
    }
    
    protected onPostBuild(): void {
        
    }
    
    override preBuild(): void {
        this.onPreBuild();
    }

    protected onPreBuild(): void {
        
    }
}
