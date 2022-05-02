import {inject, injectable} from "tsyringe";
import {ExampleService} from "../Services/ExampleService";
import {ArgumentProvider} from "../../Infrastructure/System/ArgumentProvider";
import {StdOut} from "../../Infrastructure/System/StdOut";
import {ConfigReadService} from "../Services/ConfigReadService";
import {DI} from "../../diTokens";

@injectable()
export class ExampleInteractor {
    private service: ExampleService;
    private configReader: ConfigReadService;
    private stdOut: StdOut;
    private argumentProvider: ArgumentProvider;

    constructor(
        @inject(DI.Application.Services.ExampleService) service: ExampleService,
        @inject(DI.Domain.Infrastructure.System.IStdOut) stdOut: StdOut,
        @inject(DI.Domain.Infrastructure.System.IArgumentProvider) argumentProvider: ArgumentProvider,
        @inject(DI.Application.Services.ConfigReadService) configReader: ConfigReadService,
    ) {
        this.configReader = configReader;
        this.stdOut = stdOut;
        this.argumentProvider = argumentProvider;
        this.service = service;
    }

    exec() {
        this.service.exec();

        const args = this.argumentProvider.getArgs();
        const config = this.configReader.read()
    }
}