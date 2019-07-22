import { RequestHandler, Request } from "express";

import { userService, IUser } from '../services/user.service';
import { HttpResult } from '../helpers/http';
import { MaybeNull } from '../types';

const selectBody = (req: Request) => req.body;
const selectParam = (req: Request) => req.params;

const createUser: RequestHandler = (req, res, next): void => {
    const user = selectBody(req);

    const createdUserId = userService.createUser(user);

    res.json(HttpResult.success(createdUserId));
};

const getAllUsers: RequestHandler =  (req, res, next): void => {
    const users: IUser[] = userService.getAllUsers();

    res.json(HttpResult.success(users));
};

const getUserById: RequestHandler = (req, res, next): void => {
    const user: MaybeNull<IUser> = userService.getUserById(selectParam(req).id);

    res.json(HttpResult.success(user));
};

const updateUserById: RequestHandler = (req, res, next): void => {
    const id: string = selectParam(req).id;
    const user = selectBody(req);

    const updatedId: string = userService.updateUserById(id, user);

    res.json(HttpResult.success(updatedId));
};

const deleteUserById: RequestHandler = (req, res, next): void => {
    const isDeleted: boolean = userService.deleteUserById(selectParam(req).id);

    res.json(HttpResult.success(isDeleted));
};

export const userController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};
