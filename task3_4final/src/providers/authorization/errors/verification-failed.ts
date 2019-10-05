import {CustomError} from '../../../lib/error';

export class VerificationFailed extends CustomError {
    public name = 'VerificationFailed';
}
