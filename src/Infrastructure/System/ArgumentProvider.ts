import {parse} from 'ts-command-line-args';
import {IArgumentProvider} from "../../Domain/Infrastructure/System/IArgumentProvider";
import {Arguments} from "../../Domain/Models/Arguments";

export class ArgumentProvider implements IArgumentProvider {
    private args: Arguments;

    constructor() {
        this.args = parse<Arguments>({
            message: {type: String, alias: 'm', optional: true, defaultValue: ""},
            config: {type: String, alias: 'c', optional: true, defaultValue: "./config.yml"},
        }, {
            stopAtFirstUnknown: true
        });
    }

    getArgs(): Arguments {
        return this.args;
    }
}