
import * as sequelize from 'sequelize';

import { SequelizeTypes } from '../local-sequelize';

class UserDboModel extends sequelize.Model {
    public id: Guid_v4;
    public login: string;
    public password: string;
    public age: number;
};

const UserFactory = (
    sequelize: sequelize.Sequelize
) => {
    const columns = {
        'id': {
            type: SequelizeTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        'login': {
            type: SequelizeTypes.STRING,
            allowNull: false
        },
        'password': {
            type: SequelizeTypes.STRING,
            allowNull: false
        },
        'age': {
            type: SequelizeTypes.NUMBER,
            allowNull: false
        }
    };

    const options = {
        sequelize,
        timestamps: false,
        modelName: 'User'
    }

    UserDboModel.init(columns, options)

    return UserDboModel;
};

export {
    UserFactory,
    UserDboModel,
}