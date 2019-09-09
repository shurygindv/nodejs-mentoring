import { HttpResult } from '..';

export default class HttpErrorResult extends HttpResult {
    private errorCode: number;

    public constructor (errorMessage: string, errorCode: number) {
        super(errorMessage);

        this.errorCode = errorCode;
    }

    public valueOf (): $APIHelpers.FailureResponse {
        return {
            Success: false,
            ErrorCode: this.errorCode,
            ErrorDescription: this.message,
        };
    }
}