import {Router} from 'express';
import {uuidHelper} from '../../libs/uuid/helper';
import {createUserModel} from './user-model';

const userRouter = Router();

export const entry = (sequelize: any): Router => {
    const User = createUserModel(sequelize);

    userRouter.post('/users/create', async (req, res): Promise<void> => {
        const user = {
            id: uuidHelper.id(),
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
    
        await User.create(user);
    
        res.json(user);
    });
    
    
    userRouter.get('/users', async (req, res): Promise<void> => {
        const users = await User.findAll();
    
        res.json(users);
    });
    
    userRouter.get('/users/:id', async (req, res): Promise<void> => {
        const user = await User.findByPk(req.query.id);
    
        res.json(user)
    });
    
    userRouter.delete('/users/:id/delete',async (req, res): Promise<void> => {
        const user = await User.destroy({
            where: {
                id: req.params.id
            }
        });
    
        res.json(user)
    });
    
    return userRouter;
}