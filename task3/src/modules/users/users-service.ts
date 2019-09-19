import {inject, injectable} from 'inversify';

import {Random} from '../../lib/random';
import {BaseService} from '../../core/base-service';

import {userTokens} from './tokens';
import {IUsersRepository} from './users-repository';

import {UserModel} from './models/user-model';
import {CreateUserServiceError} from './errors/create-user-service-error';
import {UserModelDboMapper} from './mapping/user-modeldbo-mapper';
import {NotFoundUserError} from './errors/not-found-user-error';
import {Encryptor} from "../../lib/encryptor";
import {UserDboModel} from "../../providers/database/models/users";

export interface IUserService {
    createUser(userModel: UserModel): Promise<UserModel>;
    getUserById(id: string): Promise<TS.MaybeNull<UserModel>>;
    getUserByLogin(Login: string): Promise<TS.MaybeNull<UserModel>>;
    getAllUsers(): Promise<UserModel[]>;
    editUserById(id: guidV4, userModel: UserModel): Promise<UserModel>;
    deleteUserById(id: guidV4): Promise<UserModel>;

    verifyUser(login: string, password: string): Promise<boolean>;
}

@injectable()
export class UsersService extends BaseService implements IUserService {
    @inject(userTokens.usersRepository)
    private userRepository: IUsersRepository;
    @inject(userTokens.userDboMapper) private userMapper: UserModelDboMapper;

    public async createUser(userModel: UserModel): Promise<UserModel> {
        const validationResult = await this.validateAsync(userModel);

        if (validationResult.hasErrors) {
            throw new CreateUserServiceError(validationResult.result);
        }

        const [guid, hashedPassword] = await Promise.all([
            Random.guidAsync(),
            Encryptor.hash(userModel.password)
        ]);

        const recreatedUserModel = new UserModel(
            guid,
            userModel.login,
            hashedPassword,
            userModel.age
        );

        const outputUserDbo = await this.userRepository.createUser(
            guid,
            recreatedUserModel,
        );

        return await this.userMapper.fromDboToUserModel(outputUserDbo);
    }

    public async getUserById(id: guidV4): Promise<TS.MaybeNull<UserModel>> {
        const outputUserDbo = await this.userRepository.getById(id);

        return await this.userMapper.fromDboToUserModel(outputUserDbo);
    }

    private async getUserDboByLogin (login: string): Promise<TS.MaybeNull<UserDboModel>> {
        return await this.userRepository.getByLogin(login);
    }

    public async verifyUser(login: string, password: string): Promise<boolean> {
        const existing: UserDboModel = await this.getUserDboByLogin(login);

        if (!existing) {
            throw new NotFoundUserError('User Not Found');
        }

        return await Encryptor.verify(existing.password, password);
    }

    public async getUserByLogin(
        login: string,
    ): Promise<TS.MaybeNull<UserModel>> {
        const outputUserDbo = await this.getUserDboByLogin(login);

        return await this.userMapper.fromDboToUserModel(outputUserDbo);
    }

    public async getAllUsers(): Promise<UserModel[]> {
        const outputUserDbo = await this.userRepository.getAll();

        return await this.userMapper.fromDboToUserModelArray(outputUserDbo);
    }

    public async editUserById(
        id: guidV4,
        userModel: UserModel,
    ): Promise<UserModel> {
        const outputUserDbo = await this.userRepository.updateById(
            id,
            userModel,
        );

        return await this.userMapper.fromDboToUserModel(outputUserDbo);
    }

    public async deleteUserById(id: guidV4): Promise<UserModel> {
        const existing = this.getUserById(id);

        if (!existing) {
            throw new NotFoundUserError('User Not Found');
        }

        await this.userRepository.deleteById(id);

        return existing;
    }
}
