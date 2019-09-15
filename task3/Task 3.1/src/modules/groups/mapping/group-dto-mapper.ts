import { BaseMapper } from '../../../lib/mapping';

import { CreateGroupDto } from '../dto/create-group-dto';
import { EditGroupDto } from '../dto/edit-group-dto';
// to =>
import { GroupModel } from '../models/group-model';
import { GroupDto } from '../dto/group-dto';

export class GroupDtoMapper extends BaseMapper {
    public fromCreateDtoToGroupModel (dto: CreateGroupDto): Promise<GroupModel> {
        const model: GroupModel = this.createInstance<GroupModel>(GroupModel, {
            name: dto.name,
            permissions: dto.permissions,
        });

        return this.beLazy(model);
    }

    public fromEditDtoToGroupModel (dto: EditGroupDto): Promise<GroupModel> {
        const model: GroupModel = this.createInstance<GroupModel>(GroupModel, {
            name: dto.name,
            permissions: dto.permissions,
        });

        return this.beLazy(model);
    }

    public fromGroupModelToDTO (model: GroupModel): Promise<GroupDto> {
        const dto: GroupDto = {
            id: model.id,
            name: model.name,
            permissions: model.permissions,
        }

        return this.beLazy(dto);
    }
}