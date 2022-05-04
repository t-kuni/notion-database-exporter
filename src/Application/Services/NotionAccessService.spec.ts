import "../../bootstrap";
import {container} from "tsyringe";
import {DI} from "../../diTokens";
import {
    FetchDatabaseResult,
    FetchDatabaseResultDatabase,
    INotionAdapter,
    QueryDatabaseResult,
    QueryDatabaseResultRow,
} from "../../Domain/Infrastructure/Adapter/INotionAdapter";
import {createMock} from "ts-auto-mock";
import JestMockPromise from 'jest-mock-promise';
import {INotionAccessService} from "./INotionAccessService";

const assert = require('assert');

describe('NotionAccessService', () => {
    describe("fetchDatabases", () => {
        test('Should return normal value', async () => {
            /*
             * Prepare
             */
            const mockAsserts = [];
            {
                const mock = createMock<INotionAdapter>();
                {
                    const fn = mock.fetchDatabaseList = jest.fn()
                    fn.mockReturnValueOnce(new JestMockPromise<FetchDatabaseResult>((r, _) => {
                        r({
                            object: "list",
                            results: [
                                {
                                    id: "ID1",
                                    title: [
                                        {
                                            plain_text: "DB1"
                                        }
                                    ]
                                }
                            ],
                            next_cursor: "CURSOR1",
                        });
                    }))
                    fn.mockReturnValueOnce(new JestMockPromise<FetchDatabaseResult>((r, _) => {
                        r({
                            object: "list",
                            results: [
                                {
                                    id: "ID2",
                                    title: [
                                        {
                                            plain_text: "DB2"
                                        }
                                    ]
                                }
                            ],
                            next_cursor: null,
                        });
                    }))
                    mockAsserts.push(() => {
                        expect(fn.mock.calls[0][0]).toBeNull();
                        expect(fn.mock.calls[1][0]).toBe("CURSOR1");
                    })
                }
                container.register(DI.Domain.Infrastructure.Adapters.INotionAdapter, {useValue: mock});
            }

            /*
             * Run
             */
            const testee = container.resolve<INotionAccessService>(DI.Application.Services.INotionAccessService);
            const actual = await testee.fetchDatabases();

            /*
             * Assert
             */
            const exp = [
                {
                    id: "ID1",
                    title: [
                        {
                            plain_text: "DB1"
                        }
                    ]
                },
                {
                    id: "ID2",
                    title: [
                        {
                            plain_text: "DB2"
                        }
                    ]
                },
            ] as Array<FetchDatabaseResultDatabase>
            assert.deepEqual(actual, exp);

            mockAsserts.forEach(asserts => asserts())
        });
    })

    describe("queryDatabase", () => {
        test('Should return normal value', async () => {
            /*
             * Prepare
             */
            const mockAsserts = [];
            {
                const mock = createMock<INotionAdapter>();
                {
                    const fn = mock.queryDatabase = jest.fn()
                    fn.mockReturnValueOnce(new JestMockPromise<QueryDatabaseResult>((r, _) => {
                        r({
                            object: "list",
                            results: [
                                {
                                    properties: {
                                        dummy: {
                                            type: "number",
                                            number: 1,
                                        }
                                    }
                                }
                            ],
                            next_cursor: "CURSOR1"
                        });
                    }))
                    fn.mockReturnValueOnce(new JestMockPromise<QueryDatabaseResult>((r, _) => {
                        r({
                            object: "list",
                            results: [
                                {
                                    properties: {
                                        dummy: {
                                            type: "number",
                                            number: 2,
                                        }
                                    }
                                }
                            ],
                            next_cursor: null
                        });
                    }))
                    mockAsserts.push(() => {
                        expect(fn.mock.calls[0][0]).toBe("ID1");
                        expect(fn.mock.calls[0][1]).toBeNull();
                        expect(fn.mock.calls[1][0]).toBe("ID1");
                        expect(fn.mock.calls[1][1]).toBe("CURSOR1");
                    })
                }
                container.register(DI.Domain.Infrastructure.Adapters.INotionAdapter, {useValue: mock});
            }

            /*
             * Run
             */
            const testee = container.resolve<INotionAccessService>(DI.Application.Services.INotionAccessService);
            const actual = await testee.queryDatabaseRows("ID1");

            /*
             * Assert
             */
            const exp = [
                {
                    properties: {
                        dummy: {
                            type: "number",
                            number: 1,
                        }
                    }
                },
                {
                    properties: {
                        dummy: {
                            type: "number",
                            number: 2,
                        }
                    }
                }
            ] as Array<QueryDatabaseResultRow>
            assert.deepEqual(actual, exp);

            mockAsserts.forEach(asserts => asserts())
        });
    });
});