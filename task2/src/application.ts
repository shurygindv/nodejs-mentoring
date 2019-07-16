import 'dotenv/config';

import { Sequelize } from 'sequelize';
import * as express from 'express';
import * as cors from 'cors';

import { R } from '@libs/ramda';

import { bootstrap } from './bootstrapper';
import { config } from './core/config';

const app = express();

const registerAppDependencies = (app: express.Express): void => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};

const initializeDbConnect = (): Sequelize =>
    new Sequelize(config.connectionString);

const registerRoutes = (route: express.Router) => app.use('/api/v1', route);

// core
const connection = initializeDbConnect();
const routes = bootstrap(connection);

registerAppDependencies(app);
R.forEach(registerRoutes, routes);


export {
    app
};
