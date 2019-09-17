

import {Container} from 'inversify';

import {UsersController} from './users-controller';
import {UsersService, IUserService} from './users-service';
import {UsersRepository, IUsersRepository} from './users-repository';

import { UserDtoMapper } from './mapping/user-dto-mapper';
import { UserModelDboMapper } from './mapping/user-modeldbo-mapper';

import {userTokens} from './tokens';

export const connectUsersModule = (container: Container): void => {
    container.bind<UserDtoMapper>(userTokens.UserDtoMapper)
    .to(UserDtoMapper);

    container.bind<UserModelDboMapper>(userTokens.UserDboMapper)
    .to(UserModelDboMapper);

    container.bind<UsersController>(userTokens.UsersController)
        .to(UsersController);

    container.bind<UsersService>(userTokens.UsersService)
        .to(UsersService);

    container.bind<UsersRepository>(userTokens.UsersRepository)
        .to(UsersRepository);
}