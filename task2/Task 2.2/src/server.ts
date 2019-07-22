import {app} from './application';



// todo: port as env variable
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
app.listen(7070, () => console.log(`Started at 7070 port`));