import { app } from './application';
import { config as cfg } from './core/config';

app.listen(cfg.serverPort, () => console.log(`Started at ${cfg.serverPort} port`));