import { BaseMapper } from '../../../lib/mapping';

import { RegisterUserDto } from '../dto/register-user-dto';
import { EditUserDto } from '../dto/edit-user-dto';
// to =>
import { UserModel } from '../models/user-model';
import { UserDto } from '../dto/user-dto';

export class UserDtoMapper extends BaseMapper {
    public fromRegisterDtoToUserModel (dto: RegisterUserDto): Promise<UserModel> {
        const model: UserModel = this.createInstance<UserModel>(UserModel, {
            age: dto.age,
            login: dto.login,
            password: dto.password,
        });

        return this.beLazy(model);
    }

    public fromEditDtoToUserModel (dto: EditUserDto): Promise<UserModel> {
        const model: UserModel = this.createInstance<UserModel>(UserModel, {
            age: dto.age,
            login: dto.login,
            password: dto.confirmPassword,
        });

        return this.beLazy(model);
    }

    public fromUserModelToDTO (model: UserModel): Promise<UserDto> {
        const dto: UserDto = {
            id: model.id,
            login: model.login,
            age: model.age
        }

        return this.beLazy(model);
    }
}