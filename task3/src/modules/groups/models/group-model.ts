import {GroupPermission} from '../../../providers/database/models/groups';

export class GroupModel {
    public id?: guidV4;
    public name: string;
    public permissions: GroupPermission;
}
