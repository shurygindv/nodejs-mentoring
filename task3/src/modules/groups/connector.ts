import {interfaces} from 'inversify';

import {GroupsController} from './groups-controller';
import {GroupsService, IGroupsService} from './groups-service';
import {GroupsRepository, IGroupsRepository} from './groups-repository';

import {GroupDtoMapper} from './mapping/group-dto-mapper';
import {GroupModelDboMapper} from './mapping/group-modeldbo-mapper';

import {groupTokens} from './tokens';

export const connectGroupsModule = (container: interfaces.Container) => {
    container
        .bind<GroupDtoMapper>(groupTokens.groupDtoMapper)
        .to(GroupDtoMapper);

    container
        .bind<GroupModelDboMapper>(groupTokens.groupDboMapper)
        .to(GroupModelDboMapper);

    container
        .bind<GroupsController>(groupTokens.groupsController)
        .to(GroupsController);

    container.bind<GroupsService>(groupTokens.groupsService).to(GroupsService);

    container
        .bind<GroupsRepository>(groupTokens.groupsRepository)
        .to(GroupsRepository);
};
