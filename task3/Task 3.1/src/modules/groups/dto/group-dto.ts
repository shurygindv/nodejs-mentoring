import { GroupPermission } from '../../../providers/sequelize/models/group-factory';

export class GroupDto {
    public id: Guid_v4;
    public name: string;
    public permissions: GroupPermission;
}