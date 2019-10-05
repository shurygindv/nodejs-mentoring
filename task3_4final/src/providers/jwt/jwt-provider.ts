import {injectable} from 'inversify';
import * as jwt from 'jsonwebtoken';

import {JwtVerifyError} from './errors/jwt-verify-error';
import {jwtConfig} from '../../config/jwt';

const secretKey: () => string = () => jwtConfig.secret;

const options = {
    algorithm: jwtConfig.algorithm,
    expiresIn: jwtConfig.expiresIn,
};

@injectable()
export class JwtProvider {
    public async sign(user: any): Promise<string> {
        const accessToken = jwt.sign(user, secretKey(), options);

        return Promise.resolve(accessToken);
    }

    public async verify(token: string): Promise<string | object> {
        return new Promise((resolve: Function) => {
            jwt.verify(token, secretKey(), (err: jwt.VerifyErrors, decoded) => {
                if (err) {
                    throw new JwtVerifyError(err.message);
                }

                resolve(decoded);
            });
        });
    }
}
