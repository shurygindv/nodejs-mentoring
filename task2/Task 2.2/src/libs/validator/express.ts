import { RequestHandler } from 'express';

import { ValidateFunction, ValidationError } from '@libs/ajv';
import { selectReqBody } from '@libs/express/helper';

import { HttpResult } from '../http';
import { ErrorCode } from '../../types';
import { useAsync } from '../../helpers/use-async';

const selectErrorMessage = (e: Error): [string, ErrorCode] => {
    if (e instanceof ValidationError) {
        return [e.message, ErrorCode.validationError];
    }

    return [e.message, ErrorCode.unknownError];
}

export const useValidator = <T>(validate: ValidateFunction): RequestHandler => {
    const validateRequest: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const data: T = await validate(selectReqBody(req));

            res.locals.validated = data;

            next();
        }
        catch (e) {
            const [message, code] = selectErrorMessage(e);

            res.json(HttpResult.error(message, code));
        }
    };

    return useAsync(validateRequest);
}