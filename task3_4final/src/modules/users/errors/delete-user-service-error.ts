import {ValidationError} from 'class-validator';

import {ValidationFailure} from '../../../lib/validation/validation-failure';

export class DeleteUserServiceError extends ValidationFailure {
    public constructor(errors: ValidationError[]) {
        super(errors);

        this.name = 'DeleteUserServiceError';
    }
}
