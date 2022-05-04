export default interface Config {
    outDir: string;
    includes: Array<ConfigTargetDatabase>
    excludes: Array<ConfigTargetDatabase>
}

export interface ConfigTargetDatabase {
    id: string
    title: string
}