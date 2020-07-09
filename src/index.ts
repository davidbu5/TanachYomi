import * as express from 'express';
import * as helmet from 'helmet';
import { getMainRouter } from './routes/mainRoute';

const app = express();
app.use(helmet());

app.use('/', getMainRouter());

app.listen(80, ()=>console.log('Starting at port 80'))