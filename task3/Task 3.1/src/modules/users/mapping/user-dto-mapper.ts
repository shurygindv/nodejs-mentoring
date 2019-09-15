import { BaseMapper } from '../../../lib/mapping';

import { RegisterUserDto } from '../dto/register-user-dto';
import { EditUserDto } from '../dto/edit-user-dto';
// to =>
import { UserModel } from '../models/user-model';

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
}