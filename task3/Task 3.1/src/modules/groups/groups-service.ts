import { injectable, inject } from 'inversify';

import { Random } from '../../lib/random';
import { BaseService } from '../../core/base-service';

import { GroupTypes } from './connector';
import { IGroupsRepository } from './groups-repository';

import { UserModel } from './models/group-model';
import { CreateUserServiceError } from './errors/create-user-service-error';
import { GroupModelDboMapper } from './mapping/group-modeldbo-mapper';
import { NotFoundUserError } from './errors/not-found-user-error';

export interface IGroupsService {
    createGroup(userModel: UserModel): Promise<UserModel>;
    getGroupById(id: string): Promise<TS.MaybeNull<UserModel>>;
    getAllGroups(): Promise<UserModel[]>;
    editGroupById(id: Guid_v4, userModel: UserModel): Promise<UserModel>;
    deleteGroupById(id: Guid_v4): Promise<UserModel>;
}

@injectable()
export class GroupsService extends BaseService implements IGroupsService {
    @inject(GroupTypes.GroupsRepository) private groupRepository: IGroupsRepository;
    @inject(GroupTypes.GroupDboMapper) private groupMapper: GroupModelDboMapper;

    public async createGroup(userModel: UserModel): Promise<UserModel> {
        const validationResult = await this.validateAsync(userModel);

        if (validationResult.hasErrors) {
            throw new CreateUserServiceError(validationResult.result);
        }

        const id = await Random.guidAsync();

        const outputUserDbo = await this.groupRepository.createGroup(
            id, 
            userModel
        );
    
        return await this.groupMapper.fromDboToUserModel(outputUserDbo);
    }

    public async getGroupById (id: Guid_v4): Promise<TS.MaybeNull<UserModel>> {
        const outputUserDbo = await this.groupRepository.getById(id);
    
        return await this.groupMapper.fromDboToUserModel(outputUserDbo)
    }

    public async getAllGroups(): Promise<UserModel[]> {
        const outputUserDbo = await this.groupRepository.getAll();
    
        return await this.groupMapper.fromDboToUserModelArray(outputUserDbo)
    }

    public async editGroupById(id: Guid_v4, userModel: UserModel): Promise<UserModel> {
        const outputUserDbo = await this.groupRepository.updateById(
            id,
            userModel
        );
    
        return await this.groupMapper.fromDboToUserModel(outputUserDbo)
    }

    public async deleteGroupById(id: Guid_v4): Promise<UserModel> {
        const existing = this.getGroupById(id);

        if (!existing) {
            throw new NotFoundUserError('User Not Found')
        }

        await this.groupRepository.deleteById(id);
      
        return existing;
    }
}