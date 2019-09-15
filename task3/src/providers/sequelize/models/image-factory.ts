
import * as sequelize from 'sequelize';

import { SequelizeTypes } from '../local-sequelize';

class ImageDboModel extends sequelize.Model {
    public id: Guid_v4;
    public data: Buffer[];
    public fileName?: string;
    public mimeType: string;
};

const ImageFactory = (
    sequelize: sequelize.Sequelize
) => {
    const columns = {
        'id': {
            type: SequelizeTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        'data': {
            type: SequelizeTypes.BLOB,
            allowNull: false
        },
        'mimeType': {
            type: SequelizeTypes.STRING,
            allowNull: false
        },
        'fileName': {
            type: SequelizeTypes.STRING,
        },
    };

    const options = {
        sequelize,
        timestamps: false,
        modelName: 'Group'
    }

    ImageDboModel.init(columns, options)

    return ImageDboModel;
};

export {
    ImageFactory,
    ImageDboModel
}