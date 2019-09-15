import uuidv4 from 'uuid/v4';

export default class Random {
    public static guid (): Guid_v4 {
        return uuidv4();
    }

    public static guidAsync (): Promise<Guid_v4> {
        return Promise.resolve(uuidv4());
    }
}