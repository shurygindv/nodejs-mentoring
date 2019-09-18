import {inject, injectable} from "inversify";

import {BaseService} from "../../core/base-service";

import {UserModel} from "../users/models/user-model";
import {GroupPermission} from "../../providers/database/models/groups";

import {userGroupTokens} from "./tokens";
import {userTokens} from "../users/tokens";
import {IUserService} from "../users/users-service";
import {UserGroupsDboModel} from "../../providers/database/models/user-groups";

export interface IUserGroupService {
    addUsersToGroup(groupId: guidV4, userIds: guidV4[]): Promise<UserModel[]>;
    checkUserHasPermissions(userId: guidV4, permissions: GroupPermission): Promise<number>
}

@injectable()
export class UserGroupsService extends BaseService implements IUserGroupService {
    @inject(userGroupTokens.userGroupsRepository) private userGroupsRepo: typeof UserGroupsDboModel;
    @inject(userTokens.usersService) private userService: IUserService;

    public addUsersToGroup (groupId: string, userIds: guidV4[]): Promise<UserModel[]> {
        return this.userGroupsRepo.create({

        })
    }

    public addUserGroups () {
        return undefined;
    }

    public checkUserHasPermissions(userId: string, permissions: GroupPermission): Promise<number> {
        return undefined;
    }
}
