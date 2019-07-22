import * as uuid from 'uuid';

import { createJsonStore } from '../helpers/json-store';
import { UserModel } from '../models/user.model';
import { MaybeNull } from '../types';

const userStore = createJsonStore<UserModel>()

export interface IUser {
    id: string;
    login: string;
    age: number;
    isDeleted: boolean;
}

interface CreateUserDto {
    login: string;
    password: string;
    age: number;
}

interface UpdateUserDto {
    login: string;
    password: string;
    age: number,
    isDeleted: boolean;
}

const mapUserModelToUserService = (userModel: UserModel): IUser => ({
    id: userModel.id,
    age: userModel.age,
    login: userModel.login,
    isDeleted: userModel.isDeleted,
})

const createUser = (userDto: CreateUserDto): string => {
    const userId = uuid();

    userStore.create(userId, new UserModel(
        userId,
        userDto.login,
        userDto.password,
        userDto.age,
    ));

    return userId;
};


const getAllUsers = (): IUser[] => {
    const users: IUser[] = userStore.findAll().map(mapUserModelToUserService)

    return users;
};

const getUserById = (id: string): MaybeNull<IUser> => {
    const user = userStore.findById(id);

    return user ? mapUserModelToUserService(user) : null;
};


const updateUserById = (id: string, userDto: UpdateUserDto): string => {
    const updatedId = userStore.update(id, new UserModel(
        id,
        userDto.login,
        userDto.password,
        userDto.age,
        userDto.isDeleted,
    ));

    return updatedId;
};

const deleteUserById = (id: string): boolean => {
    userStore.usePartialUpdate(id, {
        isDeleted: true
    });

    return true;
};


export const userService = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};
