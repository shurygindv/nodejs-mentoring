import { ValidationFailure } from '../../../lib/validation/validation-failure';

export class NotFoundGroupError extends ValidationFailure {
    public constructor (message: string) {
        super(message);

        this.name = 'NotFoundGroupError';
    }
}