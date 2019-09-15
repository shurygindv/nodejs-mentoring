import { BaseMapper } from '../../../lib/mapping';

import { RegisterUserDto } from '../dto/register-group-dto';
import { EditUserDto } from '../dto/edit-group-dto';
// to =>
import { UserModel } from '../models/group-model';
import { UserDto } from '../dto/group-dto';

export class GroupDtoMapper extends BaseMapper {
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