
import {interfaces} from 'inversify';

import {GroupsController} from './groups-controller';
import {GroupsService, IGroupsService} from './groups-service';
import {GroupsRepository, IGroupsRepository} from './groups-repository';

import { GroupDtoMapper } from './mapping/group-dto-mapper';
import { GroupModelDboMapper } from './mapping/group-modeldbo-mapper';

const GroupTypes = {
    GroupDtoMapper: 'UserDtoMapper',
    GroupDboMapper: 'UserDboMapper',

    GroupsController: 'GroupsController',
    GroupsService: 'GroupsService',
    GroupsRepository: 'GroupsRepository',
}

export const connectGroupsModule = (container: interfaces.Container) => {
    
}

export {
    GroupTypes,
    connectGroupsModule
}