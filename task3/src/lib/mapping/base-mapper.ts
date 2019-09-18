import {plainToClass} from 'class-transformer';
import {injectable} from 'inversify';

@injectable()
export default class BaseMapper {
    protected empty(): Promise<null> {
        return this.beLazy(null);
    }

    protected createInstance<T>(model: TS.Class<T>, plain: T): T {
        return plainToClass(model, plain);
    }

    protected beLazy<T>(result: T): Promise<T> {
        return Promise.resolve(result);
    }
}
