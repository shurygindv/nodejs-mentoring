import {CustomError} from '../error';

const API_ERROR_NAME = 'ApiError';

export default class ApiError<T> extends CustomError {
    private errors: T[];

    public constructor (errors: T[]) {
        super();

        this.name = API_ERROR_NAME;

        this.errors = errors;
    }

    hasErrors (): boolean {
        return Boolean(this.errors);
    }
}