import {BaseMapper} from '../../../lib/mapping';

import {UserDboModel} from '../../../providers/sequelize/models/user-factory';
// to =>
import {UserModel} from '../models/user-model';

export class UserModelDboMapper extends BaseMapper {
    public fromDboToUserModel(
        model: UserDboModel,
    ): Promise<TS.MaybeNull<UserModel>> {
        if (!model) {
            return this.empty();
        }

        const userModel: UserModel = this.createInstance<UserModel>(UserModel, {
            id: model.id,
            age: model.age,
            login: model.login,
            password: model.password,
        });

        return this.beLazy(userModel);
    }

    public async fromDboToUserModelArray(
        models: UserDboModel[],
    ): Promise<UserModel[]> {
        const results = (models || []).map(
            async (dboModel: UserDboModel) =>
                await this.fromDboToUserModel(dboModel),
        );

        return await Promise.all(results);
    }
}
