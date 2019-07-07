import * as express from 'express';
import * as cors from 'cors';

import {entry} from './modules/users/user-routes';
import {Sequelize} from 'sequelize';

// test 
const app = express();

const CONNECTION_STRING ='postgres://test:test1234@localhost:5432/pg-db-test';

const create = (): Sequelize => new Sequelize(CONNECTION_STRING); 

const sequelizeDb = create(); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/v1', entry(sequelizeDb));


app.listen(7070, (): void => console.log(`Server started`));

process.on('SIGINT', (): void => { 
    console.log("Bye my friend!!"); 
    process.exit(); 
});