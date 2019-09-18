import * as sequelize from 'sequelize';

import {SequelizeTypes} from '../local-sequelize';

export enum GroupPermission {
    READ = 'Read',
    WRITE = 'Write',
    DELETE = 'DELETE',
    SHARE = 'SHARE',
    UPLOAD_FILES = 'UPLOAD_FILES',
}

class GroupDboModel extends sequelize.Model {
    public id: guidV4;
    public name: string;
    public permissions: GroupPermission;
}

const GroupFactory = (sequelize: sequelize.Sequelize) => {
    const columns = {
        id: {
            type: SequelizeTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: SequelizeTypes.STRING,
            allowNull: false,
        },
        permissions: {
            type: SequelizeTypes.ENUM(
                GroupPermission.READ,
                GroupPermission.WRITE,
                GroupPermission.SHARE,
                GroupPermission.DELETE,
                GroupPermission.UPLOAD_FILES,
            ),
            allowNull: false,
        },
    };

    const options = {
        sequelize,
        timestamps: false,
        modelName: 'Group',
    };

    GroupDboModel.init(columns, options);

    return GroupDboModel;
};

export {GroupFactory, GroupDboModel};
