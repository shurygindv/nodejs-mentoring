import {Container} from 'inversify';
import {Sequelize} from 'sequelize';

import {envConfig} from '../../config/environment';

import {UserFactory} from './models/user-factory';
import {GroupFactory} from './models/group-factory';

import {dbTokens} from './tokens';

// TODO: Injectable Async provider
export const connectDatabaseProvider = (container: Container): void => {
    const sequelize = new Sequelize(envConfig.connectionString);

    container.bind(dbTokens.userModel).toConstantValue(UserFactory(sequelize));

    container
        .bind(dbTokens.groupModel)
        .toConstantValue(GroupFactory(sequelize));

    sequelize.sync();
};
