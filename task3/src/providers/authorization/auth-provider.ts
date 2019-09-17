import { injectable, inject } from 'inversify';

import { JwtProvider } from '../jwt/jwt-provider';
import {AuthModel} from './auth-model';
import { providerTokens } from '../tokens';

import { moduleTokens } from '../../modules/tokens';
import { IUserService } from '../../modules/users/users-service';
import { UserModel } from '../../modules/users/models/user-model';
import { AuthValidationError } from './errors/auth-validation-error';
import { AuthTokenNotPresented } from './errors/auth-token-not-presented';

const using = {
    userService: moduleTokens.users.usersService,
    jwtProvider: providerTokens.jwtProvider
};

@injectable()
export class AuthProvider {
    @inject(using.userService) private usersService: IUserService;
    @inject(using.jwtProvider) private jwtProvider: JwtProvider;

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

    
    async checkToken(token?: string): Promise<string | object | never> {

        if (!token) {
            throw new AuthTokenNotPresented('Auth token is missed');
        }

        return this.jwtProvider.verify(token)
    }
}