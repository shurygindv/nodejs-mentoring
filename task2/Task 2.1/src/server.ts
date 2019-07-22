import 'dotenv/config';

import * as express from 'express';
import * as cors from 'cors';

import {registerRoutes} from "./routes";


const application: express.Application = express();


const registerDependencies = (app: express.Application): void => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};


const startApplication = (app: express.Application): void => {
    app.listen(7777, (): string => 'hola, amigos! on 7777 port')
};


registerDependencies(application);
registerRoutes(application);

startApplication(application);
