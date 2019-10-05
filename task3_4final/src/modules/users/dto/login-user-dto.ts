import {MinLength, IsNotEmpty} from 'class-validator';

import {IValidatable} from '../../../lib/validation/validatable';

export class LoginUserDTO implements IValidatable {
    @MinLength(3)
    @IsNotEmpty()
    public login: string;

    @MinLength(5)
    @IsNotEmpty()
    public password: string;
}
