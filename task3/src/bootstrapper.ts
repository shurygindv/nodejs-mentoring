import {Container} from 'inversify';

// modules
import {connectUsersModule} from './modules/users/connector';
import {connectGroupsModule} from './modules/groups/connector';

// providers
import {connectProviders} from './providers/connector';

type ConnectorFunc = (container: Container) => void;

const connected: ConnectorFunc[] = [
    connectProviders,

    connectUsersModule,
    connectGroupsModule,
];

export const bootstrap = (container: Container): void => {
    connected.forEach((connectModule: ConnectorFunc): void => {
        connectModule(container);
    });
};
