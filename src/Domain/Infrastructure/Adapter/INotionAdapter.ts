export interface INotionAdapter {
    fetchDatabaseList(startCursor?: string): Promise<FetchDatabaseResult>;

    queryDatabase(id: string, startCursor?: string): Promise<QueryDatabaseResult>;

    retrieveDatabase(id: string): Promise<RetrieveDatabaseResult>;
}

export interface FetchDatabaseResult {
    object: "list"
    results: Array<FetchDatabaseResultDatabase>
    next_cursor: string | null
}

export interface FetchDatabaseResultDatabase {
    id: string
    title: Array<{
        plain_text: string
    }>
}

export interface QueryDatabaseResult {
    object: "list"
    results: Array<QueryDatabaseResultRow>
    next_cursor: string | null
}

export interface QueryDatabaseResultRow {
    properties: Record<string, QueryDatabaseResultProps>
}

export type QueryDatabaseResultProps =
    | QueryDatabaseResultSelect
    | QueryDatabaseResultMultiSelect
    | QueryDatabaseResultCheckBox
    | QueryDatabaseResultRichText
    | QueryDatabaseResultTitle
    | QueryDatabaseResultRelation
    | QueryDatabaseResultFormula
    | QueryDatabaseResultNumber
    | QueryDatabaseResultRollup
    | QueryDatabaseResultArray
    | QueryDatabaseResultFiles
    ;

export interface QueryDatabaseResultSelect {
    type: "select"
    select: {
        name: string
    } | null
}

export interface QueryDatabaseResultMultiSelect {
    type: "multi_select"
    multi_select: Array<{
        name: string
    }>
}

export interface QueryDatabaseResultCheckBox {
    type: "checkbox"
    checkbox: boolean
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
    } | {
        type: "number"
        number: number | null
    }
}

export interface QueryDatabaseResultNumber {
    type: "number"
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

export interface QueryDatabaseResultFiles {
    type: "files"
    files: Array<{
        type: "external"
        external: {
            url: string
        }
    } | {
        type: "file"
        name: string
        file: {
            url: string
        }
    }>
}

export interface RetrieveDatabaseResult {
    object: "database"
    properties: {
        [key: string | number]: any
    }
}