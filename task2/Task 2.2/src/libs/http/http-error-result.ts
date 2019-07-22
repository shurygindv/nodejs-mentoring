import { HttpResult } from '.';

import { ResponseResult } from '../../types';

export default class HttpErrorResult extends HttpResult {
    private errorCode: number;

    public constructor (errorMessage: string, errorCode: number) {
        super(errorMessage);

        this.errorCode = errorCode;
    }

    public valueOf (): ResponseResult<null> {
        return {
            Data: null,
            Success: false,
            ErrorCode: this.errorCode,
            ErrorDescription: this.message,
        };
    }
}