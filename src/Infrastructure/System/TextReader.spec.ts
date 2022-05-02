import "../../bootstrap";
import {container} from "tsyringe";
import {TextReader} from "./TextReader";
import {DI} from "../../diTokens";

describe('TextReader#read', () => {
    it.skip('read', async () => {
        /*
         * Prepare
         */

        /*
         * Run
         */
        const testee = container.resolve<TextReader>(DI.Domain.Infrastructure.System.ITextReader);
        const config = testee.read('./config.yml');

        /*
         * Assert
         */
        expect(config).not.toBeNull()
    });
});