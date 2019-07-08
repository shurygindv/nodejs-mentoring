import {uuidHelper} from '@libs/uuid';

import { BaseService } from '../../core/base-service';
import { User } from '../../models/user-model';
import { MaybeNull } from '../../types';

export interface IUserService {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<MaybeNull<User>>;
    deleteById(id: string): Promise<number>;
}

export class UserService extends BaseService<typeof User> implements IUserService {
    public async create(user: User): Promise<User> {
        return this.repo.create({
            id: uuidHelper.id(),
            firstName: user.firstname,
            lastName: user.lastname,
        });
    }

    public async findAll(): Promise<User[]> {
        return this.repo.findAll();
    }

    public async findById(id: string): Promise<MaybeNull<User>> {
        return this.repo.findByPk(id);
    }

    public async deleteById(id: string): Promise<number> {
        return User.destroy({
            where: { id }
        });
    }
}