import {BaseMapper} from '../../../lib/mapping';

import { UserModel } from '../models/user-model';
// to =>
import { UserEntity } from '../entities/user-entity';


export class UserModelMapper extends BaseMapper {
    public fromModelToUserEntity (id: Guid_v4, model: UserModel): Promise<UserEntity> {
        const entity: UserEntity = this.createInstance<UserEntity>(UserEntity, {
            id: id,
            age: model.age,
            login: model.login,
            password: model.password,
        });

        return this.beLazy(entity);
    }
}