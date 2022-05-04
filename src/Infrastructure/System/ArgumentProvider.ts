import {parse} from 'ts-command-line-args';
import {IArgumentProvider} from "../../Domain/Infrastructure/System/IArgumentProvider";
import {Arguments} from "../../Domain/Models/Arguments";
import Const from "../../const";

export class ArgumentProvider implements IArgumentProvider {
    private args: Arguments;

    constructor() {
        this.args = parse<Arguments>({
            config: {type: String, alias: 'c', optional: true, defaultValue: Const.DEFAULT_CONFIG_PATH},
            list: {type: Boolean, alias: 'l', optional: true, defaultValue: true},
            export: {type: Boolean, alias: 'e', optional: true, defaultValue: false},
        }, {
            stopAtFirstUnknown: true
        });
    }

    getArgs(): Arguments {
        return this.args;
    }
}