import {
    controller,
    httpGet,
    httpPost,
    httpPut,
    requestBody,
    requestParam,
} from 'inversify-express-utils';
import {JsonResult} from 'inversify-express-utils/dts/results';
import {inject} from 'inversify';

import {BaseRestController} from '../../core/base-rest-controller';
import {IUserService} from './users-service';
import {userTokens} from './tokens';

import {UserDtoMapper} from './mapping/user-dto-mapper';

import {CreateUserDTO} from './dto/create-user-dto';
import {DeleteUserDTO} from './dto/delete-user-dto';
import {EditUserDTO} from './dto/edit-user-dto';
import {LoginUserDTO} from './dto/login-user-dto';

import {UserModel} from './models/user-model';
import {providerTokens} from '../../providers/tokens';
import {AuthProvider} from '../../providers/authorization/auth-provider';
import {AuthModel} from '../../providers/authorization/auth-model';
import {HttpFailureResult} from '../../lib/http/http-result';
import {HttpStatusCode, Status} from '../../lib/http';
import {AuthValidationError} from '../../providers/authorization/errors/auth-validation-error';
import {VerificationFailed} from '../../providers/authorization/errors/verification-failed';

const selectAuthFailureResult = (e: Error): HttpFailureResult | void => {
    if (e instanceof AuthValidationError) {
        return Status.Error(
            Api.ErrorCode.AuthError,
            e.message,
            HttpStatusCode.Unauthorized,
        );
    }

    if (e instanceof VerificationFailed) {
        return Status.Error(
            Api.ErrorCode.AuthError,
            e.message,
            HttpStatusCode.Unauthorized,
        );
    }
};

const using = {
    userService: userTokens.usersService,
    userDtoMapper: userTokens.userDtoMapper,

    authProvider: providerTokens.auth.authProvider,
};

@controller('/users')
export class UsersController extends BaseRestController implements App.IController {
    @inject(using.userService) private userService: IUserService;
    @inject(using.userDtoMapper) private userMapper: UserDtoMapper;

    @inject(using.authProvider) private authProvider: AuthProvider;

    // TODO: pagination
    @httpGet('/')
    public async index(
        req: App.Request,
        res: App.Response,
    ): Promise<JsonResult<[]>> {
        const users = await this.userService.getAllUsers();

        return this.successStatus(users);
    }

    @httpPost('/login')
    public async login(
        @requestBody() reqUserBody: LoginUserDTO,
    ): Promise<JsonResult<[]>> {
        const [{data}, validationResult] = await this.validateAsync(
            LoginUserDTO,
            reqUserBody,
        );

        if (validationResult.hasErrors()) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        try {
            const auth: AuthModel = await this.authProvider.login(
                data.login,
                data.password,
            );

            return this.successStatus(auth);
        } catch (e) {
            const result = selectAuthFailureResult(e);

            if (!result) {
                throw e;
            }

            return this.failureStatus(
                result.data,
                result.statusCode,
            );
        }
    }

    @httpPost('/create')
    public async createUser(@requestBody() reqUserBody: CreateUserDTO) {
        const [dtoResult, validationResult] = await this.validateAsync(
            CreateUserDTO,
            reqUserBody,
        );

        if (validationResult.hasErrors()) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        const model: UserModel = await this.userMapper.fromRegisterDtoToUserModel(
            dtoResult.data,
        );

        const outputModel = await this.userService.createUser(model);

        const userDto = this.userMapper.fromUserModelToDTO(outputModel);

        return this.successStatus(userDto);
    }

    @httpPut('/:id/edit')
    public async editUserById(
        @requestBody() reqUserBody: EditUserDTO,
        @requestParam('id') id: guidV4,
    ) {
        const [dtoResult, validationResult] = await this.validateAsync(
            EditUserDTO,
            reqUserBody,
        );

        if (validationResult.hasErrors()) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        const model: UserModel = await this.userMapper.fromEditDtoToUserModel(
            dtoResult.data,
        );

        const outputModel: UserModel = await this.userService.editUserById(
            id,
            model,
        );

        const userDto = this.userMapper.fromUserModelToDTO(outputModel);

        return this.successStatus(userDto);
    }

    @httpGet('/:id/delete')
    public async deleteById(@requestParam('id') id: string): Promise<any> {
        const [dto, validationResult] = await this.validateAsync<DeleteUserDTO>(
            DeleteUserDTO,
            {guid: id},
        );

        if (validationResult.hasErrors()) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        try {
            const userModel: UserModel = await this.userService.deleteUserById(
                id,
            );

            const userDto = this.userMapper.fromUserModelToDTO(userModel);

            return this.successStatus(userDto);
        } catch (e) {
            return this.failureStatus(e.message);
        }
    }
}
