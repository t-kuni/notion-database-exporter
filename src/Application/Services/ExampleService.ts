import {inject, injectable} from "tsyringe";
import {StdOut} from "../../Infrastructure/System/StdOut";
import {DI} from "../../diTokens";

@injectable()
export class ExampleService {
    private stdOut: StdOut;

    constructor(
        @inject(DI.Domain.Infrastructure.System.IStdOut) stdOut: StdOut,
    ) {
        this.stdOut = stdOut;
    }

    exec() {
        this.stdOut.println('Hello from ExampleService.');
    }
}