import {inject, injectable} from "tsyringe";
import {DI} from "../../diTokens";
import {FetchDatabaseResultDatabase} from "../../Domain/Infrastructure/Adapter/INotionAdapter";
import {ITargetDatabaseCheckService} from "./ITargetDatabaseCheckService";
import {ConfigReadService} from "./ConfigReadService";
import {ConfigTargetDatabase} from "../../Domain/Models/Config";

@injectable()
export class TargetDatabaseCheckService implements ITargetDatabaseCheckService {
    private configReader: ConfigReadService;

    constructor(
        @inject(DI.Application.Services.ConfigReadService) configReader: ConfigReadService,
    ) {
        this.configReader = configReader;
    }

    isTargetDatabase(db: FetchDatabaseResultDatabase, includes: Array<ConfigTargetDatabase>, excludes: Array<ConfigTargetDatabase>): boolean {
        if (includes.length > 0) {
            const includeTitles = includes.map(i => i.title).filter(title => title !== null && title !== undefined && title !== "");
            const includeIds = includes.map(i => i.id).filter(id => id !== null && id !== undefined && id !== "");
            return includeTitles.includes(db.title[0].plain_text) || includeIds.includes(db.id);
        }

        if (excludes.length > 0) {
            const excludeTitles = excludes.map(i => i.title).filter(title => title !== null && title !== undefined && title !== "");
            const excludeIds = excludes.map(i => i.id).filter(id => id !== null && id !== undefined && id !== "");
            return !(excludeTitles.includes(db.title[0].plain_text) || excludeIds.includes(db.id));
        }

        return true;
    }
}