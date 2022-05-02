import "../../bootstrap";
import {container} from "tsyringe";
import {ExampleInteractor} from "./ExampleInteractor";
import {IStdOut} from "../../Domain/Infrastructure/System/IStdOut";
import {createMock} from 'ts-auto-mock';
import {ITextReader} from "../../Domain/Infrastructure/System/ITextReader";
import {DI} from "../../diTokens";

const assert = require('assert');

describe('ExampleInteractor#exec', () => {
    it('exec', async () => {
        /*
         * Prepare
         */
        const mockAsserts = [];
        {
            const mock = createMock<IStdOut>();
            {
                const fn = mock.println = jest.fn((msg: string) => null)
                mockAsserts.push(() => {
                    expect(fn.mock.calls.length).toBe(3);
                    expect(fn.mock.calls[0][0]).toBe("Hello from ExampleService.");
                    expect(fn.mock.calls[1][0]).toBe("Hello! test<test@test.test>");
                    expect(fn.mock.calls[2][0]).toBe("message: (message option didn't specified)");
                })
            }
            container.register(DI.Domain.Infrastructure.System.IStdOut, {useValue: mock});
        }
        {
            const mock = createMock<ITextReader>();
            {
                const mockConfigYaml = "name: test\nemail: test@test.test"
                const fn = mock.read = jest.fn((path: string) => mockConfigYaml)
                mockAsserts.push(() => {
                    expect(fn.mock.calls.length).toBe(1);
                })
            }
            container.register(DI.Domain.Infrastructure.System.ITextReader, {useValue: mock});
        }

        /*
         * Run
         */
        const interactor = container.resolve<ExampleInteractor>(DI.Application.UseCases.ExampleInteractor);
        interactor.exec();

        /*
         * Assert
         */
        assert.equal(true, true);
        mockAsserts.forEach(asserts => asserts())
    });
});