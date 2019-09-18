import {Container} from 'inversify';

import {UsersController} from './users-controller';
import {UsersService, IUserService} from './users-service';
import {UsersRepository, IUsersRepository} from './users-repository';

import {UserDtoMapper} from './mapping/user-dto-mapper';
import {UserModelDboMapper} from './mapping/user-modeldbo-mapper';

import {userTokens} from './tokens';

export const connectUsersModule = (container: Container): void => {
    container.bind<UserDtoMapper>(userTokens.userDtoMapper).to(UserDtoMapper);

    container
        .bind<UserModelDboMapper>(userTokens.userDboMapper)
        .to(UserModelDboMapper);

    container
        .bind<UsersController>(userTokens.usersController)
        .to(UsersController);

    container.bind<UsersService>(userTokens.usersService).to(UsersService);

    container
        .bind<UsersRepository>(userTokens.usersRepository)
        .to(UsersRepository);
};
