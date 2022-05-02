import {parse} from 'ts-command-line-args';
import {IArgumentProvider} from "../../Domain/Infrastructure/System/IArgumentProvider";
import {Arguments} from "../../Domain/Models/Arguments";
import Const from "../../const";

export class ArgumentProvider implements IArgumentProvider {
    private args: Arguments;

    constructor() {
        this.args = parse<Arguments>({
            config: {type: String, alias: 'c', optional: true, defaultValue: Const.DEFAULT_CONFIG_PATH},
        }, {
            stopAtFirstUnknown: true
        });
    }

    getArgs(): Arguments {
        return this.args;
    }
}