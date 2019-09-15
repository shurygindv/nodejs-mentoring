import { GroupPermission } from '../../../providers/sequelize/models/group-factory';

export class GroupModel {
    public id?: Guid_v4;
    public name: string;
    public permissions: GroupPermission;
}