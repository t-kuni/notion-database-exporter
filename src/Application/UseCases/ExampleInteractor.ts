import {inject, injectable} from "tsyringe";
import {NotionDbToArrayService} from "../Services/NotionDbToArrayService";
import {ArgumentProvider} from "../../Infrastructure/System/ArgumentProvider";
import {StdOut} from "../../Infrastructure/System/StdOut";
import {ConfigReadService} from "../Services/ConfigReadService";
import {DI} from "../../diTokens";
import {INotionAdapter} from "../../Domain/Infrastructure/Adapter/INotionAdapter";
import {stringify as csvStringify} from 'csv-stringify/sync';
import {IDirectory} from "../../Domain/Infrastructure/System/IDirectory";
import {ITextWriter} from "../../Domain/Infrastructure/System/ITextWriter";

@injectable()
export class ExampleInteractor {
    private service: NotionDbToArrayService;
    private notionAdapter: INotionAdapter;
    private textWriter: ITextWriter;
    private directory: IDirectory;
    private notionDbToArrayService: NotionDbToArrayService;
    private configReader: ConfigReadService;
    private stdOut: StdOut;
    private argumentProvider: ArgumentProvider;

    constructor(
        @inject(DI.Application.Services.ExampleService) service: NotionDbToArrayService,
        @inject(DI.Domain.Infrastructure.System.IStdOut) stdOut: StdOut,
        @inject(DI.Domain.Infrastructure.System.IArgumentProvider) argumentProvider: ArgumentProvider,
        @inject(DI.Application.Services.ConfigReadService) configReader: ConfigReadService,
        @inject(DI.Domain.Infrastructure.Adapters.INotionAdapter) notionAdapter: INotionAdapter,
        @inject(DI.Application.Services.NotionDbToArrayService) notionDbToArrayService: NotionDbToArrayService,
        @inject(DI.Domain.Infrastructure.System.IDirectory) directory: IDirectory,
        @inject(DI.Domain.Infrastructure.System.ITextWriter) textWriter: ITextWriter,
    ) {
        this.textWriter = textWriter;
        this.directory = directory;
        this.notionDbToArrayService = notionDbToArrayService;
        this.notionAdapter = notionAdapter;
        this.configReader = configReader;
        this.stdOut = stdOut;
        this.argumentProvider = argumentProvider;
        this.service = service;
    }

    async exec() {
        const args = this.argumentProvider.getArgs();
        const config = this.configReader.read();

        const response = await this.notionAdapter.fetchDatabaseList()
        for (const result of response.results) {
            const title = result.title[0].plain_text;
            const id = result.id;
            this.stdOut.println(`${title} (${id})`)

            const retrieveResult = await this.notionAdapter.retrieveDatabase(id)
            const queryResult = await this.notionAdapter.queryDatabase(id)
            const rows = this.notionDbToArrayService.toArray(retrieveResult, queryResult)
            const csvText = csvStringify(rows)
            this.directory.mkdir(config.outDir)
            const outPath = `${config.outDir}/${title}.csv`
            this.textWriter.write(outPath, csvText)
        }
    }
}