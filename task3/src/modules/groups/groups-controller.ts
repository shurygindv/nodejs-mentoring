import {
    httpGet,
    httpPost,
    httpPut,
    requestBody,
    controller,
    requestParam,
} from 'inversify-express-utils';
import {JsonResult} from 'inversify-express-utils/dts/results';
import {inject} from 'inversify';

import {BaseController} from '../../core/base-controller';
import {IGroupsService} from './groups-service';
import {groupTokens} from './tokens';

import {GroupDtoMapper} from './mapping/group-dto-mapper';

import {CreateGroupDto} from './dto/create-group-dto';
import {DeleteGroupDto} from './dto/delete-group-dto';
import {EditGroupDto} from './dto/edit-group-dto';

import {GroupModel} from './models/group-model';

@controller('/groups')
export class GroupsController extends BaseController
    implements App.IController {
    @inject(groupTokens.GroupsService) private groupService: IGroupsService;
    @inject(groupTokens.GroupDtoMapper) private groupMapper: GroupDtoMapper;

    // TODO: pagination
    @httpGet('/')
    public async index(
        req: App.Request,
        res: App.Response,
    ): Promise<JsonResult<[]>> {
        const groups = await this.groupService.getAllGroups();

        return this.successStatus(groups);
    }

    @httpPost('/create')
    public async createGroup(@requestBody() groupDtoBody: CreateGroupDto) {
        const [dtoResult, validationResult] = await this.validateAsync(
            CreateGroupDto,
            groupDtoBody,
        );

        if (validationResult.hasErrors()) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        const model: GroupModel = await this.groupMapper.fromCreateDtoToGroupModel(
            dtoResult.data,
        );

        try {
            const outputModel = await this.groupService.createGroup(model);

            const groupDto = this.groupMapper.fromGroupModelToDTO(outputModel);

            return this.successStatus(groupDto);
        } catch (e) {
            return this.failureStatus(e.message);
        }
    }

    @httpPut('/:id/edit')
    public async editGroupById(
        @requestBody() editGroupDtoBody: EditGroupDto,
        @requestParam('id') id: guidV4,
    ) {
        const [dtoResult, validationResult] = await this.validateAsync(
            EditGroupDto,
            editGroupDtoBody,
        );

        if (validationResult.hasErrors()) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        const model: GroupModel = await this.groupMapper.fromEditDtoToGroupModel(
            dtoResult.data,
        );

        const outputModel: GroupModel = await this.groupService.editGroupById(
            id,
            model,
        );

        const groupDto = this.groupMapper.fromGroupModelToDTO(outputModel);

        return this.successStatus(groupDto);
    }

    @httpGet('/:id/delete')
    public async deleteById(@requestParam('id') id: string): Promise<any> {
        const [, validationResult] = await this.validateAsync<DeleteGroupDto>(
            DeleteGroupDto,
            {guid: id},
        );

        if (validationResult.hasErrors()) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        try {
            const groupModel: GroupModel = await this.groupService.deleteGroupById(
                id,
            );

            const groupDto = this.groupMapper.fromGroupModelToDTO(groupModel);

            return this.successStatus(groupDto);
        } catch (e) {
            return this.failureStatus(e.message);
        }
    }
}
