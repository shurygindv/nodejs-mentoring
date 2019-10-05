import * as sequelize from 'sequelize';

import {Database, DataTypes} from "../database";

import {ModelResolver} from "../connect-database";

class UserGroupsDboModel extends sequelize.Model {
    public userId: guidV4;
    public groupId: guidV4;
}


const UserGroupsFactory = (
    db: Database,
    resolveModel: ModelResolver
) => {
    const columns = {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        groupId: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    };

    const options = {
        sequelize: db.core,
        timestamps: false,
        modelName: 'UserGroups',
    };

    UserGroupsDboModel.init(columns, options);

    /*

    const GroupModel: GroupModel = resolveModel<GroupModel>(dbTokens.groupModel);
    const userModel: UserModel = resolveModel<UserModel>(dbTokens.groupModel);

    UserGroupsModel.init(columns, options);

    /*
    userModel.belongsToMany(GroupModel, {
        through: UserGroupsModel,
        foreignKey: 'groupId',
    });

    GroupDboModel.belongsToMany(UserDboModel, {
        through: UserGroupsModel,
        foreignKey: 'userId',
    });

     */

    return UserGroupsDboModel;
};

export {UserGroupsFactory, UserGroupsDboModel};
