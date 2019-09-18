import {interfaces} from 'inversify';

import {GroupsController} from './groups-controller';
import {GroupsService, IGroupsService} from './groups-service';
import {GroupsRepository, IGroupsRepository} from './groups-repository';

import {GroupDtoMapper} from './mapping/group-dto-mapper';
import {GroupModelDboMapper} from './mapping/group-modeldbo-mapper';

import {groupTokens} from './tokens';

export const connectGroupsModule = (container: interfaces.Container) => {
    container
        .bind<GroupDtoMapper>(groupTokens.GroupDtoMapper)
        .to(GroupDtoMapper);

    container
        .bind<GroupModelDboMapper>(groupTokens.GroupDboMapper)
        .to(GroupModelDboMapper);

    container
        .bind<GroupsController>(groupTokens.GroupsController)
        .to(GroupsController);

    container.bind<GroupsService>(groupTokens.GroupsService).to(GroupsService);

    container
        .bind<GroupsRepository>(groupTokens.GroupsRepository)
        .to(GroupsRepository);
};
