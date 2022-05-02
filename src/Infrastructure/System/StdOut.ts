import {IStdOut} from "../../Domain/Infrastructure/System/IStdOut";

export class StdOut implements IStdOut {
    println(msg: string) {
        console.log(msg);
    }
}