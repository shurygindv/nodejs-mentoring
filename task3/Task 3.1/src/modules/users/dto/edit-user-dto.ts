import {MinLength, IsNotEmpty, IsNumber} from 'class-validator';


export class EditUserDto {
    @MinLength(3)
    @IsNotEmpty()
    public login: string;

    @IsNotEmpty()
    @IsNumber()
    public age: number;
}

export class EditPasswordUserDto {
    @MinLength(5)
    @IsNotEmpty()
    public password: string;
}