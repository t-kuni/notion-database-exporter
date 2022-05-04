import {inject, injectable, singleton} from "tsyringe";
import {DI} from "../../diTokens";
import {ITextReader} from "../../Domain/Infrastructure/System/ITextReader";
import Config from "../../Domain/Models/Config";
import {parse} from "yaml";
import {IArgumentProvider} from "../../Domain/Infrastructure/System/IArgumentProvider";

@injectable()
@singleton()
export class ConfigReadService {
    private textReader: ITextReader;
    private argumentProvider: IArgumentProvider;
    private configCache: Config;

    constructor(
        @inject(DI.Domain.Infrastructure.System.IArgumentProvider) argumentProvider: IArgumentProvider,
        @inject(DI.Domain.Infrastructure.System.ITextReader) textReader: ITextReader,
    ) {
        this.argumentProvider = argumentProvider;
        this.textReader = textReader;
        this.configCache = null;
    }

    read(): Config {
        if (this.configCache) {
            return this.configCache;
        }

        let configYaml;
        try {
            configYaml = this.textReader.read(this.getConfigPath())
        } catch (err) {
            if (typeof err.code === "string" && err.code === 'ENOENT') {
                return this.configCache = this.getDefaultConfig();
            } else {
                throw err;
            }
        }
        return this.configCache = parse(configYaml) as Config
    }

    private getConfigPath(): string {
        const args = this.argumentProvider.getArgs();
        return args.config;
    }

    private getDefaultConfig(): Config {
        return {
            notionToken: "",
            outDir: "./notion-db-csv",
            excludes: [],
            includes: []
        } as Config
    }
}