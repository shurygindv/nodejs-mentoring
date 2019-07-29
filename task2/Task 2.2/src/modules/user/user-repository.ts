import {UserModel} from "../../models/user-model";
import {BaseRepository} from "../../core/base-repository";
import {RepositoryError} from "../../core/repository-error";


export interface IUserRepository {
    createUser(user: any): Promise<UserEntity | never>;

    updateUserById (id: string, values: object): Promise<string>;

    findAllUsers(): Promise<UserEntity[] | never>;

    findUserById(id: string): Promise<UserEntity | never>;
}

export class UserEntity {
    public id: string;
    public age: number;
    public login: string;
    public password: string;

    public constructor(id: string, age: number, login: string, password: string) {
        this.id = id;
        this.age = age;
        this.login = login;
        this.password = password;
    }
}

const asUserEntity = (id: string, age: number, login: string, password: string): UserEntity =>
    new UserEntity(id, age, login, password);

export class UserRepository extends BaseRepository<UserEntity, UserModel> implements IUserRepository {

    // todo: use helper 
    public mapUserModelToEntity(userModel: UserModel): UserEntity {
        return asUserEntity(
            userModel.id,
            userModel.age,
            userModel.login,
            userModel.password
        );
    }

    // todo: question #1
    public async createUser(user: any): Promise<UserEntity | never> {
        try {
            const created = await this.create({
                'id': user.id,
                'age': user.age,
                'login': user.login,
                'password': user.password,
                'isdeleted': false,
            });

            return asUserEntity(
                created.id,
                created.age,
                created.login,
                created.password
            );
        } catch (e) {
            throw new RepositoryError(e);
        }
    }

    // TODO: question #2
    public async updateUserById (id: string, values: object): Promise<string> {
        await this.updateById(id, values);

        return id;
    }

    public findAllUsers(): Promise<UserEntity[]> {
        return this.findAll();
    }

    public async findUserById(id: string): Promise<UserEntity | never> {
        const user = await this.findByPk(id);

        if (!user) {
            throw new RepositoryError('UserRepo: findUserById: user with such id not found');
        }

        return asUserEntity(
            user.id,
            user.age,
            user.login,
            user.password,
        );
    }
}
