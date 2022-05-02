import {inject, injectable} from "tsyringe";
import {NotionDbToArrayService} from "../Services/NotionDbToArrayService";
import {ArgumentProvider} from "../../Infrastructure/System/ArgumentProvider";
import {StdOut} from "../../Infrastructure/System/StdOut";
import {ConfigReadService} from "../Services/ConfigReadService";
import {DI} from "../../diTokens";
import {INotionAdapter} from "../../Domain/Infrastructure/Adapter/INotionAdapter";

@injectable()
export class ExampleInteractor {
    private service: NotionDbToArrayService;
    private notionAdapter: INotionAdapter;
    private configReader: ConfigReadService;
    private stdOut: StdOut;
    private argumentProvider: ArgumentProvider;

    constructor(
        @inject(DI.Application.Services.ExampleService) service: NotionDbToArrayService,
        @inject(DI.Domain.Infrastructure.System.IStdOut) stdOut: StdOut,
        @inject(DI.Domain.Infrastructure.System.IArgumentProvider) argumentProvider: ArgumentProvider,
        @inject(DI.Application.Services.ConfigReadService) configReader: ConfigReadService,
        @inject(DI.Domain.Infrastructure.Adapters.INotionAdapter) notionAdapter: INotionAdapter,
    ) {
        this.notionAdapter = notionAdapter;
        this.configReader = configReader;
        this.stdOut = stdOut;
        this.argumentProvider = argumentProvider;
        this.service = service;
    }

    async exec() {
        const args = this.argumentProvider.getArgs();

        if (args.list) {
            const response = await this.notionAdapter.fetchDatabaseList()
            response.results.forEach((result) => {
                const title = result.title[0].plain_text;
                const id = result.id;
                this.stdOut.println(`${title} (${id})`)
            })
        } else {
            const retrieveResult = await this.notionAdapter.retrieveDatabase("5a6db4bb-5695-4986-bc7f-8de99f2a92a9")
            const propNames = Object.keys(retrieveResult.properties);
            const queryResult = await this.notionAdapter.queryDatabase("5a6db4bb-5695-4986-bc7f-8de99f2a92a9")
            queryResult.results.forEach((result) => {
                propNames.forEach((propName) => {
                    const prop = result.properties[propName];
                    switch (prop.type) {
                        case "select":
                            prop.select.name
                            break;
                    }
                })
            })
        }
    }
}