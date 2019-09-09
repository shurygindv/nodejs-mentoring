import { injectable, inject } from 'inversify';

import { BaseService } from '../../core/base-service';
import { UserTypes } from './connector';
import { IUsersRepository } from './users-repository';

export interface IUserService {
    registerUser(): any;
    getUserById(): any;
    getAllUsers(): any;
    updateUserById(): void;
    deleteUserById(): any;
}

@injectable()
export class UsersService extends BaseService implements IUserService {
    @inject(UserTypes.UsersRepository) private userRepository: IUsersRepository;

    public registerUser() {
        throw new Error("Method not implemented.");
    }

    public getUserById() {
        throw new Error("Method not implemented.");
    }

    public getAllUsers() {
        throw new Error("Method not implemented.");
    }

    public updateUserById(): void {
        throw new Error("Method not implemented.");
    }

    public deleteUserById() {
        throw new Error("Method not implemented.");
    }
}