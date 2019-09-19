import * as sequelize from 'sequelize';

import {Database, DataTypes} from '../database';

class UserDboModel extends sequelize.Model {
   id: guidV4;
   login: string;
   password: string;
   age: number;
}


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

    UserDboModel.init(columns, options);

    return UserDboModel;
};

export {UserDboModel, UserFactory};
