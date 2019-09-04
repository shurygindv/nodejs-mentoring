import { HttpSuccessResult } from '.';
import { HttpErrorResult } from '.';

export default abstract class HttpResult {
    public static success<T>(data: T): $APIHelpers.Response<T> {
        return new HttpSuccessResult(data).valueOf();
    }

    public static error(message: string, errorCode: number): $APIHelpers.FailureResponse {
        return new HttpErrorResult(message, errorCode).valueOf();
        // yees, it equals `return {Error: errroCode, Message: message}` more simple
    }

    protected message: string;

    protected constructor(message?: string) {
        this.message = message || '';
    }
}

