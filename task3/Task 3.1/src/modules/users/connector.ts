
import {interfaces} from 'inversify';

import {UsersController} from './users-controller';
import {UsersService, IUserService} from './users-service';
import {UsersRepository, IUsersRepository} from './users-repository';

import { UserDtoMapper } from './mapping/user-dto-mapper';
import { UserModelDboMapper } from './mapping/user-modeldbo-mapper';

const UserTypes = {
    UserDtoMapper: 'UserDtoMapper',
    UserDboMapper: 'UserDboMapper',

    UsersController: 'UsersController',
    UsersService: 'UsersService',
    UsersRepository: 'UsersRepository',
}

const connectUsersModule = (container: interfaces.Container): void => {
    container.bind<UserDtoMapper>(UserTypes.UserDtoMapper)
    .to(UserDtoMapper);

    container.bind<UserModelDboMapper>(UserTypes.UserDboMapper)
    .to(UserModelDboMapper);

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