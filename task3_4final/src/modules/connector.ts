import {Container} from 'inversify';

// modules
import {connectUsersModule} from './users/connector';
import {connectGroupsModule} from './groups/connector';
import {connectUserGroupsModule} from "./user-groups/connector";

type ConnectorFunc = (container: Container) => void;

const connected: ConnectorFunc[] = [
    connectUsersModule,
    connectGroupsModule,
    connectUserGroupsModule,
];

export const connectApiModules = (container: Container): void => {
    connected.forEach((connectModule: ConnectorFunc): void => {
        connectModule(container);
    });
};
