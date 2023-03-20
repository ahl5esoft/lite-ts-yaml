import { ConfigLoaderFactoryBase } from './config-loader-factory-base';
import { LoadConfigHandleOption } from './load-handle-option';
import { LoadConfigHandlerBase } from './load-handler-base';

export class ConfigLoaderFactory extends ConfigLoaderFactoryBase {

    constructor(
        private m_LoadHandler: LoadConfigHandlerBase
    ) {
        super();
    }

    public async load<T>(ctor: new () => T) {
        const opt: LoadConfigHandleOption = {
            key: ctor.name,
            res: {},
        };
        await this.m_LoadHandler.handle(opt);
        return opt.res as T;
    }
}