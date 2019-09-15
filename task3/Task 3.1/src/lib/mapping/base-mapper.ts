import { plainToClass } from 'class-transformer';


export default class BaseMapper {

    protected createInstance <T>(
        model: TS.Class<T>, plain: T
   ): T {
        return plainToClass(model, plain);
    }

    protected beLazy <T>(result: T): Promise<T> {
        return Promise.resolve(result);
    }
}