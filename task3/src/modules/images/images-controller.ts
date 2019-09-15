import {
    httpPost,
    controller,
} from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/dts/results';
import { inject } from 'inversify';

import { BaseController } from '../../core/base-controller';
import { IImagesService } from './images-service';
import { imagesTypes } from './connector';

import { ImageDtoMapper } from './mapping/image-dto-mapper';

import { UploadImageDto } from './dto/upload-image-dto';

import { ImageModel } from './models/image-model';
import { ImageDto } from './dto/image-dto';

@controller('/images')
export class ImagesController extends BaseController implements App.IController {
    @inject(imagesTypes.ImagesService) private imageService: IImagesService;
    @inject(imagesTypes.ImageDtoMapper) private mapper: ImageDtoMapper;


    @httpPost('/upload')
    public async uploadImage(
        req: App.Request<UploadImageDto>,
        res: App.Response
    ): Promise<JsonResult<ImageDto>> {
        const [dtoResult, validationResult] = await this.validateAsync(
            UploadImageDto,
            req.body
        );

        if (validationResult.hasErrors()) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        const model: ImageModel = await this.mapper.fromUploadDtoToImageModel(dtoResult.data);

        const outputModel = await this.imageService.uploadImage(model);

        const userDto = this.mapper.fromImageModelToDTO(outputModel);

        return this.successStatus(userDto);
    }
}
