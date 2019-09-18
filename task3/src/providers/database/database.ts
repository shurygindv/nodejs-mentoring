import {Sequelize, TransactionOptions, Transaction, DataTypes} from 'sequelize';
import {injectable} from "inversify";

import {envConfig} from "../../config/environment";

interface IDatabase {
    onInit(): void;

    transaction(options?: TransactionOptions): Promise<Transaction>
}

@injectable()
class Database implements IDatabase {
    protected sequelize: Sequelize;

    public constructor () {
        this.sequelize = new Sequelize(envConfig.connectionString);
    }

    get core (): Sequelize {
        return this.sequelize;
    }

    public onInit (): void {
        this.sequelize.sync();
    }

    public transaction (options?: TransactionOptions): Promise<Transaction> {
        return this.sequelize.transaction(options);
    }
}

export {IDatabase, Database, DataTypes};
