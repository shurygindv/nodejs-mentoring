import { Container } from 'inversify';

import {connectUsersModule} from './users/connector';
import {connectGroupsModule} from './groups/connector';

type ModuleConnectorFunc = (container: Container) => void;

const connected: ModuleConnectorFunc[] = [
    connectUsersModule,
    connectGroupsModule
];

export const bootstrap = (container: Container): void => {
    connected.forEach((connectModule: ModuleConnectorFunc): void => {
        connectModule(container)
    });
}





