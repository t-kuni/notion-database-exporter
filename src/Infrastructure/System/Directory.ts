import {IDirectory} from "../../Domain/Infrastructure/System/IDirectory";
import * as fs from 'fs'

export class Directory implements IDirectory {
    mkdir(path: string): void {
        fs.mkdirSync(path, { recursive: true })
    }
}