import {BaseMapper} from '../../../lib/mapping';

import {ImageDboModel} from '../../../providers/sequelize/models/image-factory';
// to =>
import {ImageModel} from '../models/image-model';

export class ImageModelDboMapper extends BaseMapper {
    public fromDboToImageModel(
        model: ImageDboModel,
    ): Promise<TS.MaybeNull<ImageModel>> {
        if (!model) {
            return this.empty();
        }

        const imageModel: ImageModel = this.createInstance<ImageModel>(
            ImageModel,
            {
                id: model.id,
                fileName: model.fileName,
                mimeType: model.mimeType,
                data: model.data,
            },
        );

        return this.beLazy(imageModel);
    }
}
