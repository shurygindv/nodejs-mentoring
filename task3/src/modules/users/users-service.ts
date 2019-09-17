import { injectable, inject } from 'inversify';

import { Random } from '../../lib/random';
import { BaseService } from '../../core/base-service';

import { userTokens } from './tokens';
import { IUsersRepository } from './users-repository';

import { UserModel } from './models/user-model';
import { CreateUserServiceError } from './errors/create-user-service-error';
import { UserModelDboMapper } from './mapping/user-modeldbo-mapper';
import { NotFoundUserError } from './errors/not-found-user-error';

export interface IUserService {
    createUser(userModel: UserModel): Promise<UserModel>;
    getUserById(id: string): Promise<TS.MaybeNull<UserModel>>;
    getUserByLogin(Login: string): Promise<TS.MaybeNull<UserModel>>;
    getAllUsers(): Promise<UserModel[]>;
    editUserById(id: Guid_v4, userModel: UserModel): Promise<UserModel>;
    deleteUserById(id: Guid_v4): Promise<UserModel>;
}

@injectable()
export class UsersService extends BaseService implements IUserService {
    @inject(userTokens.usersRepository) private userRepository: IUsersRepository;
    @inject(userTokens.userDboMapper) private userMapper: UserModelDboMapper;

    public async createUser(userModel: UserModel): Promise<UserModel> {
        const validationResult = await this.validateAsync(userModel);

        if (validationResult.hasErrors) {
            throw new CreateUserServiceError(validationResult.result);
        }

        const id = await Random.guidAsync();

        const outputUserDbo = await this.userRepository.createUser(
            id, 
            userModel
        );
    
        return await this.userMapper.fromDboToUserModel(outputUserDbo);
    }

    public async getUserById (id: Guid_v4): Promise<TS.MaybeNull<UserModel>> {
        const outputUserDbo = await this.userRepository.getById(id);
    
        return await this.userMapper.fromDboToUserModel(outputUserDbo)
    }

    public async getUserByLogin (login: string): Promise<TS.MaybeNull<UserModel>> {
        const outputUserDbo = await this.userRepository.getByLogin(login);
    
        return await this.userMapper.fromDboToUserModel(outputUserDbo)
    }

    public async getAllUsers(): Promise<UserModel[]> {
        const outputUserDbo = await this.userRepository.getAll();
    
        return await this.userMapper.fromDboToUserModelArray(outputUserDbo)
    }

    public async editUserById(id: Guid_v4, userModel: UserModel): Promise<UserModel> {
        const outputUserDbo = await this.userRepository.updateById(
            id,
            userModel
        );
    
        return await this.userMapper.fromDboToUserModel(outputUserDbo)
    }

    public async deleteUserById(id: Guid_v4): Promise<UserModel> {
        const existing = this.getUserById(id);

        if (!existing) {
            throw new NotFoundUserError('User Not Found')
        }

        await this.userRepository.deleteById(id);
      
        return existing;
    }
}