import * as sequelize from 'sequelize';

import {DataTypes, Database} from '../database';

class ImageModel extends sequelize.Model {
    id: guidV4;
    data: Buffer[];
    fileName?: string;
    mimeType: string;
}

type ImageDboModel = typeof ImageModel; // hack

const ImageFactory = (db: Database) => {
    const columns = {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        data: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        mimeType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fileName: {
            type: DataTypes.STRING,
        },
    };

    const options = {
        sequelize: db.core,
        timestamps: false,
        modelName: 'Images',
    };

    ImageModel.init(columns, options);

    return ImageModel;
};


export {ImageFactory, ImageDboModel};
