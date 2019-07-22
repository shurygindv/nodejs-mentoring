import Sequelize, { FindOptions, Identifier } from 'sequelize';
import { MaybeNull } from "../types";
import { RepositoryError } from "./repository-error";


type SequelizeModel<T> = { new(): T } & typeof Sequelize.Model;

export class BaseRepository<Entity, T extends Sequelize.Model> {
    protected repo: SequelizeModel<T>;

    public constructor(repo: SequelizeModel<T>) {
        this.repo = repo;
    }

    protected async create<O>(values: object, options?: Sequelize.CreateOptions): Promise<T> {
        try {
            return this.repo.create(values, options);
        }
        catch (e) {
            throw new RepositoryError(e);
        }
    }

    protected async update<O>(values: object, options: Sequelize.UpdateOptions): Promise<[number, T[]]> {
        try {
            return this.repo.update(values, options);
        }
        catch (e) {
            throw new RepositoryError(e);
        }
    }

    protected async updateById(id: string, values: object) {
        try {
            return this.update(values, { where: { id } })
        }
        catch (e) {
            throw new RepositoryError(e);
        }
    }

    protected async findByPk<O>(
        identifier: Sequelize.Identifier,
        options?: Omit<FindOptions, 'where'>
    ): Promise<MaybeNull<T>> {
        try {
            return await this.repo.findByPk(identifier, options);
        }
        catch (e) {
            throw new RepositoryError(e);
        }
    }

    protected async findAll<O>(
        options?: FindOptions
    ): Promise<Entity[]> {
        try {
            return this.repo.findAll(options)
                .map((e: T) => this.mapUserModelToEntity(e))
        }
        catch (e) {
            throw new RepositoryError(e);
        }
    }

    public mapUserModelToEntity(item: T): Entity {
        throw new Error("Not implemented yet");
    }
}
