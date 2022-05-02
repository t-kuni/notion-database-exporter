import "reflect-metadata";
import {container} from "tsyringe";
import {ExampleService} from "./Application/Services/ExampleService";
import {ExampleRepository} from "./Infrastructure/Repositories/ExampleRepository";
import {ExampleInteractor} from "./Application/UseCases/ExampleInteractor";
import {ArgumentProvider} from "./Infrastructure/System/ArgumentProvider";
import {StdOut} from "./Infrastructure/System/StdOut";
import {TextReader} from "./Infrastructure/System/TextReader";
import {ConfigReadService} from "./Application/Services/ConfigReadService";
import {DI} from "./diTokens";

console.log("container initialize")

// Application / UseCases
container.register(DI.Application.UseCases.ExampleInteractor, {useClass: ExampleInteractor});

// Application / Services
container.register(DI.Application.Services.ExampleService, {useClass: ExampleService});
container.register(DI.Application.Services.ConfigReadService, {useClass: ConfigReadService});

// Domain / Infrastructure / Repository
container.register(DI.Domain.Infrastructure.Repositories.IExampleRepository, {useClass: ExampleRepository});

// Domain / Infrastructure / System
container.register(DI.Domain.Infrastructure.System.IArgumentProvider, {useClass: ArgumentProvider});
container.register(DI.Domain.Infrastructure.System.IStdOut, {useClass: StdOut});
container.register(DI.Domain.Infrastructure.System.ITextReader, {useClass: TextReader});