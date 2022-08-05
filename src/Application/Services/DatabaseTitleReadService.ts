import {injectable, singleton} from "tsyringe";
import {FetchDatabaseResultDatabase} from "../../Domain/Infrastructure/Adapter/INotionAdapter";

@injectable()
@singleton()
export class DatabaseTitleReadService {

    constructor() {
    }

    read(db: FetchDatabaseResultDatabase): string {
        return db.title.map(t => t.plain_text).join('');
    }
}