export interface INotionAdapter {
    fetchDatabaseList(): Promise<FetchDatabaseResult>;
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