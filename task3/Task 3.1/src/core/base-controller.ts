import {BaseHttpController} from 'inversify-express-utils';
import {plainToClass} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';

import { Status } from '../lib/http/http-status';
import { HttpStatusCode } from '../lib/http/http-status-code';

export class BaseController extends BaseHttpController {

    public statusWithValidationErrors (
        errors: string | Record<string,string>,
        status?: HttpStatusCode
    ) {
        const result = Status.ValidationError(errors, status)

        return this.json(result.data, result.statusCode);
    }

    public successStatus <T>(data: T, statusCode?: HttpStatusCode) {
        const result = Status.Success<T>(true, data, statusCode);

        return this.json(result.data, result.statusCode);
    }
    
    public statusWithErrors (errorCode: string, errorMessage: string) {
        const result = Status.Error(errorCode, errorMessage);

        return this.json(result.data, result.statusCode);
    }

    public async validateAsync <T>(classDto: TS.Class<T>, plain: T) {
        const payload: T = plainToClass(classDto, plain);

        try {
            let errors = await validate(payload);
        } catch (e) {
            if (e instanceof ValidationError) {
            
            }
        }

    }
}
