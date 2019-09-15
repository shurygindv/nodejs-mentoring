import { Container } from 'inversify';

// modules
import {connectUsersModule} from './modules/users/connector';
import {connectGroupsModule} from './modules/groups/connector';

// providers
import { connectDatabaseProvider } from './providers/sequelize/connect-database';

type ConnectorFunc = (container: Container) => void;

const connected: ConnectorFunc[] = [
    connectDatabaseProvider,

    connectUsersModule,
    connectGroupsModule
];

export const bootstrap = (container: Container): void => {
    connected.forEach((connectModule: ConnectorFunc): void => {
        connectModule(container)
    });
}





