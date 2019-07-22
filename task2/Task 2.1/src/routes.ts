import *  as express from 'express';

import {userRouter} from "./routes/user.routes";

const routes: express.Router[] = [
    userRouter
];

export const registerRoutes = (app: express.Application): void => {
    const API_VERSION: string = '/api/v1';

    routes.forEach((router: express.Router): void => {
        app.use(API_VERSION, router)
    });
};
