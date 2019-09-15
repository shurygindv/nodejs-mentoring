import { HttpStatusCode } from './http-status-code';
import { ValidationError } from 'class-validator';

class HttpResult<R> {
    public statusCode: HttpStatusCode;
    public data: R;

    public constructor (statusCode: HttpStatusCode, data: R) {
        this.statusCode = statusCode;
        this.data = data;
    }
}

//

type HttpSuccessData<T> = {
    success: boolean,
    data: T
}

class HttpSuccessResult<T> extends HttpResult<HttpSuccessData<T>> {}

//

type HttpFailureData = {
    errorCode?: string;
    errorMessage?: string;
    validationErrors?: ValidationError[] | Record<string, string>;
};

class HttpFailureResult extends HttpResult<HttpFailureData> {}

export {
    HttpResult,
    HttpSuccessResult,
    HttpFailureResult
};