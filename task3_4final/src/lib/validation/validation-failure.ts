import {ValidationError} from 'class-validator';

import {CustomError} from '../error/index';

const VALIDATION_ERROR_NAME = 'ValidationError';

export class ValidationFailure extends CustomError {
    protected errors: ValidationError[] | string;

    public constructor(errors: ValidationError[] | string) {
        super();

        this.name = VALIDATION_ERROR_NAME;
        this.errors = errors;
    }
}
