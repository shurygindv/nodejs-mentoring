import {MinLength, IsNotEmpty, IsNumber} from 'class-validator';


class EditUserDto {
    @MinLength(3)
    @IsNotEmpty()
    public login: string;

    @IsNotEmpty()
    @IsNumber()
    public age: number;
}

class EditPasswordUserDto {
    @MinLength(5)
    @IsNotEmpty()
    public password: string;
}

export {
    EditPasswordUserDto,
    EditUserDto,
}