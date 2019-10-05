import _ from 'lodash';
import {ValidationError} from 'class-validator';

export default class ServiceValidationResult {
    private errors: ValidationError[];

    public constructor(errors: ValidationError[]) {
        this.errors = errors;
    }

    public get result(): ValidationError[] {
        return this.errors;
    }

    public isValid(): boolean {
        return _.isEmpty(this.errors);
    }

    public hasErrors(): boolean {
        return !this.isValid();
    }
}
