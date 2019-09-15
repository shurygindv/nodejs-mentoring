import * as express from 'express';

import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

import { bootstrap } from './modules/bootstrapper';

const moduleContainer = new Container();

const createServer = (container: Container): InversifyExpressServer => new InversifyExpressServer(
    container, null, {rootPath: '/api/v1'}
);

const connectModules = (container: Container): void => bootstrap(container)

const connectPlugins = (app: express.Application): void => {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
}

const setErrorConfig = (app: express.Application): void => {
    
}

connectModules(moduleContainer);

createServer(moduleContainer)
        .setConfig(connectPlugins)
        .setErrorConfig(setErrorConfig)
        .build()
        .listen(3000, 'localhost', (): void => console.log(`Started at 7777 port`));