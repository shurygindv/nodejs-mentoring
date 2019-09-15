import { Container } from 'inversify';
import { Sequelize } from 'sequelize';

import { envConfig } from '../../config/environment';

import { UserFactory } from './models/user-factory';
import { GroupFactory } from './models/group-factory';

import { dbTypes } from './dbTypes';

 // TODO: Injectable Async provider
export const connectDatabaseProvider = (container: Container): void => {
    const sequelize = new Sequelize(envConfig.connectionString);

    container
        .bind(dbTypes.UserModel)
        .toConstantValue(UserFactory(sequelize));

    container
        .bind(dbTypes.GroupModel)
        .toConstantValue(GroupFactory(sequelize));

    sequelize.sync();
}
