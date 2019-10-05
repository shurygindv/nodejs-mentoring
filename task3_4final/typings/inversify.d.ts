import {interfaces} from 'inversify-express-utils';

export declare module 'inversify-express-utils/dts/results' {
    export class JsonResult<T> implements interfaces.IHttpActionResult {
        readonly json: T;
        readonly statusCode: number;

        constructor(
            json: T,
            statusCode: number,
            apiController: BaseHttpController,
        );

        executeAsync(): Promise<HttpResponseMessage>;
    }
}
