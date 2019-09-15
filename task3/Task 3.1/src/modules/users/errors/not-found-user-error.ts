import { ValidationError } from 'class-validator';

import { ValidationFailure } from '../../../lib/validation/validation-failure';

export class NotFoundUserError extends ValidationFailure {
    public constructor (message: string) {
        super(message);

        this.name = 'NotFoundUserError';
    }
}