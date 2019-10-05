import {CustomError} from '../../../lib/error';

export class AuthTokenNotPresented extends CustomError {
    public name = 'AuthTokenNotPresented';
}
