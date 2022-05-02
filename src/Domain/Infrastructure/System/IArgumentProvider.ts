import {Arguments} from "../../Models/Arguments";

export interface IArgumentProvider {
    getArgs(): Arguments;
}