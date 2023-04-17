import { load } from 'js-yaml';
import { ConfigLoadHandlerBase, ConfigLoadHandlerContext } from 'lite-ts-config';
import { IFile } from 'lite-ts-fs';

export class JsYamlLoadConfigHander extends ConfigLoadHandlerBase {
    private m_Doc: any;

    public constructor(
        private m_File: IFile,
    ) {
        super();
    }

    public async handle(opt: ConfigLoadHandlerContext) {
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