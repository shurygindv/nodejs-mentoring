import Sequelize from 'sequelize';

export class User extends Sequelize.Model {
    public id: string;
    public firstname: string;
    public lastname: string;
}

export const getUserModel = (sequelize: Sequelize.Sequelize): typeof User => {
    User.init({
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'user'
    });

    return User;
};