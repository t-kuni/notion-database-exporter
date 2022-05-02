import './bootstrap';
import {container} from "tsyringe";
import {ExampleInteractor} from "./Application/UseCases/ExampleInteractor";
import {DI} from "./diTokens";

(async () => {
    try {
        const interactor = container.resolve<ExampleInteractor>(DI.Application.UseCases.ExampleInteractor);
        await interactor.exec();
    } catch (e) {
        console.error(e);
    }
})();