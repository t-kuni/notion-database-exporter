import "../../bootstrap";
import {container} from "tsyringe";
import {DI} from "../../diTokens";
import {INotionAdapter} from "../../Domain/Infrastructure/Adapter/INotionAdapter";

describe('NotionAdapter', () => {
    describe('fetchDatabaseList', () => {
        test.skip('ping', async () => {
            const testee = container.resolve<INotionAdapter>(DI.Domain.Infrastructure.Adapters.INotionAdapter);
            const actual = await testee.fetchDatabaseList();
            expect(actual).not.toBeNull()
        });

        test.skip('ping2', async () => {
            const testee = container.resolve<INotionAdapter>(DI.Domain.Infrastructure.Adapters.INotionAdapter);
            const actual = await testee.fetchDatabaseList("5a6db4bb-5695-4986-bc7f-8de99f2a92a9");
            expect(actual).not.toBeNull()
        });
    });
});

describe('NotionAdapter', () => {
    describe('queryDatabase', () => {
        test.skip('ping', async () => {
            const testee = container.resolve<INotionAdapter>(DI.Domain.Infrastructure.Adapters.INotionAdapter);
            const actual = await testee.queryDatabase("959e155b-5485-4c80-b418-4c7a9e836a7c");
            expect(actual).not.toBeNull()
        });
    });
});

describe('NotionAdapter', () => {
    describe('retrieveDatabase', () => {
        test.skip('ping', async () => {
            const testee = container.resolve<INotionAdapter>(DI.Domain.Infrastructure.Adapters.INotionAdapter);
            const actual = await testee.retrieveDatabase("959e155b-5485-4c80-b418-4c7a9e836a7c");
            expect(actual).not.toBeNull()
        });
    });
});