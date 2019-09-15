import { GROUP_PERMISSION } from '../../../providers/sequelize/models/group-factory';

class GroupDto {
    public id?: Guid_v4;
    public name: string;
    public permissions: GROUP_PERMISSION;
}

export {
    GroupDto
}