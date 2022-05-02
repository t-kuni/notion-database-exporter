import "../../bootstrap";
import {container} from "tsyringe";
import {DI} from "../../diTokens";
import {INotionAdapter} from "../../Domain/Infrastructure/Adapter/INotionAdapter";

describe('NotionAdapter#fetchDatabaseList', () => {
    it('疎通確認', async () => {
        /*
         * Prepare
         */

        /*
         * Run
         */
        const testee = container.resolve<INotionAdapter>(DI.Domain.Infrastructure.Adapters.INotionAdapter);
        const actual = await testee.fetchDatabaseList();

        /*
         * Assert
         */
        expect(actual).not.toBeNull()
    });
});