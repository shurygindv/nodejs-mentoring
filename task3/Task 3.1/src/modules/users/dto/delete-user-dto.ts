import {IsUUID, IsNotEmpty} from 'class-validator';

import { IValidatable } from '../../../lib/validation/validatable';


export class DeleteUserDto implements IValidatable {
    @IsUUID()
    @IsNotEmpty()
    public guid: Guid_v4;
}