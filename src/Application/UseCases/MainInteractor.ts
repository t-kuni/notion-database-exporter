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
import {ITargetDatabaseCheckService} from "../Services/ITargetDatabaseCheckService";
import {DatabaseTitleReadService} from "../Services/DatabaseTitleReadService";

@injectable()
export class MainInteractor {
    private notionAdapter: INotionAdapter;
    private databaseTitleReader: DatabaseTitleReadService;
    private notionAccessService: INotionAccessService;
    private textWriter: ITextWriter;
    private directory: IDirectory;
    private notionDbToArrayService: NotionDbToArrayService;
    private targetDatabaseCheckService: ITargetDatabaseCheckService;
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
        @inject(DI.Application.Services.ITargetDatabaseCheckService) targetDatabaseCheckService: ITargetDatabaseCheckService,
        @inject(DI.Application.Services.DatabaseTitleReadService) databaseTitleReader: DatabaseTitleReadService,
    ) {
        this.databaseTitleReader = databaseTitleReader;
        this.targetDatabaseCheckService = targetDatabaseCheckService;
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
        const args = this.argumentProvider.getArgs();
        if (args.export) {
            await this.export()
        } else {
            await this.list()
        }
    }

    private async list() {
        const databases = await this.notionAccessService.fetchDatabases();
        for (const database of databases) {
            const title = this.databaseTitleReader.read(database);
            const id = database.id;

            this.stdOut.println(`${title} (${id})`)
        }
    }

    private async export() {
        const config = this.configReader.read();

        const databases = await this.notionAccessService.fetchDatabases();
        for (const database of databases) {
            const title = this.databaseTitleReader.read(database);
            const id = database.id;

            const includes = Array.isArray(config.includes) ? config.includes : [];
            const excludes = Array.isArray(config.excludes) ? config.excludes : [];
            const skip = !this.targetDatabaseCheckService.isTargetDatabase(database, includes, excludes)

            this.stdOut.println((skip ? "(SKIP) " : "") + `${title} (${id})`)

            if (skip) continue;

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