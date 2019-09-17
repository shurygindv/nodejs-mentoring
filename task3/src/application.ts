import 'dotenv/config';
import 'reflect-metadata';

import * as express from 'express';
import * as cors from 'cors';

import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

import { bootstrap } from './bootstrapper';
import { envConfig } from './config/environment';

const moduleContainer = new Container();

const createServer = (container: Container): InversifyExpressServer => new InversifyExpressServer(
    container, null, {rootPath: '/api/v1'}
);

const connectModules = (container: Container): void => bootstrap(container)

const connectPlugins = (app: express.Application): void => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
}

const setErrorConfig = (app: express.Application): void => {}

const sayMeStatus = (): void => 
    console.log(`Started at ${envConfig.serverPort} port`)

connectModules(moduleContainer);

createServer(moduleContainer)
        .setConfig(connectPlugins)
        .setErrorConfig(setErrorConfig)
        .build()
        .listen(3000, 'localhost', sayMeStatus);