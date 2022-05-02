import "reflect-metadata";
import {container} from "tsyringe";
import {NotionDbToArrayService} from "./Application/Services/NotionDbToArrayService";
import {ExampleRepository} from "./Infrastructure/Repositories/ExampleRepository";
import {ExampleInteractor} from "./Application/UseCases/ExampleInteractor";
import {ArgumentProvider} from "./Infrastructure/System/ArgumentProvider";
import {StdOut} from "./Infrastructure/System/StdOut";
import {TextReader} from "./Infrastructure/System/TextReader";
import {ConfigReadService} from "./Application/Services/ConfigReadService";
import {DI} from "./diTokens";
import {NotionAdapter} from "./Infrastructure/Adapter/NotionAdapter";
import {TextWriter} from "./Infrastructure/System/TextWriter";
import {Directory} from "./Infrastructure/System/Directory";

// Application / UseCases
container.register(DI.Application.UseCases.ExampleInteractor, {useClass: ExampleInteractor});

// Application / Services
container.register(DI.Application.Services.ExampleService, {useClass: NotionDbToArrayService});
container.register(DI.Application.Services.ConfigReadService, {useClass: ConfigReadService});
container.register(DI.Application.Services.NotionDbToArrayService, {useClass: NotionDbToArrayService});

// Domain / Infrastructure / Adapter
container.register(DI.Domain.Infrastructure.Adapters.INotionAdapter, {useClass: NotionAdapter});

// Domain / Infrastructure / Repository
container.register(DI.Domain.Infrastructure.Repositories.IExampleRepository, {useClass: ExampleRepository});

// Domain / Infrastructure / System
container.register(DI.Domain.Infrastructure.System.IArgumentProvider, {useClass: ArgumentProvider});
container.register(DI.Domain.Infrastructure.System.IStdOut, {useClass: StdOut});
container.register(DI.Domain.Infrastructure.System.ITextReader, {useClass: TextReader});
container.register(DI.Domain.Infrastructure.System.ITextWriter, {useClass: TextWriter});
container.register(DI.Domain.Infrastructure.System.IDirectory, {useClass: Directory});