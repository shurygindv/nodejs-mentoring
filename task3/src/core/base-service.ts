
import {injectable} from 'inversify';
import { validate, ValidationError } from 'class-validator';

import { ServiceValidationResult } from '../lib/results';
import { IValidatable } from '../lib/validation/validatable';

@injectable()
export class BaseService {
    public async validateAsync<T extends IValidatable>(
        validatable: T
    ): Promise<ServiceValidationResult> {
        try {
            const errors: ValidationError[] = await validate(validatable);

            return new ServiceValidationResult(errors);
        } catch (e) {
            throw e;
        }
      
    }
}