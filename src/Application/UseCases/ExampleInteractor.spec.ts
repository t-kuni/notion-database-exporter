import "../../bootstrap";
import {container} from "tsyringe";
import {ExampleInteractor} from "./ExampleInteractor";
import {IStdOut} from "../../Domain/Infrastructure/System/IStdOut";
import {createMock} from 'ts-auto-mock';
import {DI} from "../../diTokens";
import {ConfigReadService} from "../Services/ConfigReadService";
import {NotionAdapter} from "../../Infrastructure/Adapter/NotionAdapter";
import {INotionAccessService} from "../Services/INotionAccessService";
import {ITextWriter} from "../../Domain/Infrastructure/System/ITextWriter";
import JestMockPromise from "jest-mock-promise";
import {
    FetchDatabaseResultDatabase,
    QueryDatabaseResultRow,
    RetrieveDatabaseResult
} from "../../Domain/Infrastructure/Adapter/INotionAdapter";
import Config from "../../Domain/Models/Config";
import {IDirectory} from "../../Domain/Infrastructure/System/IDirectory";

const assert = require('assert');

describe('ExampleInteractor', () => {
    describe('exec', () => {
        test('Should return normal value', async () => {
            /*
             * Prepare
             */
            const mockAsserts = [];
            {
                const mock = createMock<IStdOut>();
                {
                    const fn = mock.println = jest.fn((msg: string) => null)
                    mockAsserts.push(() => {
                    })
                }
                container.register(DI.Domain.Infrastructure.System.IStdOut, {useValue: mock});
            }
            {
                const mock = createMock<ConfigReadService>();
                {
                    const fn = mock.read = jest.fn()
                    const c = new Config();
                    c.outDir = 'TEST_OUT_DIR';
                    c.notionToken = 'TEST_NOTION_TOKEN';
                    fn.mockReturnValue(c);
                    mockAsserts.push(() => {
                    })
                }
                container.register(DI.Application.Services.ConfigReadService, {useValue: mock});
            }
            {
                const mock = createMock<NotionAdapter>();
                {
                    const fn = mock.retrieveDatabase = jest.fn()
                    fn.mockReturnValueOnce(new JestMockPromise<RetrieveDatabaseResult>((r, _) => {
                        r({
                            object: "database",
                            properties: {
                                "PROP1": {},
                            }
                        });
                    }))
                    mockAsserts.push(() => {
                    })
                }
                container.register(DI.Domain.Infrastructure.Adapters.INotionAdapter, {useValue: mock});
            }
            {
                const mock = createMock<INotionAccessService>();
                {
                    const fn = mock.fetchDatabases = jest.fn();
                    fn.mockReturnValueOnce(new JestMockPromise<Array<FetchDatabaseResultDatabase>>((r, _) => {
                        r([
                            {
                                id: "ID1",
                                title: [
                                    {
                                        plain_text: "DB1"
                                    }
                                ]
                            }
                        ]);
                    }))
                }
                {
                    const fn = mock.queryDatabaseRows = jest.fn();
                    fn.mockReturnValueOnce(new JestMockPromise<Array<QueryDatabaseResultRow>>((r, _) => {
                        r([
                            {
                                properties: {
                                    "PROP1": {
                                        type: "number",
                                        number: 1,
                                    }
                                }
                            }
                        ]);
                    }))
                }
                container.register(DI.Application.Services.INotionAccessService, {useValue: mock});
            }
            {
                const mock = createMock<ITextWriter>();
                {
                    const fn = mock.write = jest.fn()
                    mockAsserts.push(() => {
                        const expectCsv = "PROP1\n1\n"
                        expect(fn.mock.calls[0][0]).toBe("TEST_OUT_DIR/DB1.csv");
                        expect(fn.mock.calls[0][1]).toBe(expectCsv);
                    })
                }
                container.register(DI.Domain.Infrastructure.System.ITextWriter, {useValue: mock});
            }
            {
                const mock = createMock<IDirectory>();
                {
                    const fn = mock.mkdir = jest.fn()
                    mockAsserts.push(() => {
                        expect(fn.mock.calls[0][0]).toBe("TEST_OUT_DIR");
                    })
                }
                container.register(DI.Domain.Infrastructure.System.IDirectory, {useValue: mock});
            }

            /*
             * Run
             */
            const testee = container.resolve<ExampleInteractor>(DI.Application.UseCases.ExampleInteractor);
            await testee.exec();

            /*
             * Assert
             */
            assert.equal(true, true);
            mockAsserts.forEach(asserts => asserts())
        });
    });
});