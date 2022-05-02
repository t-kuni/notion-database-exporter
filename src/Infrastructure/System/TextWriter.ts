import {ITextWriter} from "../../Domain/Infrastructure/System/ITextWriter";
import * as fs from 'fs'

export class TextWriter implements ITextWriter {
    write(path: string, content: string): void {
        return fs.writeFileSync(path, content, {
            encoding: 'utf8'
        })
    }
}