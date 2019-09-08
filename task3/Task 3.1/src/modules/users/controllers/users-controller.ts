import {
    httpGet,
    httpPost,
    httpPut,

    response,
    controller,
    requestParam,
} from 'inversify-express-utils';

import {BaseController} from '../../../core/base-controller';

@controller('/users')
export default class UsersController extends BaseController implements App.IController {

    @httpGet('/')
    public index (req: App.Request, res: App.Response) {

    }

    @httpPost('/')
    public create (req: App.Request, res: App.Response) {

    }

    @httpPut('/edit')
    public editById (req: App.Request, res: App.Response) {

    }

    @httpGet('/:id')
    public getById (@requestParam("id") id: string,  @response() res: App.Response) {
        
    }
}