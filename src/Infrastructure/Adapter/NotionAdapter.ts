import {
    FetchDatabaseResult,
    INotionAdapter,
    QueryDatabaseResult,
    RetrieveDatabaseResult
} from "../../Domain/Infrastructure/Adapter/INotionAdapter";
import {Client} from "@notionhq/client";
import {inject, injectable} from "tsyringe";
import {DI} from "../../diTokens";
import {SecretReadService} from "../../Application/Services/SecretReadService";
import {QueryDatabaseParameters, SearchParameters} from "@notionhq/client/build/src/api-endpoints";

@injectable()
export class NotionAdapter implements INotionAdapter {
    private client: Client;

    constructor(
        @inject(DI.Application.Services.SecretReadService) secretReader: SecretReadService,
    ) {
        const config = secretReader.read();

        if (config.notionToken == "") throw new Error("API token of Notion isn't specified")

        this.client = new Client({
            auth: config.notionToken,
        })
    }

    async fetchDatabaseList(startCursor: string = null): Promise<FetchDatabaseResult> {
        const param: SearchParameters = {
            filter: {
                value: "database",
                property: "object"
            },
        }

        if (startCursor) {
            param.start_cursor = startCursor;
        }

        const response = await this.client.search(param);
        return response as FetchDatabaseResult;
    }

    async queryDatabase(id: string, startCursor: string = null): Promise<QueryDatabaseResult> {
        const param: QueryDatabaseParameters = {
            database_id: id
        }

        if (startCursor) {
            param.start_cursor = startCursor;
        }

        const response = await this.client.databases.query(param);
        return response as QueryDatabaseResult;
    }

    async retrieveDatabase(id: string): Promise<RetrieveDatabaseResult> {
        const response = await this.client.databases.retrieve({database_id: id});
        return response as RetrieveDatabaseResult;
    }
}