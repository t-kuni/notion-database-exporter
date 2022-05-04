import {
    QueryDatabaseResultProps,
    QueryDatabaseResultRow,
    RetrieveDatabaseResult
} from "../../Domain/Infrastructure/Adapter/INotionAdapter";

export class NotionDbToArrayService {
    toArray(retrieveResult: RetrieveDatabaseResult, rows: Array<QueryDatabaseResultRow>): Array<Array<String>> {
        const csvRows = new Array<Array<String>>();

        const propNames = Object.keys(retrieveResult.properties);
        csvRows.push(propNames);

        rows.forEach((row) => {
            const csvRow = new Array<String>()
            propNames.forEach((propName) => {
                const prop = row.properties[propName];
                const value = this.takeValueFromProp(prop);
                csvRow.push(value)
            })
            csvRows.push(csvRow)
        })

        return csvRows;
    }

    private takeValueFromProp(prop: QueryDatabaseResultProps) {
        switch (prop.type) {
            case "select":
                if (prop.select === null) return ""
                return prop.select.name
            case "multi_select":
                return prop.multi_select.reduce((prev, curr) => {
                    if (prev != "") prev += ',';
                    return prev + curr.name;
                }, "")
            case "checkbox":
                return prop.checkbox.toString();
            case "title":
                if (prop.title.length == 0) return "";
                return prop.title[0].plain_text
            case "rich_text":
                if (prop.rich_text.length == 0) return "";
                return prop.rich_text[0].plain_text;
            case "relation":
                return prop.relation.reduce((prev, curr) => {
                    if (prev != "") prev += ',';
                    return prev + curr.id;
                }, "")
            case "formula":
                switch (prop.formula.type) {
                    case "string":
                        return prop.formula.string
                    case "number":
                        return prop.formula.number
                    default:
                        throw new Error(`Detect unsupported property type \"${prop.formula["type"]}\"`)
                }
            case "number":
                if (prop.number === null) return "";
                return prop.number.toString();
            case "rollup":
                return this.takeValueFromProp(prop.rollup)
            case "array":
                return prop.array.reduce((prev, curr) => {
                    if (prev != "") prev += ',';
                    return prev + this.takeValueFromProp(curr);
                }, "")
            default:
                throw new Error(`Detect unsupported property type \"${prop["type"]}\"`)
        }
    }
}