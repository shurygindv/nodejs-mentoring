import {BaseHttpController} from 'inversify-express-utils';
import {plainToClass} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';

import { HttpStatusCode } from '../lib/http';
import { Status } from '../lib/http/http-status';
import { CustomValidationResult, Result } from '../lib/results';

export class BaseController extends BaseHttpController {

    public statusWithValidationErrors (
        errors: ValidationError[],
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

    public async validateAsync <T>(
        classDto: TS.Class<T>, plain: T
        ): Promise<[Result<T>, CustomValidationResult]> {
        try {
            const payload: T = plainToClass(classDto, plain);
            const errors: ValidationError[] = await validate(payload);

            return [
                new Result(payload), 
                new CustomValidationResult(errors)
            ];
        } catch (e) {
            throw e;
        }
    }
}
