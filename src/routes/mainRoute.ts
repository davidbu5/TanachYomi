import * as express from 'express';
import { yearRouter } from './year.route';

export function getMainRouter() {
    const mainRouter = express.Router();
    mainRouter.use('/year', yearRouter)
    return mainRouter;
}
