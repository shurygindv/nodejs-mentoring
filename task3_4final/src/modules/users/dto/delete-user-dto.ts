import {IsUUID, IsNotEmpty} from 'class-validator';

import {IValidatable} from '../../../lib/validation/validatable';

export class DeleteUserDTO implements IValidatable {
    @IsUUID()
    @IsNotEmpty()
    public guid: guidV4;
}
