import uuidv4 from 'uuid/v4';

export default class Random {
    public static guid(): guidV4 {
        return uuidv4();
    }

    public static guidAsync(): Promise<guidV4> {
        return Promise.resolve(uuidv4());
    }
}
