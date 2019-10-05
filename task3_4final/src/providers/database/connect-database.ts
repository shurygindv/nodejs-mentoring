import {Container, interfaces} from 'inversify';
import {Sequelize} from 'sequelize';

import {envConfig} from '../../config/environment';

import {UserFactory} from './models/users';
import {GroupFactory} from './models/groups';
import {UserGroupsFactory} from "./models/user-groups";

import {dbTokens} from './tokens';
import {Database, IDatabase} from "./database";

const initiateDatabase = (container: Container) =>
    container
        .bind<IDatabase>(dbTokens.database)
        .to(Database)
        .inSingletonScope();


type ModelResolver = <M>(key: string) => M;

// TODO: Injectable Async provider
const connectDatabaseProvider = (container: Container): void => {
    initiateDatabase(container);

    const modelResolver: ModelResolver = (key: string) => {
        return container.get(key);
    };

    const database: Database = container.get(dbTokens.database);

    container.bind(dbTokens.userModel)
        .toConstantValue(UserFactory(database));

    container
        .bind(dbTokens.groupModel)
        .toConstantValue(GroupFactory(database));

    container
        .bind(dbTokens.userGroupModel)
        .toConstantValue(UserGroupsFactory(database, modelResolver));

    database.onInit();
};

export {ModelResolver, connectDatabaseProvider};
