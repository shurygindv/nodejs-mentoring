import {Router} from 'express';
import {Sequelize} from 'sequelize';

// user
import {applyUserController} from './modules/user/user-controller';
import {UserService} from './modules/user/user-service';
import {initUserModel} from './models/user-model';
import {UserRepository} from "./modules/user/user-repository";

export const bootstrap = (sequelize: Sequelize): Router[] => {
    const userRouter = applyUserController(new UserService(new UserRepository(initUserModel(sequelize))));

    return [userRouter];
};


// TODO: database provider!
// TODO: investigate migrations!
