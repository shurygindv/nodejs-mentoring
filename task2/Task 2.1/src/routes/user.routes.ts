import * as express from 'express';

import {userController} from "../controllers/user.controller";


const router: express.Router = express.Router();

router.post('/users/create', userController.createUser);

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);

router.put('/users/:id/update', userController.updateUserById);

router.delete('/users/:id/delete', userController.deleteUserById);


export const userRouter = router;
