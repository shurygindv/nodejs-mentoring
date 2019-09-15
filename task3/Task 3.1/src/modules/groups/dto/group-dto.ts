import {MinLength, IsNotEmpty, IsNumber} from 'class-validator';
class UserDto {
    public id?: Guid_v4;
    public login: string;
    public age: number;
}

export {
    UserDto
}