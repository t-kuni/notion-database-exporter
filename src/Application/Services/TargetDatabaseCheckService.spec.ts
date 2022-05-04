import "../../bootstrap";
import {container} from "tsyringe";
import {TargetDatabaseCheckService} from "./TargetDatabaseCheckService";
import {DI} from "../../diTokens";
import {FetchDatabaseResultDatabase} from "../../Domain/Infrastructure/Adapter/INotionAdapter";
import {ITargetDatabaseCheckService} from "./ITargetDatabaseCheckService";
import {ConfigTargetDatabase} from "../../Domain/Models/Config";

const assert = require('assert');

describe('TargetDatabaseCheckService', () => {
    describe('isTargetDatabase', () => {
        const testCases = [
            {
                title: "Should return true when dont specified includes/excludes",
                arg1: {
                    id: "ID1",
                    title: [
                        {
                            plain_text: "DB1"
                        }
                    ]
                } as FetchDatabaseResultDatabase,
                arg2: [] as Array<ConfigTargetDatabase>,
                arg3: [] as Array<ConfigTargetDatabase>,
                expect: true
            },
            {
                title: "Should return true when match id of includes",
                arg1: {
                    id: "ID1",
                    title: [
                        {
                            plain_text: "DB1"
                        }
                    ]
                } as FetchDatabaseResultDatabase,
                arg2: [
                    {
                        id: "ID1",
                        title: "",
                    },
                    {
                        id: "ID2",
                        title: "",
                    }
                ] as Array<ConfigTargetDatabase>,
                arg3: [] as Array<ConfigTargetDatabase>,
                expect: true
            },
            {
                title: "Should return false when dont match id of includes",
                arg1: {
                    id: "ID1",
                    title: [
                        {
                            plain_text: "DB1"
                        }
                    ]
                } as FetchDatabaseResultDatabase,
                arg2: [
                    {
                        id: "ID2",
                        title: "",
                    },
                    {
                        id: "ID3",
                        title: "",
                    }
                ] as Array<ConfigTargetDatabase>,
                arg3: [] as Array<ConfigTargetDatabase>,
                expect: false
            },
            {
                title: "Should return true when match title of includes",
                arg1: {
                    id: "ID1",
                    title: [
                        {
                            plain_text: "DB1"
                        }
                    ]
                } as FetchDatabaseResultDatabase,
                arg2: [
                    {
                        id: "",
                        title: "DB1",
                    },
                    {
                        id: "",
                        title: "DB2",
                    }
                ] as Array<ConfigTargetDatabase>,
                arg3: [] as Array<ConfigTargetDatabase>,
                expect: true
            },
            {
                title: "Should return false when dont match title of includes",
                arg1: {
                    id: "ID1",
                    title: [
                        {
                            plain_text: "DB1"
                        }
                    ]
                } as FetchDatabaseResultDatabase,
                arg2: [
                    {
                        id: "",
                        title: "DB2",
                    },
                    {
                        id: "",
                        title: "DB3",
                    }
                ] as Array<ConfigTargetDatabase>,
                arg3: [] as Array<ConfigTargetDatabase>,
                expect: false
            },
            {
                title: "Should return false when match id of excludes",
                arg1: {
                    id: "ID1",
                    title: [
                        {
                            plain_text: "DB1"
                        }
                    ]
                } as FetchDatabaseResultDatabase,
                arg2: [] as Array<ConfigTargetDatabase>,
                arg3: [
                    {
                        id: "ID1",
                        title: "",
                    },
                    {
                        id: "ID2",
                        title: "",
                    }
                ] as Array<ConfigTargetDatabase>,
                expect: false
            },
            {
                title: "Should return true when dont match id of excludes",
                arg1: {
                    id: "ID1",
                    title: [
                        {
                            plain_text: "DB1"
                        }
                    ]
                } as FetchDatabaseResultDatabase,
                arg2: [] as Array<ConfigTargetDatabase>,
                arg3: [
                    {
                        id: "ID2",
                        title: "",
                    },
                    {
                        id: "ID3",
                        title: "",
                    }
                ] as Array<ConfigTargetDatabase>,
                expect: true
            },
            {
                title: "Should return false when match title of excludes",
                arg1: {
                    id: "ID1",
                    title: [
                        {
                            plain_text: "DB1"
                        }
                    ]
                } as FetchDatabaseResultDatabase,
                arg2: [] as Array<ConfigTargetDatabase>,
                arg3: [
                    {
                        id: "",
                        title: "DB1",
                    },
                    {
                        id: "",
                        title: "DB2",
                    }
                ] as Array<ConfigTargetDatabase>,
                expect: false
            },
            {
                title: "Should return true when dont match title of excludes",
                arg1: {
                    id: "ID1",
                    title: [
                        {
                            plain_text: "DB1"
                        }
                    ]
                } as FetchDatabaseResultDatabase,
                arg2: [] as Array<ConfigTargetDatabase>,
                arg3: [
                    {
                        id: "",
                        title: "DB2",
                    },
                    {
                        id: "",
                        title: "DB3",
                    }
                ] as Array<ConfigTargetDatabase>,
                expect: true
            }
        ] as Array<any>

        const testee = container.resolve<ITargetDatabaseCheckService>(DI.Application.Services.ITargetDatabaseCheckService);
        for (const [i, testCase] of testCases.entries()) {
            test(testCase.title, async () => {
                const actual = testee.isTargetDatabase(testCase.arg1, testCase.arg2, testCase.arg3);
                assert.deepEqual(actual, testCase.expect);
            });
        }
    });
});