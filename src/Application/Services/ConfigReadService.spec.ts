import "../../bootstrap";
import {container} from "tsyringe";
import {DI} from "../../diTokens";
import {createMock} from "ts-auto-mock";
import {ConfigReadService} from "./ConfigReadService";
import {IArgumentProvider} from "../../Domain/Infrastructure/System/IArgumentProvider";
import {Arguments} from "../../Domain/Models/Arguments";
import {ITextReader} from "../../Domain/Infrastructure/System/ITextReader";
import Config from "../../Domain/Models/Config";

const assert = require('assert');

describe('ConfigReadService', () => {
    describe("read", () => {
        test('Should return normal value', async () => {
            /*
             * Prepare
             */
            const mockAsserts = [];
            {
                const mock = createMock<IArgumentProvider>();
                {
                    const fn = mock.getArgs = jest.fn()
                    fn.mockReturnValue({
                        config: "CONFIG_PATH",
                        list: true
                    } as Arguments)
                    mockAsserts.push(() => {
                    })
                }
                container.register(DI.Domain.Infrastructure.System.IArgumentProvider, {useValue: mock});
            }
            {
                const mock = createMock<ITextReader>();
                {
                    const fn = mock.read = jest.fn()
                    const yaml = `
notionToken: NOTION_TOKEN
outDir: OUT_DIR
includes:
  - title: "DB_TITLE"
                    `
                    fn.mockReturnValue(yaml)
                    mockAsserts.push(() => {
                        expect(fn.mock.calls[0][0]).toBe("CONFIG_PATH");
                    })
                }
                container.register(DI.Domain.Infrastructure.System.ITextReader, {useValue: mock});
            }

            /*
             * Run
             */
            const testee = container.resolve<ConfigReadService>(DI.Application.Services.ConfigReadService);
            const actual = testee.read();

            /*
             * Assert
             */
            const exp = {
                notionToken: "NOTION_TOKEN",
                outDir: "OUT_DIR",
                includes: [
                    {
                        title: "DB_TITLE"
                    }
                ],
            } as Config
            assert.deepEqual(actual, exp);

            mockAsserts.forEach(asserts => asserts())
        });
    })
});