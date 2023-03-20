import { load } from 'js-yaml';
import { File } from 'lite-ts-fs';

import { LoadConfigHandleOption } from './load-handle-option';
import { LoadConfigHandlerBase } from './load-handler-base';

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

        if (this.m_Doc[opt.key])
            opt.res = this.m_Doc[opt.key];
        else
            await this.next?.handle(opt);
    }
}