import {GroupPermission} from '../../../providers/database/models/groups';

export class GroupDto {
    public id: guidV4;
    public name: string;
    public permissions: GroupPermission;
}
