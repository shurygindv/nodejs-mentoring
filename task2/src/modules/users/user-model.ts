import sequelize from 'sequelize';

export const createUserModel = (sequelizeDb: any): any => {
    class User extends sequelize.Model {}

    User.init({
        id: {
            type: sequelize.STRING,
            primaryKey: true,
            unique: true,
        },
        firstname: {
            type: sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize: sequelizeDb,
        modelName: 'user',
        timestamps: false,
        // options
    });
    
    return User;
}