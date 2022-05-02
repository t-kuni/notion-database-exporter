import {ITextReader} from "../../Domain/Infrastructure/System/ITextReader";
import * as fs from 'fs'

export class TextReader implements ITextReader {
    read(path: string): string {
        return fs.readFileSync(path, 'utf8')
    }
}