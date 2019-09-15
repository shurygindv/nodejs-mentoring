import { injectable, inject } from 'inversify';

import { BaseRepository } from '../../core/base-repository';
import { UserEntity } from './entities/user-entity';

export interface IUsersRepository {
    createUser(userEntity: UserEntity): Promise<UserEntity>;
    getById(): any;
    getAll(): any;
    updateById(): void;
    deleteById(): any;
}

@injectable()
export class UsersRepository extends BaseRepository implements IUsersRepository {
    public createUser (userEntity: UserEntity): Promise<UserEntity> {
        throw new Error();
    }
}