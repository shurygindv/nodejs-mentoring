import {IsMultibyte, IsNotEmpty} from 'class-validator';

import {IValidatable} from '../../../lib/validation/validatable';

class UploadImageDto implements IValidatable {
    @IsMultibyte()
    @IsNotEmpty()
    public data: Buffer[];

    @IsNotEmpty()
    public fileName: string;

    @IsNotEmpty()
    public mimeType: string;
}

export {UploadImageDto};
