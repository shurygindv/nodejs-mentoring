import { injectable, inject } from 'inversify';
import _ from 'lodash';

import { BaseRepository } from '../../core/base-repository';

import { dbTypes } from '../../providers/sequelize/tokens';
import { GroupDboModel } from '../../providers/sequelize/models/group-factory';

import { GroupModel } from './models/group-model';
import { GroupModelDboMapper } from './mapping/group-modeldbo-mapper';
import { groupTokens } from './tokens';

export interface IGroupsRepository {
    createGroup(id: Guid_v4, groupModel: GroupModel): Promise<GroupDboModel>;
    getById(id: Guid_v4): Promise<TS.MaybeNull<GroupDboModel>>
    getAll(): Promise<GroupDboModel[]>;
    updateById(id: Guid_v4, model: GroupModel): Promise<TS.MaybeNull<GroupDboModel>>
    deleteById(id: Guid_v4): Promise<number>
}

@injectable()
export class GroupsRepository extends BaseRepository implements IGroupsRepository {
    @inject(dbTypes.GroupModel) groupRepo: typeof GroupDboModel; // remake
    @inject(groupTokens.GroupDboMapper) mapper: GroupModelDboMapper;

    public async createGroup(
        id: Guid_v4, 
        groupModel: GroupModel
    ): Promise<GroupDboModel> {
        const created = await this.groupRepo.create({
            id: id,
            name: groupModel.name,
            permissions: groupModel.permissions
        });

       return created;
    }    
    
    
    public async getById (id: Guid_v4): Promise<TS.MaybeNull<GroupDboModel>> {
        const created = await this.groupRepo.findByPk(id);

       return created;
    }
    
    public async getAll (): Promise<GroupDboModel[]> {
        return await this.groupRepo.findAll();
    }
    
    public async updateById(
        id: Guid_v4, 
        model: GroupModel
    ): Promise<TS.MaybeNull<GroupDboModel>> {
        const [affectedRow, dboModel] = await this.groupRepo.update(model, { where: { id } });

        return _.first(dboModel) || null;
    }
    
    public async deleteById(id: Guid_v4): Promise<number> {
       const affectedRow = await this.groupRepo.destroy({where: {id}});
    
       return affectedRow;
    }
}