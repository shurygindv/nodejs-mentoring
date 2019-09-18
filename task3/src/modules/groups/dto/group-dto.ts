import {GroupPermission} from '../../../providers/sequelize/models/group-factory';

export class GroupDto {
    public id: guidV4;
    public name: string;
    public permissions: GroupPermission;
}
