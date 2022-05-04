import "../../bootstrap";
import {container} from "tsyringe";
import {TextWriter} from "./TextWriter";
import {DI} from "../../diTokens";

describe('TextWriter', () => {
    describe('write', () => {
        test.skip('ping', async () => {
            const testee = container.resolve<TextWriter>(DI.Domain.Infrastructure.System.ITextWriter);
            testee.write('./test.txt', 'aaaaaa');
        });
    });
});