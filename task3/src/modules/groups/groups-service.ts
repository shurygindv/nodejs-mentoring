import { injectable, inject } from 'inversify';

import { Random } from '../../lib/random';
import { BaseService } from '../../core/base-service';

import { groupTokens } from './tokens';
import { IGroupsRepository } from './groups-repository';

import { GroupModel } from './models/group-model';
import { CreateGroupServiceError } from './errors/create-group-service-error';
import { GroupModelDboMapper } from './mapping/group-modeldbo-mapper';
import { NotFoundGroupError } from './errors/not-found-group-error';

export interface IGroupsService {
    createGroup(groupModel: GroupModel): Promise<GroupModel>;
    getGroupById(id: string): Promise<TS.MaybeNull<GroupModel>>;
    getAllGroups(): Promise<GroupModel[]>;
    editGroupById(id: Guid_v4, groupModel: GroupModel): Promise<GroupModel>;
    deleteGroupById(id: Guid_v4): Promise<GroupModel>;
}

@injectable()
export class GroupsService extends BaseService implements IGroupsService {
    @inject(groupTokens.GroupsRepository) private groupRepository: IGroupsRepository;
    @inject(groupTokens.GroupDboMapper) private groupMapper: GroupModelDboMapper;

    public async createGroup(groupModel: GroupModel): Promise<GroupModel> {
        const validationResult = await this.validateAsync(groupModel);

        if (validationResult.hasErrors) {
            throw new CreateGroupServiceError(validationResult.result);
        }

        const id = await Random.guidAsync();

        const outputGroupDbo = await this.groupRepository.createGroup(
            id, 
            groupModel
        );
    
        return await this.groupMapper.fromDboToGroupModel(outputGroupDbo);
    }

    public async getGroupById (id: Guid_v4): Promise<TS.MaybeNull<GroupModel>> {
        const outputGroupDbo = await this.groupRepository.getById(id);
    
        return await this.groupMapper.fromDboToGroupModel(outputGroupDbo)
    }

    public async getAllGroups(): Promise<GroupModel[]> {
        const outputGroupDbo = await this.groupRepository.getAll();
    
        return await this.groupMapper.fromDboToGroupModelArray(outputGroupDbo)
    }

    public async editGroupById(id: Guid_v4, groupModel: GroupModel): Promise<GroupModel> {
        const outputGroupDbo = await this.groupRepository.updateById(
            id,
            groupModel
        );
    
        return await this.groupMapper.fromDboToGroupModel(outputGroupDbo)
    }

    public async deleteGroupById(id: Guid_v4): Promise<GroupModel> {
        const existing = this.getGroupById(id);

        if (!existing) {
            throw new NotFoundGroupError('Group Not Found')
        }

        await this.groupRepository.deleteById(id);
      
        return existing;
    }
}