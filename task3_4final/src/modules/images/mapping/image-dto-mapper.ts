import {BaseMapper} from '../../../lib/mapping';

import {UploadImageDto} from '../dto/upload-image-dto';
// to =>
import {ImageModel} from '../models/image-model';
import {ImageDto} from '../dto/image-dto';

export class ImageDtoMapper extends BaseMapper {
    public fromUploadDtoToImageModel(dto: UploadImageDto): Promise<ImageModel> {
        const model: ImageModel = this.createInstance<ImageModel>(ImageModel, {
            data: dto.data,
            mimeType: dto.mimeType,
            fileName: dto.fileName,
        });

        return this.beLazy(model);
    }

    public fromImageModelToDTO(model: ImageModel): Promise<ImageDto> {
        const dto: ImageDto = {
            id: model.id as guidV4,
            data: model.data,
            mimeType: model.mimeType,
            fileName: model.fileName,
        };

        return this.beLazy(dto);
    }
}
