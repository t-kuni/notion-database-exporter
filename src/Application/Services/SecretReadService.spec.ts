import "../../bootstrap";
import {container} from "tsyringe";
import {DI} from "../../diTokens";
import {createMock} from "ts-auto-mock";
import {SecretReadService} from "./SecretReadService";
import {IArgumentProvider} from "../../Domain/Infrastructure/System/IArgumentProvider";
import {Arguments} from "../../Domain/Models/Arguments";
import {ITextReader} from "../../Domain/Infrastructure/System/ITextReader";
import Secret from "../../Domain/Models/Secret";

const assert = require('assert');

describe('SecretReadService', () => {
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
                        secret: "SECRET_PATH"
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
                    `
                    fn.mockReturnValue(yaml)
                    mockAsserts.push(() => {
                        expect(fn.mock.calls[0][0]).toBe("SECRET_PATH");
                    })
                }
                container.register(DI.Domain.Infrastructure.System.ITextReader, {useValue: mock});
            }

            /*
             * Run
             */
            const testee = container.resolve<SecretReadService>(DI.Application.Services.SecretReadService);
            const actual = testee.read();

            /*
             * Assert
             */
            const exp = {
                notionToken: "NOTION_TOKEN",
            } as Secret
            assert.deepEqual(actual, exp);

            mockAsserts.forEach(asserts => asserts())
        });
    })
});