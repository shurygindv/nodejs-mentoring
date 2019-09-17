import { injectable, inject } from 'inversify';
import { BaseMiddleware } from "inversify-express-utils";

import { authTokens } from './tokens';

import { AuthProvider } from './auth-provider';
import { JwtVerifyError } from '../jwt/errors/jwt-verify-error';
import { Status } from '../../lib/http/http-status';
import { HttpFailureResult } from 'src/lib/http/http-result';
import { HttpStatusCode } from 'src/lib/http';
import { AuthTokenNotPresented } from './errors/auth-token-not-presented';


const statusAboutInvalidToken =  (): HttpFailureResult => {
    const message = 'unathorized, maybe token expired';

    return Status.Error(
        Api.ErrorCode.AuthError, 
        message,
        HttpStatusCode.Unauthorized
    );
}


const statusAboutNotPresentedToken =  (): HttpFailureResult => {
    const message = 'missed token, check';

    return Status.Error(
        Api.ErrorCode.AuthError, 
        message,
        HttpStatusCode.Unauthorized
    );
}

const selectStatus = (e: Error): HttpFailureResult | void  => {
    if (e instanceof JwtVerifyError) {
        return statusAboutInvalidToken();
    }

    if (e instanceof AuthTokenNotPresented) {
        return statusAboutNotPresentedToken();
    }
} 

@injectable()
export class AuthMiddleware extends BaseMiddleware {
    @inject(authTokens.authProvider) private authProvider: AuthProvider;


    public async handler(
        req: App.Request,
        res: App.Response,
        next: App.NextFn
    ) {
        const token = req.headers["x-auth-token"] as TS.MaybeUndefined<string>;

        try {
            await this.authProvider.checkToken(token);

            next();
        } catch (e) {
            const result = selectStatus(e);

            if (result) {
                return res.json(result.data).status(result.statusCode);
            }

            throw e;
        }
    }
}