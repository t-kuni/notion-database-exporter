import {v4 as uuidv4} from 'uuid';

export const DI = {
    Application: {
        Services: {
            ConfigReadService: uuidv4(),
            NotionDbToArrayService: uuidv4(),
            INotionAccessService: uuidv4(),
            ITargetDatabaseCheckService: uuidv4()
        },
        UseCases: {
            MainInteractor: uuidv4(),
        }
    },
    Domain: {
        Infrastructure: {
            Adapters: {
                INotionAdapter: uuidv4()
            },
            System: {
                IArgumentProvider: uuidv4(),
                IStdOut: uuidv4(),
                ITextReader: uuidv4(),
                ITextWriter: uuidv4(),
                IDirectory: uuidv4()
            }
        }
    },
}
