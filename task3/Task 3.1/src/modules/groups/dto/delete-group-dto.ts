import {IsUUID, IsNotEmpty} from 'class-validator';

import { IValidatable } from '../../../lib/validation/validatable';


export class DeleteGroupDto implements IValidatable {
    @IsUUID()
    @IsNotEmpty()
    public guid: Guid_v4;
}