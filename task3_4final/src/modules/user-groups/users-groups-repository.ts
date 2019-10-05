import {inject, injectable} from "inversify";

import {BaseRepository} from "../../core/base-repository";

import {UserGroupsDboModel} from "../../providers/database/models/user-groups";
import {GroupPermission} from "../../providers/database/models/groups";
import {UserDboModel} from "../../providers/database/models/users";
import {dbTokens} from "../../providers/database/tokens";


export interface IUserGroupsRepository {
    addUsersToGroup(groupId: guidV4, userIds: guidV4[]): Promise<UserDboModel[]>;
    checkUserHasPermissions(userId: guidV4, permissions: GroupPermission): Promise<number>
}

@injectable()
export class UserGroupsRepository extends BaseRepository implements IUserGroupsRepository {
    @inject(dbTokens.userGroupModel) private userGroupModel: typeof UserGroupsDboModel;

    public addUsersToGroup(groupId: string, userIds: guidV4[]): Promise<UserDboModel[]> {
        throw new Error("Not implemented yet")
    }

    public checkUserHasPermissions(userId: string, permissions: GroupPermission): Promise<number> {
        throw new Error("Not implemented yet")
    }

}
