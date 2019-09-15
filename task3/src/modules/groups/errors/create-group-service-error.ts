import { ValidationError } from 'class-validator';

import { ValidationFailure } from '../../../lib/validation/validation-failure';

export class CreateGroupServiceError extends ValidationFailure {
    public constructor (errors: ValidationError[]) {
        super(errors);

        this.name = 'CreateGroupServiceError';
    }
}