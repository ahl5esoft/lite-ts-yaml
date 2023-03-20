import { load } from 'js-yaml';
import { LoadConfigHandleOption, LoadConfigHandlerBase } from 'lite-ts-config';
import { File } from 'lite-ts-fs';

export class JsYamlConfigLoadHander extends LoadConfigHandlerBase {

    private m_Doc: any;

    public constructor(
        private m_File: File,
    ) {
        super();
    }

    public async handle(opt: LoadConfigHandleOption) {
        if (!this.m_Doc) {
            const yml = await this.m_File.readString();
            this.m_Doc = load(yml);
        }

        if (this.m_Doc[opt.name])
            opt.res = this.m_Doc[opt.name];
        else
            await this.next?.handle(opt);
    }
}