import {
    httpGet,
    httpPost,
    httpPut,

    response,
    controller,
    requestParam,
} from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/dts/results';
import { inject } from 'inversify';

import  { BaseController } from '../../core/base-controller';
import { IUserService } from './users-service';
import { UserTypes } from './connector';

import { RegisterUserDto } from './dto/register-user-dto';
import { EditUserDto, EditPasswordUserDto } from './dto/edit-user-dto';


@controller('/users')
export class UsersController extends BaseController implements App.IController {
    @inject(UserTypes.UsersService) private userService: IUserService;

    @httpGet('/')
    public async index (
        req: App.Request, res: App.Response
    ): Promise<JsonResult<[]>> {
        const users = await this.userService.getAllUsers();

        return this.successStatus(users)
    }

    @httpPost('/register')
    public async registerUser (
        req: App.Request<RegisterUserDto>, 
        res: App.Response
     ) {
        const validated = await this.validateAsync(RegisterUserDto, req.body);
     
    }

    @httpPut('/:id/edit/password')
    public editUserById (
        req: App.Request<EditUserDto>, 
        res: App.Response
        ) {

    }

    @httpPut('/:id/edit')
    public editUserPasswordById (
        req: App.Request<EditPasswordUserDto>,
        res: App.Response
    ) {

    }

    @httpGet('/:id/delete')
    public getById (@requestParam("id") id: string,  @response() res: App.Response) {
        
    }
}