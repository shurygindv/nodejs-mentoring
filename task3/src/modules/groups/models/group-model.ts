import {GroupPermission} from '../../../providers/sequelize/models/group-factory';

export class GroupModel {
    public id?: guidV4;
    public name: string;
    public permissions: GroupPermission;
}
