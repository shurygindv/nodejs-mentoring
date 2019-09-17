import { injectable, inject } from 'inversify';

import { JwtProvider } from '../jwt/jwt-provider';
import {AuthModel} from './auth-model';
import { providerTokens } from '../tokens';

import { moduleTokens } from '../../modules/tokens';
import { IUserService } from '../../modules/users/users-service';
import { UserModel } from '../../modules/users/models/user-model';
import { AuthValidationError } from './errors/auth-validation-error';

const usedTokens = {
    userService: moduleTokens.users.UsersService,
    jwtProvider: providerTokens.jwtProvider
};

@injectable()
export class AuthProvider {
    @inject(usedTokens.userService) usersService: IUserService;
    @inject(usedTokens.jwtProvider) private jwtProvider: JwtProvider;

    async validateUser(login: string): Promise<void | never> {
        const existing: TS.MaybeNull<UserModel> = await this.usersService.getUserByLogin(login);

        if (!existing) {
            throw new AuthValidationError('Such user not exists');
        }
    }


    async login(login: string, password: string): Promise<AuthModel> {
        await this.validateUser(login);

        const signedToken: string = await this.jwtProvider.sign({login, password});

        return new AuthModel(signedToken);
    }
}