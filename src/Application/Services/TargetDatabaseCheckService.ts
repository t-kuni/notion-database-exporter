import {inject, injectable} from "tsyringe";
import {DI} from "../../diTokens";
import {FetchDatabaseResultDatabase} from "../../Domain/Infrastructure/Adapter/INotionAdapter";
import {ITargetDatabaseCheckService} from "./ITargetDatabaseCheckService";
import {ConfigReadService} from "./ConfigReadService";
import {ConfigTargetDatabase} from "../../Domain/Models/Config";
import {DatabaseTitleReadService} from "./DatabaseTitleReadService";

@injectable()
export class TargetDatabaseCheckService implements ITargetDatabaseCheckService {
    private configReader: ConfigReadService;
    private databaseTitleReader: DatabaseTitleReadService;

    constructor(
        @inject(DI.Application.Services.ConfigReadService) configReader: ConfigReadService,
        @inject(DI.Application.Services.DatabaseTitleReadService) databaseTitleReader: DatabaseTitleReadService,
    ) {
        this.databaseTitleReader = databaseTitleReader;
        this.configReader = configReader;
    }

    isTargetDatabase(db: FetchDatabaseResultDatabase, includes: Array<ConfigTargetDatabase>, excludes: Array<ConfigTargetDatabase>): boolean {
        if (includes.length > 0) {
            const includeTitles = includes.map(i => i.title).filter(title => title !== null && title !== undefined && title !== "");
            const includeIds = includes.map(i => i.id).filter(id => id !== null && id !== undefined && id !== "");
            return includeTitles.includes(this.databaseTitleReader.read(db)) || includeIds.includes(db.id);
        }

        if (excludes.length > 0) {
            const excludeTitles = excludes.map(i => i.title).filter(title => title !== null && title !== undefined && title !== "");
            const excludeIds = excludes.map(i => i.id).filter(id => id !== null && id !== undefined && id !== "");
            return !(excludeTitles.includes(this.databaseTitleReader.read(db)) || excludeIds.includes(db.id));
        }

        return true;
    }
}