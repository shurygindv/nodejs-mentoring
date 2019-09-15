import { injectable, inject } from 'inversify';

import { Random } from '../../lib/random';
import { BaseService } from '../../core/base-service';

import { imagesTypes } from './connector';
import { IImagesRepository } from './images-repository';

import { ImageModel } from './models/image-model';
import { CreateUserServiceError } from './errors/upload-image-service-error';
import { ImageModelDboMapper } from './mapping/image-modeldbo-mapper';


export interface IImagesService {
    uploadImage(imageModel: ImageModel): Promise<ImageModel>;
    getImageById(id: Guid_v4): Promise<ImageModel>
}

@injectable()
export class ImagesService extends BaseService implements IImagesService {

    @inject(imagesTypes.ImagesRepository) private imageRepository: IImagesRepository;
    @inject(imagesTypes.ImageModelDboMapper) private mapper: ImageModelDboMapper;

    public async uploadImage(userModel: ImageModel): Promise<ImageModel> {
        const validationResult = await this.validateAsync(userModel);

        if (validationResult.hasErrors) {
            throw new CreateUserServiceError(validationResult.result);
        }

        const id = await Random.guidAsync();

        const outputImageDbo = await this.imageRepository.uploadImage(
            id, 
            userModel
        );
    
        return await this.mapper.fromDboToImageModel(outputImageDbo);
    }

    getImageById(id: string): Promise<ImageModel> {
        throw new Error("Method not implemented.");
    }
}