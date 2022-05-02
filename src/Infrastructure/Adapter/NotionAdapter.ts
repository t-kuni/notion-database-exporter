import {INotionAdapter} from "../../Domain/Infrastructure/Adapter/INotionAdapter";
import {Client} from "@notionhq/client";
import {inject, injectable} from "tsyringe";
import {DI} from "../../diTokens";
import {ConfigReadService} from "../../Application/Services/ConfigReadService";
import {SearchResponse} from "@notionhq/client/build/src/api-endpoints";

@injectable()
export class NotionAdapter implements INotionAdapter {
    private client: Client;

    constructor(
        @inject(DI.Application.Services.ConfigReadService) configReader: ConfigReadService,
    ) {
        const config = configReader.read();

        if (config.notionToken == "") throw new Error("API token of Notion isn't specified")

        this.client = new Client({
            auth: config.notionToken,
        })
    }

    async fetchDatabaseList(): Promise<SearchResponse> {
        const response = await this.client.search({
            query: 'task',
            sort: {
                direction: 'ascending',
                timestamp: 'last_edited_time',
            },
        });
        return response;
    }
}