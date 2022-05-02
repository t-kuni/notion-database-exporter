import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        ".(ts|tsx)": "ts-jest"
    },
    globals: {
        "ts-jest": {
            "compiler": "ttypescript"
        }
    },
    setupFiles: [
        "<rootDir>jest.setup.ts",
    ],
    moduleNameMapper: {
        "^csv-stringify/sync": "<rootDir>/node_modules/csv-stringify/dist/cjs/sync.cjs"
    }
};
export default config;