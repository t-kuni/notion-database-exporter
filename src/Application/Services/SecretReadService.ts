import {inject, injectable, singleton} from "tsyringe";
import {DI} from "../../diTokens";
import {ITextReader} from "../../Domain/Infrastructure/System/ITextReader";
import {parse} from "yaml";
import {IArgumentProvider} from "../../Domain/Infrastructure/System/IArgumentProvider";
import Secret from "../../Domain/Models/Secret";

@injectable()
@singleton()
export class SecretReadService {
    private textReader: ITextReader;
    private argumentProvider: IArgumentProvider;
    private secretCache: Secret;

    constructor(
        @inject(DI.Domain.Infrastructure.System.IArgumentProvider) argumentProvider: IArgumentProvider,
        @inject(DI.Domain.Infrastructure.System.ITextReader) textReader: ITextReader,
    ) {
        this.argumentProvider = argumentProvider;
        this.textReader = textReader;
        this.secretCache = null;
    }

    read(): Secret {
        if (this.secretCache) {
            return this.secretCache;
        }

        let secretYaml;
        try {
            secretYaml = this.textReader.read(this.getSecretPath())
        } catch (err) {
            if (typeof err.code === "string" && err.code === 'ENOENT') {
                return this.secretCache = this.getDefaultSecret();
            } else {
                throw err;
            }
        }
        return this.secretCache = parse(secretYaml) as Secret
    }

    private getSecretPath(): string {
        const args = this.argumentProvider.getArgs();
        return args.secret;
    }

    private getDefaultSecret(): Secret {
        return {
            notionToken: "",
        } as Secret
    }
}