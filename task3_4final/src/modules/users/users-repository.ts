import _ from 'lodash';
import {injectable, inject} from 'inversify';

import {BaseRepository} from '../../core/base-repository';

import {dbTokens} from '../../providers/database/tokens';
import {UserDboModel} from '../../providers/database/models/users';

import {UserModel} from './models/user-model';
import {UserModelDboMapper} from './mapping/user-modeldbo-mapper';
import {userTokens} from './tokens';

export interface IUsersRepository {
    createUser(id: guidV4, userModel: UserModel): Promise<UserDboModel>;
    getById(id: guidV4): Promise<TS.MaybeNull<UserDboModel>>;
    getByLogin(login: string): Promise<TS.MaybeNull<UserDboModel>>;
    getAll(): Promise<UserDboModel[]>;
    updateById(
        id: guidV4,
        model: UserModel,
    ): Promise<TS.MaybeNull<UserDboModel>>;
    deleteById(id: guidV4): Promise<number>;
}

@injectable()
export class UsersRepository extends BaseRepository
    implements IUsersRepository {
    @inject(dbTokens.userModel) userRepo: typeof UserDboModel; // remake
    @inject(userTokens.userDboMapper) mapper: UserModelDboMapper;

    public async createUser(
        id: guidV4,
        userModel: UserModel,
    ): Promise<UserDboModel> {
        const created = await this.userRepo.create({
            id: id,
            login: userModel.login,
            password: userModel.password,
            age: userModel.age,
        });

        return created;
    }

    public async getById(id: guidV4): Promise<TS.MaybeNull<UserDboModel>> {
        const created = await this.userRepo.findByPk(id);

        return created;
    }

    public async getByLogin(
        login: string,
    ): Promise<TS.MaybeNull<UserDboModel>> {
        const found = await this.userRepo.findOne({where: {login}});

        return found;
    }

    public async getAll(): Promise<UserDboModel[]> {
        return await this.userRepo.findAll();
    }

    public async updateById(
        id: guidV4,
        model: UserModel,
    ): Promise<TS.MaybeNull<UserDboModel>> {
        const [affectedRow, dboModel] = await this.userRepo.update(model, {
            where: {id},
        });

        return _.first(dboModel) || null;
    }

    public async deleteById(id: guidV4): Promise<number> {
        const affectedRow = await this.userRepo.destroy({where: {id}});

        return affectedRow;
    }
}
