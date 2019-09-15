import {MinLength, IsNotEmpty, IsEnum} from 'class-validator';

import { IValidatable } from '../../../lib/validation/validatable';
import { GROUP_PERMISSION } from '../../../providers/sequelize/models/group-factory';

class CreateGroupDto implements IValidatable {
    @MinLength(5)
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    @IsEnum(GROUP_PERMISSION)
    public permissions: GROUP_PERMISSION;
}

export {
    CreateGroupDto
}