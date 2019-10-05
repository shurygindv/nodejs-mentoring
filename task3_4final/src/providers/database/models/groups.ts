import * as sequelize from 'sequelize';

import {Database, DataTypes} from "../database";

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

const GroupFactory = (db: Database) => {
    const columns = {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        permissions: {
            type: DataTypes.ENUM(
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
        sequelize: db.core,
        timestamps: false,
        modelName: 'Groups',
    };

    GroupDboModel.init(columns, options);

    return GroupDboModel;
};

export {GroupFactory, GroupDboModel};
