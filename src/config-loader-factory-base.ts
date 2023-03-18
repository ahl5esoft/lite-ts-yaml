export abstract class ConfigLoaderFactoryBase {
    public abstract load<T>(ctor: new () => T): Promise<T>;
}