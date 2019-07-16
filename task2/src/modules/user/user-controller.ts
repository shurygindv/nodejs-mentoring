import { Router } from 'express';

import { useValidator } from '@libs/validator/express';
import { selectParam } from '@libs/express/helper';

import { CreateUserDto } from './dto/create-user.dto';
import { useAsync } from '../../helpers/use-async';
import { HttpResult } from '../../libs/http';

import {IUser, IUserService} from './user-service';
import {MaybeNull} from "../../types";

export const applyUserController = (userService: IUserService): Router => {
    const userRouter = Router();

    userRouter.post(
        '/users/create',
        useValidator(CreateUserDto.scheme),
        useAsync(async (req, res): Promise<void> => {
            const created: IUser = await userService.create(res.locals.validated);

            res.json(HttpResult.success(created));
        })
    );

    userRouter.get('/users', useAsync(async (req, res): Promise<void> => {
        const users: IUser[] = await userService.findAll();

        res.json(HttpResult.success(users));
    }));

    userRouter.get('/users/:id', useAsync(async (req, res): Promise<void> => {
        const user: MaybeNull<IUser> = await userService.findById(selectParam(req).id);

        res.json(HttpResult.success(user));
    }));

    userRouter.delete('/users/:id/delete', useAsync(async (req, res): Promise<void> => {
        await userService.deleteById(selectParam(req).id);

        res.json(HttpResult.success({}));
    }));

    return userRouter;
};
