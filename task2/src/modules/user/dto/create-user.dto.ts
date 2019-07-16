import { useValidationScheme } from '@libs/validator';

export class CreateUserDto {
    public static scheme = useValidationScheme({
        "login": {
            "type": "string",
        },
        "password": {
            "type": "string"
        },
        "age": {
            "type": "integer"
        }
    });

    public login: string;
    public password: string;
    public age: number;
}
