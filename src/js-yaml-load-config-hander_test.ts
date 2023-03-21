import { deepStrictEqual } from 'assert';
import { LoadConfigHandleOption, LoadConfigHandlerBase } from 'lite-ts-config';
import { File } from 'lite-ts-fs';
import { Mock } from 'lite-ts-mock';

import { JsYamlLoadConfigHander as Self } from './js-yaml-load-config-hander';

describe('src/js-yaml-config-load-hander.ts', () => {
    describe('.handle(opt: LoadConfigHandleOption)', () => {
        it('延迟加载', async () => {
            const mockFile = new Mock<File>();
            const self = new Self(mockFile.actual);

            mockFile.expectReturn(
                r => r.readString(),
                `Test:
                    a: 1`
            );

            const opt: LoadConfigHandleOption = {
                name: 'Test',
                res: {}
            }
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

            const opt: LoadConfigHandleOption = {
                name: 'Test',
                res: {}
            }
            const mockHandler = new Mock<LoadConfigHandlerBase>();
            mockHandler.expected.handle(opt);

            self.setNext(mockHandler.actual);

            await self.handle(opt);
            deepStrictEqual(opt.res, {});
        });
    });
});