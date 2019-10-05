import {ValidationError} from 'class-validator';

import {HttpStatusCode} from './http-status-code';
import {HttpResult, HttpSuccessResult, HttpFailureResult} from './http-result';

export class Status {
    public static Result<TEnum extends string, TResponse>(
        status: TEnum,
        data?: TResponse,
        statusCode: HttpStatusCode = HttpStatusCode.OK,
    ) {
        return new HttpResult(statusCode, {data, status});
    }

    public static Success<TResponse>(
        ok: boolean,
        data: TResponse,
        statusCode: HttpStatusCode = HttpStatusCode.OK,
    ) {
        return new HttpSuccessResult(statusCode, {data, success: ok});
    }

    public static Error(
        errorCode: string | number,
        errorMessage: string,
        statusCode: HttpStatusCode = HttpStatusCode.BadRequest,
    ) {
        return new HttpFailureResult(statusCode, {
            errorCode: `${errorCode}`,
            errorMessage,
        });
    }

    public static ValidationError(
        validationErrors: ValidationError[] | Record<string, string>,
        statusCode: HttpStatusCode = HttpStatusCode.BadRequest,
    ) {
        return new HttpFailureResult(statusCode, {validationErrors});
    }
}
