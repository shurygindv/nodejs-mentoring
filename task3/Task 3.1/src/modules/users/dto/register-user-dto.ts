import {MinLength, IsNotEmpty, IsNumber} from 'class-validator';


export class RegisterUserDto {
    @MinLength(3)
    @IsNotEmpty()
    public login: string;


    @MinLength(5)
    public password: string;

    @IsNotEmpty()
    @IsNumber()
    public age: number;
}