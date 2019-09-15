
import {interfaces} from 'inversify';

import {ImagesController} from './images-controller';
import {ImagesService, IImagesService} from './images-service';
import {ImagesRepository, IImagesRepository} from './images-repository';

import { ImageDtoMapper } from './mapping/image-dto-mapper';
import { ImageModelDboMapper } from './mapping/image-modeldbo-mapper';

const imagesTypes = {
    ImageDtoMapper: 'ImageDtoMapper',
    ImageModelDboMapper: 'ImageModelDboMapper',

    ImagesController: 'ImagesController',
    ImagesService: 'ImagesService',
    ImagesRepository: 'ImagesRepository',
}

const connectImagesModule = (container: interfaces.Container): void => {
    container.bind<ImageDtoMapper>(imagesTypes.ImageDtoMapper)
    .to(ImageDtoMapper);

    container.bind<ImageModelDboMapper>(imagesTypes.ImageModelDboMapper)
    .to(ImageModelDboMapper);

    container.bind<ImagesController>(imagesTypes.ImagesController)
        .to(ImagesController);

    container.bind<ImagesService>(imagesTypes.ImagesService)
        .to(ImagesService);

    container.bind<ImagesRepository>(imagesTypes.ImagesRepository)
        .to(ImagesRepository);
}

export {
    imagesTypes, 
    connectImagesModule,  
}