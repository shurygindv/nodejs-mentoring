import { HttpResult } from '..';

export default class HttpSuccessResult<T> extends HttpResult {
    private data: T;

    public constructor (data: T) {
        super();

        this.data = data;
    }

    public valueOf (): $APIHelpers.Response<T> {
        return {
            Data: this.data,
            Success: true,

            ErrorCode: null,
            ErrorDescription: null,
        };
    }
}