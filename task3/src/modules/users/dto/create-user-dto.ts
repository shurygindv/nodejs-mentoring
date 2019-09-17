import {MinLength, IsNotEmpty, IsNumber} from 'class-validator';

import { IValidatable } from '../../../lib/validation/validatable';

export class CreateUserDTO implements IValidatable {
    @MinLength(3)
    @IsNotEmpty()
    public login: string;


    @MinLength(5)
    public password: string;

    @IsNotEmpty()
    @IsNumber()
    public age: number;
}