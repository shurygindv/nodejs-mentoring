import {CustomError} from '../../../lib/error';

export class AuthValidationError extends CustomError {
    public name = 'AuthValidationError';
}
