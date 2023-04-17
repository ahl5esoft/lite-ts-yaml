import { deepStrictEqual } from 'assert';
import { ConfigLoadHandlerBase, ConfigLoadHandlerContext } from 'lite-ts-config';
import { IFile } from 'lite-ts-fs';
import { Mock } from 'lite-ts-mock';

import { JsYamlLoadConfigHander as Self } from './load-config-hander';

describe('src/js-yaml-config-load-hander.ts', () => {
    describe('.handle(ctx: ConfigLoadHandlerContext)', () => {
        it('延迟加载', async () => {
            const mockFile = new Mock<IFile>();
            const self = new Self(mockFile.actual);

            mockFile.expectReturn(
                r => r.readString(),
                `Test:
                    a: 1`
            );

            const opt: ConfigLoadHandlerContext = {
                name: 'Test',
                res: {}
            };
            await self.handle(opt);
            deepStrictEqual(opt.res, {
                a: 1
            });

            const doc = Reflect.get(self, 'm_Doc');
            deepStrictEqual(doc, {
                Test: {
                    a: 1
                }
            });
        });

        it('不存在', async () => {
            const self = new Self(null);

            Reflect.set(self, 'm_Doc', {});

            const opt: ConfigLoadHandlerContext = {
                name: 'Test',
                res: {}
            };
            const mockHandler = new Mock<ConfigLoadHandlerBase>();
            mockHandler.expected.handle(opt);

            self.setNext(mockHandler.actual);

            await self.handle(opt);
            deepStrictEqual(opt.res, {});
        });
    });
});