import {inject, injectable} from "tsyringe";
import {DI} from "../../diTokens";
import {ITextReader} from "../../Domain/Infrastructure/System/ITextReader";
import Config from "../../Domain/Models/Config";
import {parse} from "yaml";

@injectable()
export class ConfigReadService {
    private textReader: ITextReader;

    constructor(
        @inject(DI.Domain.Infrastructure.System.ITextReader) textReader: ITextReader,
    ) {
        this.textReader = textReader;
    }

    read(path: string): Config|null {
        let configYaml;
        try {
            configYaml = this.textReader.read(path)
        } catch (err) {
            if (typeof err.code === "string" && err.code === 'ENOENT') {
                return new Config();
            } else {
                throw err;
            }
        }
        return parse(configYaml) as Config
    }
}