import { HttpResult } from '.';

import { ResponseResult } from '../../types';

export default class HttpSuccessResult<T> extends HttpResult {
    private data: T;

    public constructor (message: string, data: T) {
        super(message);

        this.data = data;
    }

    public valueOf (): ResponseResult<T> {
        return {
            Data: this.data,
            Success: true,

            ErrorCode: null,
            ErrorDescription: this.message || null,
        };
    }
}