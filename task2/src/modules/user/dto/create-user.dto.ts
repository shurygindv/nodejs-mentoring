import { useValidationScheme } from '@libs/validator';

export class CreateUserDto {
    public static scheme = useValidationScheme({
        "id": {
            "type": "integer",
        },
        "firstName": {
            "type": "string",
        },
        "lastName": {
            "type": "string"
        }
    })

    public id: string;
    public firstName: string;
    public lastName: string;
}