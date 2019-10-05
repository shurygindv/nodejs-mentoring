import {interfaces} from 'inversify';

import {ImagesController} from './images-controller';
import {ImagesService, IImagesService} from './images-service';
import {ImagesRepository, IImagesRepository} from './images-repository';

import {ImageDtoMapper} from './mapping/image-dto-mapper';
import {ImageModelDboMapper} from './mapping/image-modeldbo-mapper';

import {imageTokens} from './tokens';

const connectImagesModule = (container: interfaces.Container): void => {
    container
        .bind<ImageDtoMapper>(imageTokens.ImageDtoMapper)
        .to(ImageDtoMapper);

    container
        .bind<ImageModelDboMapper>(imageTokens.ImageModelDboMapper)
        .to(ImageModelDboMapper);

    container
        .bind<ImagesController>(imageTokens.ImagesController)
        .to(ImagesController);

    container.bind<ImagesService>(imageTokens.ImagesService).to(ImagesService);

    container
        .bind<ImagesRepository>(imageTokens.ImagesRepository)
        .to(ImagesRepository);
};

export {imageTypes, connectImagesModule};
