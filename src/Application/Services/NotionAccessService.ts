import {inject, injectable} from "tsyringe";
import {DI} from "../../diTokens";
import {
    FetchDatabaseResultDatabase,
    INotionAdapter,
    QueryDatabaseResultRow
} from "../../Domain/Infrastructure/Adapter/INotionAdapter";
import {INotionAccessService} from "./INotionAccessService";

@injectable()
export class NotionAccessService implements INotionAccessService {
    private notionAdapter: INotionAdapter;

    constructor(
        @inject(DI.Domain.Infrastructure.Adapters.INotionAdapter) notionAdapter: INotionAdapter,
    ) {
        this.notionAdapter = notionAdapter;
    }

    async fetchDatabases(): Promise<Array<FetchDatabaseResultDatabase>> {
        let startCursor = null;
        const databases = new Array<FetchDatabaseResultDatabase>();
        do {
            const response = await this.notionAdapter.fetchDatabaseList(startCursor)
            databases.push(...response.results)
            startCursor = response.next_cursor
        } while (startCursor !== null)
        return databases;
    }

    async queryDatabaseRows(id: string): Promise<Array<QueryDatabaseResultRow>> {
        let startCursor = null;
        const rows = new Array<QueryDatabaseResultRow>();
        do {
            const response = await this.notionAdapter.queryDatabase(id, startCursor)
            rows.push(...response.results)
            startCursor = response.next_cursor
        } while (startCursor !== null)
        return rows;
    }
}