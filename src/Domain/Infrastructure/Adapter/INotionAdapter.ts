export interface INotionAdapter {
    fetchDatabaseList(): Promise<FetchDatabaseResult>;
    queryDatabase(id: string): Promise<QueryDatabaseResult>;
    retrieveDatabase(id: string): Promise<RetrieveDatabaseResult>;
}

export interface FetchDatabaseResult {
    object: "list"
    results: Array<{
        id: string
        title: Array<{
            plain_text: string
        }>
    }>
}

export interface QueryDatabaseResult {
    object: "list"
    results: Array<{
        properties: Record<string, QueryDatabaseResultProps>
    }>
}

export type QueryDatabaseResultProps =
    | QueryDatabaseResultSelect
    | QueryDatabaseResultRichText
    | QueryDatabaseResultTitle
    | QueryDatabaseResultRelation
    | QueryDatabaseResultFormula
    | QueryDatabaseResultNumber
    | QueryDatabaseResultRollup
    | QueryDatabaseResultArray
    ;

export interface QueryDatabaseResultSelect {
    type: "select"
    select: {
        name: string
    }
}

export interface QueryDatabaseResultRichText {
    type: "rich_text"
    rich_text: Array<{
        plain_text: string
    }>
}

export interface QueryDatabaseResultTitle {
    type: "title",
    title: Array<{
        plain_text: string
    }>
}

export interface QueryDatabaseResultRelation {
    type: "relation",
    relation: Array<{
        id: string
    }>
}

export interface QueryDatabaseResultFormula {
    type: "formula",
    formula: {
        type: "string"
        string: string
    }
}

export interface QueryDatabaseResultNumber {
    type: "number",
    number: number
}

export interface QueryDatabaseResultRollup {
    type: "rollup",
    rollup: QueryDatabaseResultArray
}

export interface QueryDatabaseResultArray {
    type: "array"
    array: Array<QueryDatabaseResultFormula>
}

export interface RetrieveDatabaseResult {
    object: "database"
    properties: {
        [key: string | number]: any
    }
}