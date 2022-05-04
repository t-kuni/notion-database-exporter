import {FetchDatabaseResultDatabase} from "../../Domain/Infrastructure/Adapter/INotionAdapter";
import {ConfigTargetDatabase} from "../../Domain/Models/Config";

export interface ITargetDatabaseCheckService {
    isTargetDatabase(db: FetchDatabaseResultDatabase, includes: Array<ConfigTargetDatabase>, excludes: Array<ConfigTargetDatabase>): boolean;
}