import {Container} from 'inversify';

import {connectProviders} from './providers/connector';
import {connectApiModules} from "./modules/connector";

type ConnectorFunc = (container: Container) => void;

const connected: ConnectorFunc[] = [
    connectProviders,
    connectApiModules
];

export const bootstrap = (container: Container): void => {
    connected.forEach((connectModule: ConnectorFunc): void => {
        connectModule(container);
    });
};
