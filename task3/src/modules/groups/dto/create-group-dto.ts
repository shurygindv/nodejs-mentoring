import {MinLength, IsNotEmpty, IsEnum} from 'class-validator';

import {IValidatable} from '../../../lib/validation/validatable';
import {GroupPermission} from '../../../providers/database/models/groups';

class CreateGroupDto implements IValidatable {
    @MinLength(5)
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    @IsEnum(GroupPermission)
    public permissions: GroupPermission;
}

export {CreateGroupDto};
