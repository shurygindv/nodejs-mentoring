import { injectable, inject } from 'inversify';

import { BaseRepository } from '../../core/base-repository';
import { UserEntity } from './entities/user-entity';

export interface IUsersRepository {
    createUser(userEntity: UserEntity): Promise<UserEntity>;
    getById(): any;
    getAll(): any;
    updateById(): void;
    deleteById(): any;
}

@injectable()
export class UsersRepository extends BaseRepository implements IUsersRepository {
    public createUser(userEntity: UserEntity): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }    
    
    
    public getById() {
        throw new Error("Method not implemented.");
    }
    
    public getAll() {
        throw new Error("Method not implemented.");
    }
    
    public updateById(): void {
        throw new Error("Method not implemented.");
    }
    
    public deleteById() {
        throw new Error("Method not implemented.");
    }

}