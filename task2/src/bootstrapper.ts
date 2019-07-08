import { Router } from 'express';
import { Sequelize } from 'sequelize';

// user
import { applyUserController } from './modules/user/user-controller';
import { UserService } from './modules/user/user-service';
import { getUserModel } from './models/user-model';

export const bootstrap = (sequelize: Sequelize): Router[] => {
    const userRouter = applyUserController(new UserService(getUserModel(sequelize)));

    return [userRouter];
};