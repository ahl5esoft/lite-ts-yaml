import { deepStrictEqual } from 'assert';
import { File } from 'lite-ts-fs';
import { Mock } from 'lite-ts-mock';

import { JsYamlConfigLoadHander as Self } from './js-yaml-config-load-hander';
import { LoadConfigHandleOption } from './load-handle-option';
import { LoadConfigHandlerBase } from './load-handler-base';

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
                key: 'Test',
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
                key: 'Test',
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