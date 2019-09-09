import {BaseHttpController} from 'inversify-express-utils';
import {plainToClass} from 'class-transformer';
import {validate} from 'class-validator';

export class BaseController extends BaseHttpController {

    public async validateAsync <T>(classDto: $Utility.Class<T>, plain: T) {
        const payload = plainToClass(classDto, plain);

        try {
            let errors = await validate(payload);


        } catch (e) {

        }

    }
}
