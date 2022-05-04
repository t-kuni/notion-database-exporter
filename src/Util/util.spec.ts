import {hasKey} from "./util";

const assert = require('assert');

describe('Util', () => {
    describe("hasKey", () => {
        test('Should return normal value', async () => {
            const obj = {
                AAA: {
                    BBB: "TEST",
                }
            }
            {
                const actual = hasKey(obj, "AAA", "BBB");
                const expect = true;
                assert.equal(actual, expect)
            }
            {
                const actual = hasKey(obj, "AAA");
                const expect = true;
                assert.equal(actual, expect)
            }
            {
                const actual = hasKey(obj, "AAA", "CCC");
                const expect = false;
                assert.equal(actual, expect)
            }
        });
        test('Should return normal value (array)', async () => {
            const obj = {
                AAA: [
                    {
                        BBB: "TEST",
                    },
                    {
                        CCC: "TEST"
                    }
                ]
            }
            {
                const actual = hasKey(obj, "AAA", "0", "BBB");
                const expect = true;
                assert.equal(actual, expect)
            }
            {
                const actual = hasKey(obj, "AAA", "1", "CCC");
                const expect = true;
                assert.equal(actual, expect)
            }
            {
                const actual = hasKey(obj, "AAA", "2");
                const expect = false;
                assert.equal(actual, expect)
            }
        });
    })
});