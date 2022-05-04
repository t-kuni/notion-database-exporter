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
import {INotionAccessService} from "../Services/INotionAccessService";

@injectable()
export class ExampleInteractor {
    private notionAdapter: INotionAdapter;
    private notionAccessService: INotionAccessService;
    private textWriter: ITextWriter;
    private directory: IDirectory;
    private notionDbToArrayService: NotionDbToArrayService;
    private configReader: ConfigReadService;
    private stdOut: StdOut;
    private argumentProvider: ArgumentProvider;

    constructor(
        @inject(DI.Domain.Infrastructure.System.IStdOut) stdOut: StdOut,
        @inject(DI.Domain.Infrastructure.System.IArgumentProvider) argumentProvider: ArgumentProvider,
        @inject(DI.Application.Services.ConfigReadService) configReader: ConfigReadService,
        @inject(DI.Domain.Infrastructure.Adapters.INotionAdapter) notionAdapter: INotionAdapter,
        @inject(DI.Application.Services.NotionDbToArrayService) notionDbToArrayService: NotionDbToArrayService,
        @inject(DI.Application.Services.INotionAccessService) notionAccessService: INotionAccessService,
        @inject(DI.Domain.Infrastructure.System.IDirectory) directory: IDirectory,
        @inject(DI.Domain.Infrastructure.System.ITextWriter) textWriter: ITextWriter,
    ) {
        this.notionAccessService = notionAccessService;
        this.textWriter = textWriter;
        this.directory = directory;
        this.notionDbToArrayService = notionDbToArrayService;
        this.notionAdapter = notionAdapter;
        this.configReader = configReader;
        this.stdOut = stdOut;
        this.argumentProvider = argumentProvider;
    }

    async exec() {
        const config = this.configReader.read();

        const databases = await this.notionAccessService.fetchDatabases();
        for (const database of databases) {
            const title = database.title[0].plain_text;
            const id = database.id;
            this.stdOut.println(`${title} (${id})`)

            const retrieveResult = await this.notionAdapter.retrieveDatabase(id)
            const rows = await this.notionAccessService.queryDatabaseRows(id)
            const csvRows = this.notionDbToArrayService.toArray(retrieveResult, rows)
            const csvText = csvStringify(csvRows)
            this.directory.mkdir(config.outDir)
            const outPath = `${config.outDir}/${title}.csv`
            this.textWriter.write(outPath, csvText)
        }
    }
}