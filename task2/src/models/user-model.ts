import Sequelize from 'sequelize';

export class User extends Sequelize.Model {
    public id: string;
    public firstName: string;
    public lastName: string;
}

export const getUserModel = (sequelize: Sequelize.Sequelize): typeof User => {
    User.init({
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'user'
    });

    return User;
};