import {httpPost, controller, requestBody} from 'inversify-express-utils';
import {JsonResult} from 'inversify-express-utils/dts/results';
import {inject} from 'inversify';

import {BaseRestController} from '../../core/base-rest-controller';
import {IImagesService} from './images-service';
import {imageTokens} from './tokens';

import {ImageDtoMapper} from './mapping/image-dto-mapper';

import {UploadImageDto} from './dto/upload-image-dto';

import {ImageModel} from './models/image-model';
import {ImageDto} from './dto/image-dto';

@controller('/images')
export class ImagesController extends BaseRestController
    implements App.IController {
    @inject(imageTokens.ImagesService) private imageService: IImagesService;
    @inject(imageTokens.ImageDtoMapper) private mapper: ImageDtoMapper;

    @httpPost('/upload')
    public async uploadImage(
        @requestBody() reqImageBody: UploadImageDto,
    ): Promise<JsonResult<ImageDto>> {
        const [dtoResult, validationResult] = await this.validateAsync(
            UploadImageDto,
            reqImageBody,
        );

        if (validationResult.hasErrors()) {
            return this.statusWithValidationErrors(validationResult.result);
        }

        const model: ImageModel = await this.mapper.fromUploadDtoToImageModel(
            dtoResult.data,
        );

        const outputModel = await this.imageService.uploadImage(model);

        const userDto = this.mapper.fromImageModelToDTO(outputModel);

        return this.successStatus(userDto);
    }
}
