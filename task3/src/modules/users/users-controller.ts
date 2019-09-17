import {
    httpGet,
    httpPost,
    httpPut,
    controller,
    requestBody,
    requestParam
} from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/dts/results';
import { inject } from 'inversify';

import { BaseController } from '../../core/base-controller';
import { IUserService } from './users-service';
import { userTokens } from './tokens';

import { UserDtoMapper } from './mapping/user-dto-mapper';

import { CreateUserDTO } from './dto/create-user-dto';
import { DeleteUserDTO } from './dto/delete-user-dto';
import { EditUserDTO } from './dto/edit-user-dto';
import { LoginUserDTO } from './dto/login-user-dto';

import { UserModel } from './models/user-model';

@controller('/users')
export class UsersController extends BaseController implements App.IController {
    @inject(userTokens.UsersService) private userService: IUserService;
    @inject(userTokens.UserDtoMapper) private userMapper: UserDtoMapper;

    // TODO: pagination
    @httpGet('/')
    public async index(
        req: App.Request,
        res: App.Response
    ): Promise<JsonResult<[]>> {
        const users = await this.userService.getAllUsers();

        return this.successStatus(users);
    }

    @httpPost('/login')
    public async login(
        @requestBody() requestBody: LoginUserDTO,
    ): Promise<JsonResult<[]>> {
        const users = await this.userService.getAllUsers();

        return this.successStatus(users);
    }

    @httpPost('/create')
    public async createUser(
        @requestBody() requestBody: CreateUserDTO,
    ) {
        const [dtoResult, validationResult] = await this.validateAsync(
            CreateUserDTO,
            requestBody
        );

        if (validationResult.hasErrors()) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        const model: UserModel = await this.userMapper.fromRegisterDtoToUserModel(dtoResult.data);

        const outputModel = await this.userService.createUser(model);

        const userDto = this.userMapper.fromUserModelToDTO(outputModel);

        return this.successStatus(userDto);
    }

    @httpPut('/:id/edit')
    public async editUserById(
        @requestBody() requestBody: EditUserDTO,
        @requestParam('id') id: Guid_v4
    ) {
        const [dtoResult, validationResult] = await this.validateAsync(
            EditUserDTO,
            requestBody
        );

        if (validationResult.hasErrors()) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        const model: UserModel = await this.userMapper.fromEditDtoToUserModel(dtoResult.data);

        const outputModel: UserModel = await this.userService.editUserById(
            id, 
            model
        );

        const userDto = this.userMapper.fromUserModelToDTO(outputModel);

        return this.successStatus(userDto);
    }

    @httpGet('/:id/delete')
    public async deleteById(
        @requestParam('id') id: string,
    ): Promise<any> { 
        const [dto, validationResult] = await this.validateAsync<DeleteUserDTO>(
            DeleteUserDTO, 
            {guid: id}
        );

        if (validationResult.hasErrors()) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        try {
            const userModel: UserModel = await this.userService.deleteUserById(id);

            const userDto = this.userMapper.fromUserModelToDTO(userModel);

            return this.successStatus(userDto);

        } catch (e) {
            return this.failureStatus(e.message)
        }
    }
}
