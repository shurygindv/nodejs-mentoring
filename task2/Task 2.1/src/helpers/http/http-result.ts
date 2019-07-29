import { ResponseResult } from '../../types';

import { HttpSuccessResult } from '.';
import { HttpErrorResult } from '.';

export default abstract class HttpResult {
    public static success<T>(data: T): ResponseResult<T> {
        return new HttpSuccessResult('', data).valueOf();
    }

    public static error(message: string, errorCode: number): ResponseResult<null> {
        return new HttpErrorResult(message, errorCode).valueOf();
    }

    protected message: string;

    public constructor(message: string) {
        this.message = message;
    }
}

