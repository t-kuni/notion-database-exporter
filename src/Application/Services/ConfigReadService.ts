import {inject, injectable} from "tsyringe";
import {DI} from "../../diTokens";
import {ITextReader} from "../../Domain/Infrastructure/System/ITextReader";
import Config from "../../Domain/Models/Config";
import {parse} from "yaml";
import {IArgumentProvider} from "../../Domain/Infrastructure/System/IArgumentProvider";

@injectable()
export class ConfigReadService {
    private textReader: ITextReader;
    private argumentProvider: IArgumentProvider;

    constructor(
        @inject(DI.Domain.Infrastructure.System.IArgumentProvider) argumentProvider: IArgumentProvider,
        @inject(DI.Domain.Infrastructure.System.ITextReader) textReader: ITextReader,
    ) {
        this.argumentProvider = argumentProvider;
        this.textReader = textReader;
    }

    read(): Config {
        let configYaml;
        try {
            configYaml = this.textReader.read(this.getConfigPath())
        } catch (err) {
            if (typeof err.code === "string" && err.code === 'ENOENT') {
                return new Config();
            } else {
                throw err;
            }
        }
        return parse(configYaml) as Config
    }

    private getConfigPath(): string {
        const args = this.argumentProvider.getArgs();
        return args.config;
    }
}