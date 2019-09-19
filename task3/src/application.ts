import 'dotenv/config';
import 'reflect-metadata';

import * as express from 'express';
import * as morgan from 'morgan'; // too heavy, too rich module
import * as cors from 'cors';

import {Container} from 'inversify';
import {InversifyExpressServer} from 'inversify-express-utils';

import {bootstrap} from './bootstrapper';
import {envConfig} from './config/environment';
import {Process} from "./lib/process";
import {HttpStatusCode} from "./lib/http";

const moduleContainer = new Container();

const createServer = (container: Container): InversifyExpressServer =>
    new InversifyExpressServer(container, null, {rootPath: '/api/v1'});

const connectModules = (container: Container): void => bootstrap(container);

const connectPlugins = (app: express.Application): void => {
    app.use(cors());
    app.use(morgan('combined'));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
};

const connectGlobalErrorHandler = (): void => {
    Process.listenUncaughtExceptions(error => {
        console.error(
            `${new Date().toUTCString()} uncaughtException:`,
            error.message,
        );

        Process.exit(0)
    });

    Process.listenUncaughtRejections(reason => {
        console.error(
            `${new Date().toUTCString()} uncaughtRejections:`,
            reason,
        );

        Process.exit(0)
    });
};

const setErrorConfig = (app: express.Application): void => {
    app.use((err: Error, req: App.Request, res: App.Response): void => {
        console.error(err.stack);

        res.status(
            HttpStatusCode.InternalServerError
        );
    });
};

const sayMeStatus = (): void =>
    console.log(`Started at ${envConfig.serverPort} port`);


connectModules(moduleContainer);
connectGlobalErrorHandler();

createServer(moduleContainer)
    .setConfig(connectPlugins)
    .setErrorConfig(setErrorConfig)
    .build()
    .listen(envConfig.serverPort, 'localhost', sayMeStatus);
