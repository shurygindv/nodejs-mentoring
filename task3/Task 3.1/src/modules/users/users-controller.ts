import {
    httpGet,
    httpPost,
    httpPut,
    response,
    controller,
    requestParam
} from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/dts/results';
import { inject } from 'inversify';

import { BaseController } from '../../core/base-controller';
import { IUserService } from './users-service';
import { UserTypes } from './connector';

import { RegisterUserDto } from './dto/register-user-dto';
import { EditUserDto } from './dto/edit-user-dto';
import { UserDtoMapper } from './mapping/user-dto-mapper';
import { UserModel } from './models/user-model';

@controller('/users')
export class UsersController extends BaseController implements App.IController {
    @inject(UserTypes.UsersService) private userService: IUserService;
    @inject(UserTypes.UserDtoMapper) private userMapper: UserDtoMapper;

    // TODO: pagination
    @httpGet('/')
    public async index(
        req: App.Request,
        res: App.Response
    ): Promise<JsonResult<[]>> {
        const users = await this.userService.getAllUsers();

        return this.successStatus(users);
    }

    @httpPost('/create')
    public async createUser(
        req: App.Request<RegisterUserDto>,
        res: App.Response
    ) {
        const [dtoResult, validationResult] = await this.validateAsync(
            RegisterUserDto,
            req.body
        );

        if (validationResult.hasErrors) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        const model: UserModel = await this.userMapper.fromRegisterDtoToUserModel(dtoResult.data);

        const outputModel = await this.userService.createUser(model);

        return this.successStatus(outputModel);
    }

    @httpPut('/:id/edit')
    public async editUserById(req: App.Request<EditUserDto>, res: App.Response) {
        const [dtoResult, validationResult] = await this.validateAsync(
            EditUserDto,
            req.body
        );

        if (validationResult.hasErrors) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        const model: UserModel = await this.userMapper.fromEditDtoToUserModel(dtoResult.data);

        const outputModel: UserModel = await this.userService.editUserById(model);

        return this.successStatus(outputModel);
    }

    @httpGet('/:id/delete')
    public deleteById(
        @requestParam('id') id: string,
        @response() res: App.Response
    ) { 

    }
}
