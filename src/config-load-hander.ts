import { load } from 'js-yaml';
import { ConfigLoadHandlerBase, ConfigLoadHandlerContext } from 'lite-ts-config';
import { IFile } from 'lite-ts-fs';

export class JsYamlConfigLoadHander extends ConfigLoadHandlerBase {
    private m_Doc: any;

    public constructor(
        private m_File: IFile,
    ) {
        super();
    }

    public async handle(ctx: ConfigLoadHandlerContext) {
        if (!this.m_Doc) {
            const yml = await this.m_File.readString();
            this.m_Doc = load(yml);
        }

        if (this.m_Doc[ctx.name])
            ctx.res = this.m_Doc[ctx.name];
        else
            await this.next?.handle(ctx);
    }
}