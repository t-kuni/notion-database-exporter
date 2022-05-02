import "../../bootstrap";
import {container} from "tsyringe";
import {DI} from "../../diTokens";
import {INotionAdapter} from "../../Domain/Infrastructure/Adapter/INotionAdapter";

describe('NotionAdapter#fetchDatabaseList', () => {
    it('疎通確認', async () => {
        const testee = container.resolve<INotionAdapter>(DI.Domain.Infrastructure.Adapters.INotionAdapter);
        const actual = await testee.fetchDatabaseList();
        expect(actual).not.toBeNull()
    });
});

describe('NotionAdapter#queryDatabase', () => {
    it('疎通確認', async () => {
        const testee = container.resolve<INotionAdapter>(DI.Domain.Infrastructure.Adapters.INotionAdapter);
        const actual = await testee.queryDatabase("5a6db4bb-5695-4986-bc7f-8de99f2a92a9");
        expect(actual).not.toBeNull()
    });
});

describe('NotionAdapter#retrieveDatabase', () => {
    it('疎通確認', async () => {
        const testee = container.resolve<INotionAdapter>(DI.Domain.Infrastructure.Adapters.INotionAdapter);
        const actual = await testee.retrieveDatabase("5a6db4bb-5695-4986-bc7f-8de99f2a92a9");
        expect(actual).not.toBeNull()
    });
});