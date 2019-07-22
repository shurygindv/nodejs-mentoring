import * as express from 'express';

import {userController} from "../controllers/user.controller";


const router: express.Router = express.Router();

router.post('/users/create', userController.createUser);

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);

router.put('/users/:id', userController.updateUserById);

router.delete('/users/:id/delete', userController.getAllUsers);


export const userRouter = router;
