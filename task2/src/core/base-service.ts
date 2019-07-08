
export class BaseService <T> {
    protected repo: T;

    public constructor (repo: T) {
        this.repo = repo;
    }
};