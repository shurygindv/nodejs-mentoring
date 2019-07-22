import {Ajv, ValidateFunction} from '@libs/ajv';

const validator = Ajv();

export const useValidationScheme = <T extends object>(scheme: T): ValidateFunction => {
    return validator.compile({
        "$async": true,
        "properties": scheme
    });
}

