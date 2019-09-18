import {MinLength, IsNotEmpty, IsNumber} from 'class-validator';

import {IValidatable} from '../../../lib/validation/validatable';

export class EditUserDTO implements IValidatable {
    @MinLength(3)
    @IsNotEmpty()
    public login: string;

    @IsNotEmpty()
    @IsNumber()
    public age: number;

    @IsNotEmpty()
    public confirmPassword: guidV4;
}
