import { injectable, inject } from 'inversify';

import { BaseService } from '../../../core/base-service';

export interface IUserService {
    createUser(): any;
    getById(): any;
    getAll(): any;
    updateById(): void;
    deleteById(): any;
}

@injectable()
export default class UsersService extends BaseService implements IUserService {
    public createUser () {
        
    }
}