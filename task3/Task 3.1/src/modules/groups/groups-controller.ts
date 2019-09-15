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
import { IGroupsService } from './groups-service';
import { GroupTypes } from './connector';

import { GroupDtoMapper } from './mapping/group-dto-mapper';

import { RegisterUserDto } from './dto/register-group-dto';
import { DeleteUserDto } from './dto/delete-group-dto';
import { EditUserDto } from './dto/edit-group-dto';

import { UserModel } from './models/group-model';

@controller('/groups')
export class GroupsController extends BaseController implements App.IController {
    @inject(GroupTypes.GroupsService) private groupService: IGroupsService;
    @inject(GroupTypes.GroupDtoMapper) private groupMapper: GroupDtoMapper;

    // TODO: pagination
    @httpGet('/')
    public async index(
        req: App.Request,
        res: App.Response
    ): Promise<JsonResult<[]>> {
        const users = await this.groupService.getAllGroups();

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

        if (validationResult.hasErrors()) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        const model: UserModel = await this.groupMapper.fromRegisterDtoToUserModel(dtoResult.data);

        const outputModel = await this.groupService.createGroup(model);

        const userDto = this.groupMapper.fromUserModelToDTO(outputModel);

        return this.successStatus(userDto);
    }

    @httpPut('/:id/edit')
    public async editUserById(req: App.Request<EditUserDto>, res: App.Response) {
        const id: Guid_v4 = req.params.id;

        const [dtoResult, validationResult] = await this.validateAsync(
            EditUserDto,
            req.body
        );

        if (validationResult.hasErrors()) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        const model: UserModel = await this.groupMapper.fromEditDtoToUserModel(dtoResult.data);

        const outputModel: UserModel = await this.groupService.editGroupById(
            id, 
            model
        );

        const userDto = this.groupMapper.fromUserModelToDTO(outputModel);

        return this.successStatus(userDto);
    }

    @httpGet('/:id/delete')
    public async deleteById(
        @requestParam('id') id: string,
        @response() res: App.Response
    ): Promise<any> { 
        const [dto, validationResult] = await this.validateAsync<DeleteUserDto>(DeleteUserDto, {
            guid: id,
        });

        if (validationResult.hasErrors()) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        try {
            const userModel: UserModel = await this.groupService.deleteGroupById(id);

            const userDto = this.groupMapper.fromUserModelToDTO(userModel);

            return this.successStatus(userDto);

        } catch (e) {
            return this.failureStatus(e.message)
        }
    }
}
