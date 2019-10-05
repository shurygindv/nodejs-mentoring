import {CustomError} from '../../../lib/error';

export class JwtVerifyError extends CustomError {
    public name = 'JwtVerifyError';
}
