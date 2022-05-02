import ExampleItem from "../../Domain/ValueObjects/ExampleItem";
import {IExampleRepository} from "../../Domain/Infrastructure/Repositories/IExampleRepository";

export class ExampleRepository implements IExampleRepository {

    save(item: ExampleItem): boolean {
        return true;
    }

    find(): ExampleItem {
        return new ExampleItem('aaa');
    }
}