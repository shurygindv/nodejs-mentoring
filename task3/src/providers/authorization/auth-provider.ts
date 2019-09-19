import {injectable, inject} from 'inversify';

import {JwtProvider} from '../jwt/jwt-provider';
import {AuthModel} from './auth-model';
import {providerTokens} from '../tokens';

import {moduleTokens} from '../../modules/tokens';
import {IUserService} from '../../modules/users/users-service';
import {UserModel} from '../../modules/users/models/user-model';

import {AuthValidationError} from './errors/auth-validation-error';
import {AuthTokenNotPresented} from './errors/auth-token-not-presented';
import {VerificationFailed} from './errors/verification-failed'

import {NotFoundUserError} from "../../modules/users/errors/not-found-user-error";

const using = {
    userService: moduleTokens.users.usersService,
    jwtProvider: providerTokens.jwtProvider,
};

@injectable()
export class AuthProvider {
    @inject(using.userService) private usersService: IUserService;
    @inject(using.jwtProvider) private jwtProvider: JwtProvider;

    async validateUser(login: string, password: string): Promise<void | never> {
        let isVerified = false;

        try {
            isVerified = await this.usersService.verifyUser(login, password);
        } catch (e) {
            if (e instanceof NotFoundUserError) {
                throw new AuthValidationError('Such user not exists');
            }

            throw e;
        }

        if (!isVerified) {
            throw new VerificationFailed("sent password doesn't match user");
        }
    }

    async login(login: string, password: string): Promise<AuthModel> {
        await this.validateUser(login, password);

        const signedToken: string = await this.jwtProvider.sign({
            login,
            password,
        });

        return new AuthModel(signedToken);
    }

    async checkToken(token?: string): Promise<string | object | never> {
        if (!token) {
            throw new AuthTokenNotPresented('Auth token is missed');
        }

        return this.jwtProvider.verify(token);
    }
}
