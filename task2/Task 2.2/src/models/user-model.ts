import Sequelize from 'sequelize';

export class UserModel extends Sequelize.Model {
    public id: string;
    public login: string;
    public password: string;
    public age: number;
    public isDeleted: boolean;
}

export const initUserModel = (sequelize: Sequelize.Sequelize): typeof UserModel => {
    UserModel.init({
        'id': {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        'login': {
            type: Sequelize.STRING,
            allowNull: false
        },
        'password': {
            type: Sequelize.STRING,
            allowNull: false
        },
        'age': {
            type: Sequelize.NUMBER,
            allowNull: false
        },
        'isdeleted': {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'user'
    });

    return UserModel;
};
