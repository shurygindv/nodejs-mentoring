import {BaseMapper} from '../../../lib/mapping';

import {CreateUserDTO} from '../dto/create-user-dto';
import {EditUserDTO} from '../dto/edit-user-dto';
// to =>
import {UserModel} from '../models/user-model';
import {UserDTO} from '../dto/user-dto';

export class UserDtoMapper extends BaseMapper {
    public fromRegisterDtoToUserModel(dto: CreateUserDTO): Promise<UserModel> {
        const model: UserModel = this.createInstance<UserModel>(UserModel, {
            age: dto.age,
            login: dto.login,
            password: dto.password,
        });

        return this.beLazy(model);
    }

    public fromEditDtoToUserModel(dto: EditUserDTO): Promise<UserModel> {
        const model: UserModel = this.createInstance<UserModel>(UserModel, {
            age: dto.age,
            login: dto.login,
            password: dto.confirmPassword,
        });

        return this.beLazy(model);
    }

    public fromUserModelToDTO(model: UserModel): Promise<UserDTO> {
        const dto: UserDTO = {
            id: model.id as guidV4,
            login: model.login,
            age: model.age,
        };

        return this.beLazy(dto);
    }
}
