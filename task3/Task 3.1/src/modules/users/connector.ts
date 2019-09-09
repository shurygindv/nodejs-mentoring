
import {interfaces} from 'inversify';

import {UsersController} from './users-controller';
import {UsersService, IUserService} from './users-service';
import {UsersRepository, IUsersRepository} from './users-repository';

const UserTypes = {
    UsersController: 'UsersController',
    UsersService: 'UsersService',
    UsersRepository: 'UsersRepository',
}

const connectUsersModule = (container: interfaces.Container): void => {
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