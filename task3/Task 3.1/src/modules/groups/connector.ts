
import {interfaces} from 'inversify';

import {GroupsController} from './groups-controller';
import {GroupsService, IGroupsService} from './groups-service';
import {GroupsRepository, IGroupsRepository} from './groups-repository';

import { GroupDtoMapper } from './mapping/group-dto-mapper';
import { GroupModelDboMapper } from './mapping/group-modeldbo-mapper';

const groupTypes = {
    GroupDtoMapper: 'GroupDtoMapper',
    GroupDboMapper: 'GroupDboMapper',

    GroupsController: 'GroupsController',
    GroupsService: 'GroupsService',
    GroupsRepository: 'GroupsRepository',
}

const connectGroupsModule = (container: interfaces.Container) => {
    container.bind<GroupDtoMapper>(groupTypes.GroupDtoMapper)
    .to(GroupDtoMapper);

    container.bind<GroupModelDboMapper>(groupTypes.GroupDboMapper)
    .to(GroupModelDboMapper);

    container.bind<GroupsController>(groupTypes.GroupsController)
        .to(GroupsController);

    container.bind<GroupsService>(groupTypes.GroupsService)
        .to(GroupsService);

    container.bind<GroupsRepository>(groupTypes.GroupsRepository)
        .to(GroupsRepository);
}

export {
    groupTypes,
    connectGroupsModule
}