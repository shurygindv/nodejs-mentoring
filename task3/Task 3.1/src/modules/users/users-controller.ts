import {
    httpGet,
    httpPost,
    httpPut,

    response,
    controller,
    requestParam,
} from 'inversify-express-utils';
import { inject } from 'inversify';

import  { BaseController } from '../../core/base-controller';
import { RegisterUserDto } from './dto/register-user-dto';
import { IUserService } from './users-service';
import { UserTypes } from './connector';

@controller('/users')
export class UsersController extends BaseController implements App.IController {
    @inject(UserTypes.UsersService) private userService: IUserService;

    @httpGet('/')
    public index (req: App.Request, res: App.Response) {
        return 
    }

    @httpPost('/register')
    public registerUser (req: App.Request, res: App.Response) {

    }

    @httpPut('/:id/edit/password')
    public editUserById (req: App.Request, res: App.Response) {

    }

    @httpPut('/:id/edit')
    public editUserPasswordById (req: App.Request, res: App.Response) {

    }

    @httpGet('/:id/delete')
    public getById (@requestParam("id") id: string,  @response() res: App.Response) {
        
    }
}