import {Container} from 'inversify';

import {UserGroupsService} from './user-groups-service';
import {UserGroupsRepository} from './users-groups-repository';

import {userGroupTokens} from './tokens';

export const connectUserGroupsModule = (container: Container): void => {
    container.bind<UserGroupsRepository>(userGroupTokens.userGroupsRepository)
            .to(UserGroupsRepository);

    container
        .bind<UserGroupsService>(userGroupTokens.userGroupService)
        .to(UserGroupsService);
};
