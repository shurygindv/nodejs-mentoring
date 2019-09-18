import * as sequelize from 'sequelize';

import {Database, DataTypes} from '../database';

class UserModel extends sequelize.Model {
   id: guidV4;
   login: string;
   password: string;
   age: number;
}

interface IUserModel extends UserModel {}

type UserDboModel = typeof UserModel; // hack

const UserFactory = (db: Database) => {
    const columns = {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
    };

    const options = {
        sequelize: db.core,
        timestamps: false,
        modelName: 'Users',
    };

    UserModel.init(columns, options);

    return UserModel;
};

export {UserModel, UserFactory};
