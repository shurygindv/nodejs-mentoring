import { injectable, inject } from 'inversify';

import { BaseRepository } from '../../../core/base-repository';

export interface IUsersRepository {
    createUser(): any;
    getById(): any;
    getAll(): any;
    updateById(): void;
    deleteById(): any;
}

@injectable()
export default class UsersRepository extends BaseRepository implements IUsersRepository {
    public createUser () {
        
    }
}