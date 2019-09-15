import { injectable, inject } from 'inversify';

import { Random } from '../../lib/random';
import { BaseService } from '../../core/base-service';

import { UserTypes } from './connector';
import { IUsersRepository } from './users-repository';

import { UserModel } from './models/user-model';
import { CreateUserServiceError } from './errors/create-user-service-error';
import { UserModelMapper } from './mapping/user-model-mapper';

export interface IUserService {
    createUser(userModel: UserModel): Promise<Guid_v4>;
    getUserById(): any;
    getAllUsers(): any;
    editUserById(userModel: UserModel): Promise<Guid_v4>;
    deleteUserById(): any;
}

@injectable()
export class UsersService extends BaseService implements IUserService {
    @inject(UserTypes.UsersRepository) private userRepository: IUsersRepository;
    @inject(UserTypes.UserModelMapper) private userMapper: UserModelMapper;

    public async createUser(userModel: UserModel): Promise<Guid_v4> {
        const validationResult = await this.validateAsync(userModel);

        if (validationResult.hasErrors) {
            throw new CreateUserServiceError(validationResult.result);
        }

        const id = await Random.guidAsync();
        const userEntity = await this.userMapper.fromModelToUserEntity(id, userModel);

        const outputUserEntity = await this.userRepository.createUser(userEntity)
    
        return id;
    }

    public getUserById() {
        throw new Error("Method not implemented.");
    }

    public getAllUsers() {
        throw new Error("Method not implemented.");
    }

    public editUserById(userModel: UserModel): void {
        throw new Error("Method not implemented.");
    }

    public deleteUserById() {
        throw new Error("Method not implemented.");
    }
}