import {ValidationError} from 'class-validator';

import {CustomError} from '../error/index';

const VALIDATION_ERROR_NAME = 'ValidationError';

export class ValidationFailure extends CustomError {
    protected errors: ValidationError[];
    
    public constructor (errors: ValidationError[]) {
        super();

        this.name = VALIDATION_ERROR_NAME;
        this.errors = errors;
    }
}