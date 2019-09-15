import * as sequelize from 'sequelize';

const SequelizeTypes = sequelize.DataTypes;

class LocalSequelize {
    public static createModel (
        attrs: sequelize.ModelAttributes, 
        options: sequelize.InitOptions
    ) {
        const Model = class extends sequelize.Model {};

        Model.init(attrs, options);

        return Model;
    }
}

export {
    SequelizeTypes,
    LocalSequelize
}