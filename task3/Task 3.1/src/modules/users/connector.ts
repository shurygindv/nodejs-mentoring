
import {interfaces} from 'inversify';

import {UsersController} from './users-controller';
import {UsersService, IUserService} from './users-service';
import {UsersRepository, IUsersRepository} from './users-repository';

import { UserDtoMapper } from './mapping/user-dto-mapper';
import { UserModelMapper } from './mapping/user-model-mapper';

const UserTypes = {
    UserDtoMapper: 'UserDtoMapper',
    UserModelMapper: 'UserModelMapper',

    UsersController: 'UsersController',
    UsersService: 'UsersService',
    UsersRepository: 'UsersRepository',
}

const connectUsersModule = (container: interfaces.Container): void => {
    container.bind<UserDtoMapper>(UserTypes.UserDtoMapper)
    .to(UserDtoMapper);

    container.bind<UserModelMapper>(UserTypes.UserModelMapper)
    .to(UserModelMapper);

    container.bind<UsersController>(UserTypes.UsersController)
        .to(UsersController);

    container.bind<UsersService>(UserTypes.UsersService)
        .to(UsersService);

    container.bind<UsersRepository>(UserTypes.UsersRepository)
        .to(UsersRepository);
}

export {
    UserTypes, 
    connectUsersModule,  
}