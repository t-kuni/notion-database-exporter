import ExampleItem from "../../ValueObjects/ExampleItem";

export interface IExampleRepository {
    save(item: ExampleItem): boolean;

    find(): ExampleItem;
}