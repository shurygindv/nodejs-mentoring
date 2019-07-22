import {RequestHandler} from "express";

import {userService} from "../services/user.service";


const createUser: RequestHandler = (req, res, next) => {

};


const getAllUsers: RequestHandler = (req, res, next) => {


};

const getUserById: RequestHandler = (req, res, next) => {

};


const updateUserById: RequestHandler = (req, res, next) => {

};

const deleteUserById: RequestHandler = (req, res, next) => {

};


export const userController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};
