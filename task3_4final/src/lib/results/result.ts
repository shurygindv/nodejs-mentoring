export default class Result<T> {
    private payload: T;

    public constructor(payload: T) {
        this.payload = payload;
    }

    public get data(): T {
        return this.payload;
    }
}
