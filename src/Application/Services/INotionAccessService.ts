import {FetchDatabaseResultDatabase, QueryDatabaseResultRow} from "../../Domain/Infrastructure/Adapter/INotionAdapter";

export interface INotionAccessService {
    fetchDatabases(): Promise<Array<FetchDatabaseResultDatabase>>;
    queryDatabaseRows(id: string): Promise<Array<QueryDatabaseResultRow>>;
}