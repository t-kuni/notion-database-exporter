import "../../bootstrap";
import {container} from "tsyringe";
import {NotionDbToArrayService} from "./NotionDbToArrayService";
import {DI} from "../../diTokens";
import {QueryDatabaseResult, RetrieveDatabaseResult} from "../../Domain/Infrastructure/Adapter/INotionAdapter";

const assert = require('assert');

describe('NotionDbToArrayService#toArray', () => {
    it('toArray', async () => {
        /*
         * Prepare
         */

        /*
         * Run
         */
        const retrieveResult = {
            object: "database",
            properties: {
                "PROP1": {},
                "PROP2": {},
                "PROP3": {},
                "PROP4": {},
                "PROP5": {},
                "PROP6": {},
                "PROP7": {},
                "PROP8": {},
                "PROP9": {},
                "PROP10": {},
                "PROP11": {},
            }
        } as RetrieveDatabaseResult
        const queryResult = {
            object: "list",
            results: [
                {
                    properties: {
                        "PROP1": {
                            type: "select",
                            select: {
                                name: "PROP1_VALUE1"
                            }
                        },
                        "PROP2": {
                            type: "title",
                            title: [
                                {
                                    plain_text: "PROP2_VALUE1"
                                }
                            ]
                        },
                        "PROP3": {
                            type: "rich_text",
                            rich_text: [
                                {
                                    plain_text: "PROP3_VALUE1"
                                }
                            ]
                        },
                        "PROP4": {
                            type: "relation",
                            relation: [
                                {
                                    id: "PROP4_VALUE1_ITEM1"
                                },
                                {
                                    id: "PROP4_VALUE1_ITEM2"
                                }
                            ]
                        },
                        "PROP5": {
                            type: "formula",
                            formula: {
                                type: "string",
                                string: "PROP5_VALUE1"
                            }
                        },
                        "PROP6": {
                            type: "number",
                            number: 100,
                        },
                        "PROP7": {
                            type: "rollup",
                            rollup: {
                                type: "array",
                                array: [
                                    {
                                        type: "formula",
                                        formula: {
                                            type: "string",
                                            string: "PROP7_VALUE1"
                                        }
                                    },
                                    {
                                        type: "formula",
                                        formula: {
                                            type: "number",
                                            number: 200
                                        }
                                    }
                                ]
                            },
                        },
                        "PROP8": {
                            type: "multi_select",
                            multi_select: [
                                {
                                    name: "PROP8_VALUE1"
                                },
                                {
                                    name: "PROP8_VALUE2"
                                },
                            ]
                        },
                        "PROP9": {
                            type: "number",
                            number: null,
                        },
                        "PROP10": {
                            type: "checkbox",
                            checkbox: true,
                        },
                        "PROP11": {
                            type: "select",
                            select: null,
                        },
                    }
                }
            ],
        } as QueryDatabaseResult
        const testee = container.resolve<NotionDbToArrayService>(DI.Application.Services.NotionDbToArrayService);
        const actual = testee.toArray(retrieveResult, queryResult);

        /*
         * Assert
         */
        const expect = [
            [
                "PROP1",
                "PROP2",
                "PROP3",
                "PROP4",
                "PROP5",
                "PROP6",
                "PROP7",
                "PROP8",
                "PROP9",
                "PROP10",
                "PROP11",
            ],
            [
                "PROP1_VALUE1",
                "PROP2_VALUE1",
                "PROP3_VALUE1",
                "PROP4_VALUE1_ITEM1,PROP4_VALUE1_ITEM2",
                "PROP5_VALUE1",
                "100",
                "PROP7_VALUE1,200",
                "PROP8_VALUE1,PROP8_VALUE2",
                "",
                "true",
                "",
            ],
        ]
        assert.deepEqual(actual, expect);
    });
});