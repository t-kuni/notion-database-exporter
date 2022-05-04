import "reflect-metadata";
import {container} from "tsyringe";
import {NotionDbToArrayService} from "./Application/Services/NotionDbToArrayService";
import {MainInteractor} from "./Application/UseCases/MainInteractor";
import {ArgumentProvider} from "./Infrastructure/System/ArgumentProvider";
import {StdOut} from "./Infrastructure/System/StdOut";
import {TextReader} from "./Infrastructure/System/TextReader";
import {ConfigReadService} from "./Application/Services/ConfigReadService";
import {DI} from "./diTokens";
import {NotionAdapter} from "./Infrastructure/Adapter/NotionAdapter";
import {TextWriter} from "./Infrastructure/System/TextWriter";
import {Directory} from "./Infrastructure/System/Directory";
import {NotionAccessService} from "./Application/Services/NotionAccessService";
import {TargetDatabaseCheckService} from "./Application/Services/TargetDatabaseCheckService";
import {SecretReadService} from "./Application/Services/SecretReadService";

// Application / UseCases
container.register(DI.Application.UseCases.MainInteractor, {useClass: MainInteractor});

// Application / Services
container.register(DI.Application.Services.ConfigReadService, {useClass: ConfigReadService});
container.register(DI.Application.Services.SecretReadService, {useClass: SecretReadService});
container.register(DI.Application.Services.NotionDbToArrayService, {useClass: NotionDbToArrayService});
container.register(DI.Application.Services.INotionAccessService, {useClass: NotionAccessService});
container.register(DI.Application.Services.ITargetDatabaseCheckService, {useClass: TargetDatabaseCheckService});

// Domain / Infrastructure / Adapter
container.register(DI.Domain.Infrastructure.Adapters.INotionAdapter, {useClass: NotionAdapter});

// Domain / Infrastructure / System
container.register(DI.Domain.Infrastructure.System.IArgumentProvider, {useClass: ArgumentProvider});
container.register(DI.Domain.Infrastructure.System.IStdOut, {useClass: StdOut});
container.register(DI.Domain.Infrastructure.System.ITextReader, {useClass: TextReader});
container.register(DI.Domain.Infrastructure.System.ITextWriter, {useClass: TextWriter});
container.register(DI.Domain.Infrastructure.System.IDirectory, {useClass: Directory});