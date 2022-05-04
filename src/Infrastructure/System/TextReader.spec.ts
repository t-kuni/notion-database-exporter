import "../../bootstrap";
import {container} from "tsyringe";
import {TextReader} from "./TextReader";
import {DI} from "../../diTokens";

describe('TextReader', () => {
    describe('read', () => {
        test.skip('ping', async () => {
            const testee = container.resolve<TextReader>(DI.Domain.Infrastructure.System.ITextReader);
            const config = testee.read('./config.yml');
            expect(config).not.toBeNull()
        });
    });
});