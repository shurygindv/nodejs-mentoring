import {uuidHelper} from '@libs/uuid';
import {Crypto} from "@libs/bcrypt";

import {BaseService} from '../../core/base-service';
import {CreateUserDto} from "./dto/create-user.dto";

import {MaybeNull} from '../../types';
import {ServiceError} from "../../core/service-error";
import {IUserRepository, UserEntity} from "./user-repository";

export interface IUser {
    id: string,
    login: string;
    age: number;
}

export interface IUserService {
    create(user: CreateUserDto): Promise<IUser>;

    findAll(): Promise<IUser[]>;

    findById(id: string): Promise<MaybeNull<IUser>>;

    deleteById(id: string): Promise<string | never>;
}

const mapUserModelToService = (model: UserEntity): IUser => ({
    id: model.id,
    login: model.login,
    age: model.age,
});


export class UserService extends BaseService implements IUserService {
    protected userRepo: IUserRepository;

    public constructor (userRepo: IUserRepository) {
        super();

        this.userRepo = userRepo;
    }

    public async create(user: CreateUserDto): Promise<IUser> {
        const hash = await Crypto.hash(user.password);

        const created = await this.userRepo.createUser({
            id: uuidHelper.id(),
            login: user.login,
            password: hash,
            age: user.age,
            isDeleted: false,
        });

        return mapUserModelToService(created);
    }

    public async findAll(): Promise<IUser[]> {
        const users = await this.userRepo.findAllUsers();

        return (users || []).map(mapUserModelToService);
    }

    public async findById(id: string): Promise<MaybeNull<IUser>> {
        const found = await this.userRepo.findUserById(id);

        return mapUserModelToService(found);
    }

    public async deleteById (id: string): Promise<string | never> {
        const userId = await this.userRepo.updateUserById(id, {isDeleted: true});

        if (!userId) {
            new ServiceError('UserService: deletable user not found');
        }

        return userId;
    }
}
