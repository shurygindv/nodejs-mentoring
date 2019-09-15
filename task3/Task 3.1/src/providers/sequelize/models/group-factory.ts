
import * as sequelize from 'sequelize';

import { SequelizeTypes } from '../local-sequelize';

export enum GROUP_PERMISSION {
    READ = "Read",
    WRITE = "Write",
    DELETE = "DELETE",
    SHARE = "SHARE",
    UPLOAD_FILES = "UPLOAD_FILES",
}

class GroupDboModel extends sequelize.Model {};

const GroupFactory = (
    sequelize: sequelize.Sequelize
) => {
    const columns = {
        'id': {
            type: SequelizeTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        'name': {
            type: SequelizeTypes.STRING,
            allowNull: false
        },
        'permissions': {
            type: SequelizeTypes.ENUM(
                GROUP_PERMISSION.READ,
                GROUP_PERMISSION.WRITE,
                GROUP_PERMISSION.SHARE,
                GROUP_PERMISSION.DELETE,
                GROUP_PERMISSION.UPLOAD_FILES,
             ),
            allowNull: false
        },
    };

    const options = {
        sequelize,
        timestamps: false,
        modelName: 'Group'
    }

    GroupDboModel.init(columns, options)

    return GroupDboModel;
};

export {
    GroupFactory,
    GroupDboModel
}