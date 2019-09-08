import { Container, interfaces } from 'inversify';

import {connectUsersModule} from './users/connector';
import {connectGroupsModule} from './groups/connector';

type ModuleConnector = (container: interfaces.Container) => void;

const connected: ModuleConnector[] = [
    connectUsersModule,
    connectGroupsModule
];

const container = new Container();

connected.forEach((connectModule: (container: interfaces.Container) => void): void => {
    connectModule(container)
});




