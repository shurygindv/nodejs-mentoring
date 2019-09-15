
import {interfaces} from 'inversify';

import {UsersController} from './users-controller';
import {UsersService, IUserService} from './users-service';
import {UsersRepository, IUsersRepository} from './users-repository';

import { UserDtoMapper } from './mapping/user-dto-mapper';
import { UserModelDboMapper } from './mapping/user-modeldbo-mapper';

const userTypes = {
    UserDtoMapper: 'UserDtoMapper',
    UserDboMapper: 'UserDboMapper',

    UsersController: 'UsersController',
    UsersService: 'UsersService',
    UsersRepository: 'UsersRepository',
}

const connectUsersModule = (container: interfaces.Container): void => {
    container.bind<UserDtoMapper>(userTypes.UserDtoMapper)
    .to(UserDtoMapper);

    container.bind<UserModelDboMapper>(userTypes.UserDboMapper)
    .to(UserModelDboMapper);

    container.bind<UsersController>(userTypes.UsersController)
        .to(UsersController);

    container.bind<UsersService>(userTypes.UsersService)
        .to(UsersService);

    container.bind<UsersRepository>(userTypes.UsersRepository)
        .to(UsersRepository);
}

export {
    userTypes, 
    connectUsersModule,  
}